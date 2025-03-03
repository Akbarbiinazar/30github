import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';


@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(userEmail: string, createBookDto: CreateBookDto, file: Express.Multer.File) {
    const {title, author, publicationDate} = createBookDto

    const filePath = await this.saveFile(file)

    try {
      return await this.prisma.book.create({
        data: {
          title,
          author, 
          publicationDate,
          fileUrl: filePath,
          user: {connect: {email: userEmail}}
        }
      })
    } catch (error) {
      throw new BadRequestException(`Error creating book: ${error.message}`);
    }
  }

  async findAll(userId: string) {
    const books = await this.prisma.book.findMany({
      where: {userId},
      select: {
        id: true,
        title: true, 
        author: true, 
        fileUrl: true,
        publicationDate: true,
        createdAt: true
      }
    })

    if (!books || books.length === 0) {
      throw new NotFoundException('No books found')
    }

    return books
  }

  findOne(id: string) {
    return this.prisma.book.findUnique({where: {id}})
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
   
  try {
    return await this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });
  } catch (error) {
    console.error('Error updating book:', error);
    throw new HttpException(`Error updating book: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
  }
  }

  remove(id: string) {
    return this.prisma.book.delete({ where: { id } });
  }

  private async saveFile(file: Express.Multer.File): Promise<string> {
    try {
      const uploadDir = path.join(__dirname, '..', '..', 'uploads')
      console.log(uploadDir)
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, {recursive: true})
      }

      const fileName = `${Date.now()}-${file.originalname}`
      const filePath = path.join(uploadDir, fileName)

      fs.writeFileSync(filePath, file.buffer)

      return filePath

    } catch (error) {
      throw new InternalServerErrorException('Failed to save file')
    }
  } 
}
