import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'prisma/prisma.service';
// import * as fs from 'fs';
// import * as path from 'path';
import { MinioService } from 'src/minio/minio.service';

@Injectable()
export class BooksService {

  constructor(private prisma: PrismaService, 
    private minioService: MinioService) {}

  async create(userEmail: string, createBookDto: CreateBookDto, file: Express.Multer.File) {
    const { title, author, publicationDate } = createBookDto;
    const fileUrl = await this.minioService.uploadFile(file);

    try {
      return await this.prisma.book.create({
        data: {
          title,
          author,
          publicationDate,
          fileUrl,
          user: { connect: { email: userEmail } },
        },
      });
    } catch (error) {
      throw new BadRequestException(`Error creating book: ${error.message}`);
    }
  }

  async getQuran() {
    try {
      console.log('Fetching Quran from S3...');
      const objects = await this.minioService.listFiles();
      
      if (!objects || objects.length === 0) {
        throw new NotFoundException('Quran file not found in S3.');
      }
  
      const quranFile = objects[0];
      const quranUrl = await this.minioService.getFileUrl(quranFile.name);
  
      console.log('Quran URL:', quranUrl);
      return { title: 'Quran', fileUrl: quranUrl };
    } catch (error) {
      console.error('Error fetching Quran:', error);
      throw new InternalServerErrorException(`Failed to fetch Quran: ${error.message}`);
    }
  }

  async findAll() {
    const books = await this.prisma.book.findMany({
      select: {
        id: true,
        title: true,
        author: true,
        fileUrl: true,
        publicationDate: true,
        createdAt: true,
      },
    });

    if (!books || books.length === 0) {
      throw new NotFoundException('No books found');
    }

    return books;
  }

  async findOne(id: string) {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) throw new NotFoundException(`Book with ID ${id} not found`);
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    try {
      return await this.prisma.book.update({
        where: { id },
        data: updateBookDto,
      });
    } catch (error) {
      throw new HttpException(`Error updating book: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) {
    return this.prisma.book.delete({ where: { id } });
  }
}
