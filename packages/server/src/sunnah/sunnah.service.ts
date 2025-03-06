import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { PrismaService } from 'prisma/prisma.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SunnahService {
  private readonly CACHE_KEY = 'dailyHadith';
  constructor(private prisma: PrismaService, private httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.scheduleHadithRefresh();
  }

  private async getAllHadiths() {
    const url = process.env.EXTERNAL_PUBLIC_API_HADITH;
    const response = await firstValueFrom(
      this.httpService.get(url, {
        params: {
          apiKey: `${process.env.HADITH_API_KEY}`,
        },
      }),
    );
  
    return response.data.hadiths.data;
  }

  private async getRandomHadith() {
    const hadiths = await this.getAllHadiths();
    if (!hadiths || hadiths.length === 0) {
      throw new Error('No hadiths found.');
    }
    const randomIndex = Math.floor(Math.random() * hadiths.length);
    return hadiths[randomIndex];
  }

  async getCachedHadith() {
    let hadith = await this.cacheManager.get(this.CACHE_KEY);
    if (!hadith) {
      hadith = await this.updateHadithCache();
    }
    return hadith;
  }

  async updateHadithCache() {
    const hadith = await this.getRandomHadith();
    await this.cacheManager.set(this.CACHE_KEY, hadith, 86400); // 24 hours TTL
    return hadith;
  }

  private scheduleHadithRefresh() {
    setInterval(async () => {
      await this.updateHadithCache();
      console.log('Hadith cache updated!');
    }, 86400000); 
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