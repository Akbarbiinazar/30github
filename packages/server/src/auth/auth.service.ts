import { ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { Response } from 'express';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt'
import { hashPasswordSecret, jwtSecret } from 'src/utils/constants';



@Injectable()
export class AuthService {
  constructor( 
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}
  
  async register(dto: AuthDto, isAdmin: boolean = false) {
    const {email, password} = dto 

    const foundUser = await this.prisma.user.findUnique({where: { email}})
  
    if (foundUser) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST)
    }

    const hashedPassword = await this.hashPassword(password)

    const user = await this.prisma.user.create({
      data: {
          email,
          hashedPassword,
          role: isAdmin ? "ADMIN" : "USER",
          permissions: isAdmin ? ['READ_CONTENT', 'ADD_BOOK', 'DELETE_BOOK', 'UPDATE_BOOK'] : ['READ_CONTENT'],
      }
  })

    return  {message: 'signup was successfull', user}
  }

  async login(dto: AuthDto, req: Request, res: Response) {
    // const payload = { email: user.email, sub: user.id };
    // return {
    //   access_token: this.jwtService.sign(payload),
    // };
    const foundUser = await this.validateUser(dto)

    const token = await this.signToken({id: foundUser.id, email: foundUser.email, 
      role: foundUser.role,
      permissions: foundUser.permissions
    })

  if (!token) {
    throw new ForbiddenException()
  }

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: true,
    maxAge: 3600000, 
  })
  return res.send({message: 'Logged in successfully', token})
  }

  async logout(req: Request, res: Response) {
    res.clearCookie('token')
    return res.send({message: 'Logout successfully'})
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10 

    return await bcrypt.hash(password, saltOrRounds)
  }

  async comparePasswords(args: {password: string, hash: string}) {
    return await bcrypt.compare(args.password, args.hash)
  }

  async signToken(args: {id: string, email: string, role: string, permissions: string[]}) {
    const payload = args 

    return this.jwtService.signAsync(payload, {secret: jwtSecret})
  }

  async validateToken(token: string) {
    return this.jwtService.verify(token, {
        secret : process.env.JWT_SECRET_KEY
    });
}

  private async validateUser(dto: AuthDto) {
    const {email, password} = dto 
    const foundUser = await this.prisma.user.findUnique({where: {email}})

    const isMatch = await this.comparePasswords({password, hash: foundUser.hashedPassword})

    if (foundUser && isMatch) {
      return foundUser
    }

    throw new UnauthorizedException({message: "Wrong credentials"})
  }
}
