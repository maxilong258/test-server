import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { getUserDto } from 'src/user/dto/get-user.dto'
import { UserService } from 'src/user/user.service'
import * as argon2 from 'argon2'

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwt: JwtService) {}

  async me(token: string) {
    try {
      const decodedToken = await this.jwt.verifyAsync(token);
      const user = await this.userService.findOne(decodedToken.sub);
      return {
        username: user.username,
        token
      }
    } catch (error) {
      // 如果token无效，则抛出UnauthorizedException异常
      throw new UnauthorizedException('Invalid token');
    }
  }

  async signin(username: string, password: string) {
    const user = await this.userService.find(username)
    if (!user) {
      throw new ForbiddenException('User not found')
    }
    const isPasswordValid = await argon2.verify(user.password, password)
    if (!isPasswordValid) {
      throw new ForbiddenException('invalid username or password')
    }
    const token = await this.jwt.signAsync({
      username: user.username,
      sub: user.id
    })
    return {
      ...user,
      token
    }
  }
  async signup(username: string, password: string) {
    const user = await this.userService.find(username)
    if (user) {
      throw new ForbiddenException('User already exist')
    }
    const newUser = await this.userService.create({
      username,
      password
    })
    const token = await this.jwt.signAsync({
      username: newUser.username,
      sub: newUser.id
    })
    return {
      ...newUser,
      token
    }
  }
}
