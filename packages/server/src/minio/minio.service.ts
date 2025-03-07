import { Injectable } from '@nestjs/common';
import { Client } from 'minio';  

@Injectable()
export class MinioService {
  private minioClient: Client;

  constructor() {
    this.minioClient = new Client({
      endPoint: process.env.MINIO_ENDPOINT,  
      port: parseInt(process.env.MINIO_PORT) || 9000,
      useSSL: process.env.MINIO_USE_SSL === 'true', 
      accessKey: process.env.MINIO_ACCESS_KEY_ID, 
      secretKey: process.env.MINIO_SECRET_ACCESS_KEY, 
    });
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

      return `http://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${process.env.MINIO_BUCKET_NAME}/${fileName}`;
    } catch (error) {
      throw new Error(`Error uploading file to MinIO: ${error.message}`);
    }
  }
}
