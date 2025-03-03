import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as multer from 'multer';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    multer({
      dest: './uploads',
      limits: {
        fileSize: 10 * 1024 * 1024,
      }
    }).single('file')
  )

  app.useStaticAssets(join(__dirname, 'uploads'), {
    prefix: '/uploads/',
  });

  await app.listen(3000);
}
bootstrap();
