import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { SunnahModule } from './sunnah/sunnah.module';
import { ChatGateway } from './chat/chat.gateway';
import { StreakModule } from './streak/streak.module';

@Module({
  imports: [AuthModule, BooksModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UserModule,
    SunnahModule,
    StreakModule
  ],
  controllers: [],
  providers: [ChatGateway],
})
export class AppModule {}
