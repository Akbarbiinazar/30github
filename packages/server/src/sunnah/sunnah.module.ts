import { Module } from '@nestjs/common';
import { SunnahService } from './sunnah.service';
import { SunnahController } from './sunnah.controller';

@Module({
  controllers: [SunnahController],
  providers: [SunnahService],
})
export class SunnahModule {}
