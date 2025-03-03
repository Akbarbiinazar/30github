import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Jwtstrategy } from './jwt.strategy';

import { PrismaService } from 'prisma/prisma.service';
import { jwtSecret } from 'src/utils/constants';
import { StreakService } from 'src/streak/streak.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: {expiresIn: '1h'}
    })
  ],
  providers: [AuthService, StreakService, Jwtstrategy, PrismaService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
