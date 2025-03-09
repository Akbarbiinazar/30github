import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'minio';  

@Injectable()
export class MinioService {
  private minioClient: Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.bucketName = this.configService.get<string>('MINIO_BUCKET');

    this.minioClient = new Client({
      endPoint: this.configService.get<string>('MINIO_ENDPOINT'),
      port: parseInt(this.configService.get<string>('MINIO_PORT')) || 9000,
      useSSL: false,
      accessKey: this.configService.get<string>('MINIO_ACCESS_KEY'),
      secretKey: this.configService.get<string>('MINIO_SECRET_KEY'),
    });

    console.log('🚀 MinIO Client Configured:', {
      endPoint: this.configService.get<string>('MINIO_ENDPOINT'),
      port: this.configService.get<string>('MINIO_PORT'),
      bucket: this.bucketName,
    });

    this.testConnection();
  }

  async testConnection() {
    try {
      const buckets = await this.minioClient.listBuckets();
      console.log('✅ MinIO is reachable:', buckets);
    } catch (error) {
      console.error('❌ MinIO Connection Failed:', error);
    }
  }

  async listFiles(): Promise<{ name: string }[]> {
    const stream = this.minioClient.listObjects(process.env.MINIO_BUCKET, '', true);
    const objects: { name: string }[] = [];
  
    return new Promise((resolve, reject) => {
      stream.on('data', (obj) => objects.push({ name: obj.name }));
      stream.on('end', () => {
        if (objects.length === 0) {
          reject(new NotFoundException('No files found in MinIO bucket.'));
        } else {
          resolve(objects);
        }
      });
      stream.on('error', (error) => {
        console.error('MinIO ListObjects Error:', error);
        reject(new InternalServerErrorException(`MinIO ListObjects failed: ${error.message}`));
      });
    });
  }

  async getFileUrl(fileName: string): Promise<string> {
    return await this.minioClient.presignedUrl('GET', process.env.MINIO_BUCKET, fileName, 24 * 60 * 60);
  }

  
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = file.buffer;

    try {
     
      await this.minioClient.putObject(
        process.env.MINIO_BUCKET_NAME,  
        fileName,  
        filePath,  
        file.size, 
        { 'Content-Type': file.mimetype }  
      );

      return `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET}/${fileName}`;
    } catch (error) {
      throw new Error(`Error uploading file to MinIO: ${error.message}`);
    }
  }
}
