import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import * as Minio from 'minio';
import { InjectMinio } from 'src/minio/minio.decorator';

@Injectable()
export class FilesService {
  protected _bucketName = 'quran-books';

  constructor(@InjectMinio() private readonly minioService: Minio.Client) {}

  async bucketsList() {
    try {
      return await this.minioService.listBuckets();
    } catch (error) {
      console.error('Error fetching bucket list:', error);
      throw new InternalServerErrorException('Could not fetch bucket list');
    }
  }

  async getFile(filename: string) {
    try {
      const url = await this.minioService.presignedUrl(
        'GET',
        this._bucketName,
        filename
      );
      return { url };
    } catch (error) {
      console.error(`Error generating presigned URL for file: ${filename}`, error);
      throw new InternalServerErrorException('Could not generate file URL');
    }
  }

  async uploadFile(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    try {
      const filename = `${randomUUID()}-${file.originalname}`;

      // Ensure the bucket exists before uploading
      const bucketExists = await this.minioService.bucketExists(this._bucketName);
      if (!bucketExists) {
        console.warn(`Bucket ${this._bucketName} does not exist. Creating...`);
        await this.minioService.makeBucket(this._bucketName, 'us-east-1'); // Change region if needed
      }

      await this.minioService.putObject(
        this._bucketName,
        filename,
        file.buffer,
        file.size
      );

      console.log(`File uploaded successfully: ${filename}`);

      return { message: 'File uploaded successfully', filename };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new InternalServerErrorException('File upload failed');
    }
  }
}
