import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { PrismaService } from "prisma/prisma.service";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtSecret } from "src/utils/constants";


@Injectable()
export class Jwtstrategy extends PassportStrategy(Strategy) {
    constructor(private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret
        }) 
    }

        async validate(payload: any) {
            const user = await this.prisma.user.findUnique({
                where: { id: payload.sub}
            })
            if (!user) {
                throw new UnauthorizedException()
            }
            return user
        }
    
}