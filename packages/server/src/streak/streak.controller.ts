import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { StreakService } from './streak.service';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';

@Controller('streak')
export class StreakController {
  constructor(private readonly streakService: StreakService) {}

  @Post('update')
  @UseGuards(JwtAuthGuard) // Protect the route with JWT authentication
  async updateStreak(@Request() req) {
    const userId = req.user.id; // Get the user ID from the JWT payload
    return this.streakService.updateStreak(userId);
  }
}