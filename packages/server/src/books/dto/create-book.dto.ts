import { IsString, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateBookDto {
    @IsString()
    title: string;

    @IsString()
    author: string;

    @IsDateString()
    publicationDate: string;

    @IsNotEmpty()
    file: Express.Multer.File
}
