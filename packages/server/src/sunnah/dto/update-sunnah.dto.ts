import { PartialType } from '@nestjs/swagger';
import { CreateSunnahDto } from './create-sunnah.dto';

export class UpdateSunnahDto extends PartialType(CreateSunnahDto) {}
