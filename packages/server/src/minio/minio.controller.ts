import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MinioService } from './minio.service';
import { FileInterceptor } from '@nestjs/platform-express'; // for file upload handling
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // optional: for Swagger docs

@Controller('minio')
@ApiTags('Minio')
export class MinioController {
  constructor(private readonly minioService: MinioService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) 
  @ApiOperation({ summary: 'Upload file to MinIO' }) 
  @ApiResponse({ status: 200, description: 'File uploaded successfully' }) 
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      const fileUrl = await this.minioService.uploadFile(file); 
      return { fileUrl }; 
    } catch (error) {
      throw error; 
    }
  }

  
}
