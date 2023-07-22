import { PartialType } from '@nestjs/mapped-types';
import { CreateMenuDto } from './create-menu.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateMenuDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  path: string

  @IsNumber()
  @IsNotEmpty()
  order: number

  @IsString()
  @IsNotEmpty()
  acl: string
}
