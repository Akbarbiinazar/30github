import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { SunnahModule } from './sunnah/sunnah.module';
import { ChatGateway } from './chat/chat.gateway';
import { StreakModule } from './streak/streak.module';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from './configs/redis-options';

@Module({
  imports: [AuthModule, BooksModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
    CacheModule.register(RedisOptions),
    UserModule,
    SunnahModule,
    StreakModule,
    HttpModule
  ],
  controllers: [],
  providers: [ChatGateway],
})
export class AppModule {}
