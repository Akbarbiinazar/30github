import { Module } from '@nestjs/common';
import { SunnahService } from './sunnah.service';
import { SunnahController } from './sunnah.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [SunnahController],
  providers: [SunnahService],
})
export class SunnahModule {}
