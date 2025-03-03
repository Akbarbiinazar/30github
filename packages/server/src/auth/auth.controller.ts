import { Controller, Get, Post, Body, Res, Req,  UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';

import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: AuthDto, @Req() req, @Res() res) {
    return this.authService.login(dto, req, res);
  } 

  @Post('logout')
  logout(@Req() req, @Res() res) {
    return this.authService.logout(req, res)
  }
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }


  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

 
}
