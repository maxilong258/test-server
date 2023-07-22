import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { IsString, IsNotEmpty } from 'class-validator';

// export class UpdateRoleDto extends PartialType(CreateRoleDto) {
export class UpdateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string
}
