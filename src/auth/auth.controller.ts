import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, Param, Post, Query, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninUserDto } from './dto/signin-user.dto';
import { Serialize } from 'src/decorators/serialize.decorators';
import { Expose } from 'class-transformer';
import { Roles } from 'src/roles/roles.entity';
import { Profile } from 'src/user/profile.entity';
import { JwtGuard } from 'src/guards/jwt.guard';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';

class LoginExposeDto {
  @Expose()
  username: string
  @Expose()
  roles: Roles[]
  @Expose()
  token: string
}


@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/me') 
  @UseGuards(JwtGuard)
  me(@Req() req: Request) {
    const header: any = req.headers
    return this.authService.me(header.authorization?.split(' ')[1])
    // return {token: header.authorization?.split(' ')[1]}
    // console.log(req.headers.authorization)
    // if (!req.user) return false
    // console.log(req)
    // return req
    // return {aaa: 111}
    // return this.authService.me()
  }

  @Post('/signin')
  // @Serialize(LoginExposeDto)
  async signin(@Body() dto: SigninUserDto) {
    const {username, password} = dto
    return await this.authService.signin(username, password)
  }

  @Post('/signup')
  signup(@Body() dto: SigninUserDto) {
    const {username, password} = dto
    return this.authService.signup(username, password)
  }
}
