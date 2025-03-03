import { Controller, Get, Post, Body, Param, Delete, Request, Put, BadRequestException, UsePipes, ValidationPipe, UploadedFile, UseGuards, NotFoundException } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from 'src/guards/jwt.auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Permissions } from 'src/decorators/permissions.decorator';
import { RolesGuard } from 'src/guards/roles.auth.guard';
import { PermissionsGuard } from 'src/guards/permissions.guard';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles('ADMIN')
  @Permissions('ADD_BOOK')
  create(
    @Request() req,
    @Body() createBookDto: CreateBookDto, 
    @UploadedFile() file: Express.Multer.File
    ) {
    return this.booksService.create(req.user.email, createBookDto, file);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard, PermissionsGuard)
  @Roles('USER', 'ADMIN')
  @Permissions('READ_CONTENT')
  async findAll(@Request() req) {
    const userId = req.user.id 
    const books = await this.booksService.findAll(userId);
    if (!books || books.length === 0) {
      throw new NotFoundException('No books found')
    }
    return books;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {

    if (!updateBookDto) {
      throw new BadRequestException('Update data is required');
    }

    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
