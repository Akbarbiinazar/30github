import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class SunnahService {
  constructor(private prisma: PrismaService) {}

  async getDailyVerse() {
    const verseCount = await this.prisma.quranVerse.count();
    const randomIndex = Math.floor(Math.random() * verseCount);
  
    const dailyVerse = await this.prisma.quranVerse.findMany({
      skip: randomIndex,
      take: 1,
    });
  
    if (!dailyVerse[0]) {
      throw new NotFoundException('No Quran verse found');
    }
  
    return dailyVerse[0];
  }

  // async likeSunnah(userId: string, sunnahId: string) {
  //   // Check if the Sunnah exists
  //   const sunnah = await this.prisma.sunnah.findUnique({
  //     where: { id: sunnahId },
  //   });

  //   if (!sunnah) {
  //     throw new NotFoundException('Sunnah not found');
  //   }

  //   // Check if the user has already liked the Sunnah
  //   const existingLike = await this.prisma.userLikes.findUnique({
  //     where: {
  //       userId_sunnahId: {
  //         userId,
  //         sunnahId,
  //       },
  //     },
  //   });

  //   if (existingLike) {
  //     // Unlike the Sunnah
  //     await this.prisma.userLikes.delete({
  //       where: {
  //         userId_sunnahId: {
  //           userId,
  //           sunnahId,
  //         },
  //       },
  //     });
  //     return { message: 'Sunnah unliked successfully' };
  //   } else {
  //     // Like the Sunnah
  //     await this.prisma.userLikes.create({
  //       data: {
  //         userId,
  //         sunnahId,
  //       },
  //     });
  //     return { message: 'Sunnah liked successfully' };
  //   }
  // }
}