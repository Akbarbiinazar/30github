import {
  Controller,
  Get,
} from '@nestjs/common';
import { SunnahService } from './sunnah.service';


@Controller('sunnah')
export class SunnahController {
  constructor(private readonly sunnahService: SunnahService) {}

  @Get('daily')
  async getDailySunnah() {
    return this.sunnahService.getDailyVerse();
  }

  // @Post(':id/like')
  // @UseGuards(JwtAuthGuard) // Protect the route with JWT authentication
  // async likeSunnah(@Param('id') sunnahId: string, @Request() req) {
  //   const userId = req.user.id; // Get the user ID from the JWT payload
  //   return this.sunnahService.likeSunnah(userId, sunnahId);
  // }

  // @Get(':id')
  // async getSunnah(@Param('id') sunnahId: string) {
  //   return this.sunnahService.getDailySunnah();
  // }
}