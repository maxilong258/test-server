import { IsNotEmpty, IsString, Length } from "class-validator"
import { Roles } from "src/roles/roles.entity"
import { Profile } from "../profile.entity"

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  username: string

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string

  @IsNotEmpty()
  profile?: Profile

  @IsNotEmpty()
  roles?: Roles[] | number[]
}