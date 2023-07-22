import { IsNotEmpty, IsString, Length } from "class-validator"

export class SigninUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  username: string

  @IsString()
  @IsNotEmpty()
  @Length(6, 20)
  password: string
}