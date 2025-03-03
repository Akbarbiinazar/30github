import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class StreakService {
  constructor(private prisma: PrismaService) {}

  async updateStreak(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      throw new Error('User not found')
    }

    const today = new Date()
    const lastActive = user.lastActive ? new Date(user.lastActive) : null 

    const isConsecutive = lastActive && this.isYesterday(lastActive, today)

    let streakCount = user.streakCount 

    if (isConsecutive) {
      streakCount += 1
    } else {
      streakCount = 1
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: {
        streakCount,
        lastActive: today
      }
    })

    return { streakCount }
  }

  private isYesterday(lastActive: Date, today: Date): boolean {
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1)

    return (
      lastActive.getDate() === yesterday.getDate() &&
      lastActive.getMonth() === yesterday.getMonth() &&
      lastActive.getFullYear() === yesterday.getFullYear()
    )
  }
}
