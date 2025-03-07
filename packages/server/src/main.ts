import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as multer from 'multer';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: 'http://localhost:8081', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });
  
  const config = new DocumentBuilder()
    .setTitle('Quran App Api')
    .setDescription('The quran api description')
    .setVersion('1.0')
    .addTag('quran')
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('docs', app, documentFactory)

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
