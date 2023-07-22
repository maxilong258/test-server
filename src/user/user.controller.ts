import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Inject,
  LoggerService,
  Body,
  Param,
  Query,
  UseFilters,
  Headers,
  UnauthorizedException,
  UseGuards,
  ParseIntPipe
} from '@nestjs/common'
import { UserService } from './user.service'
import { ConfigService } from '@nestjs/config'
import { User } from './user.entity'
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston'
import { getUserDto } from './dto/get-user.dto'
import { TypeormFilter } from 'src/filters/typeorm.filter'
import { log } from 'console'
import { CreateUserDto } from './dto/create-user.dto'
import { AdminGuard } from 'src/guards/admin.guard'
import { JwtGuard } from 'src/guards/jwt.guard'

@Controller('user')
@UseFilters(new TypeormFilter())
@UseGuards(JwtGuard)
export class UserController {
  // private logger = new Logger(UserController.name);

  constructor(
    private userService: UserService,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService
  ) {
    this.logger.log('UserController init')
  }

  @Get()
  // @UseGuards(AdminGuard)
  getUsers(@Query() query: getUserDto): any {
    return this.userService.findAll(query)
  }

  @Post()
  addUser(@Body() dto: CreateUserDto): any {
    const user = dto as User
    return this.userService.create(user)
  }

  @Patch('/:id')
  updateUser(
    @Body() dto: any,
    @Param('id') id: number,
    @Headers('Authorization') headers: any
  ): any {
    const user = dto as User
    return this.userService.update(id, user)
    // if (id === headers) {
    //   const user = dto as User
    //   return this.userService.update(id, user)
    // } else {
    //   throw new UnauthorizedException()
    // }
  }

  @Delete('/:id')
  removeUser(@Body() dto: any, @Param('id') id: number): any {
    // todo 传递参数id
    return this.userService.remove(id)
  }

  @Get('/profile')
  // @UseGuards(AdminGuard)
  getUserProfile(@Query('id', ParseIntPipe) id: any): any {
    return this.userService.findProfile(id)
  }

  @Get('/logs')
  getUserLogs(): any {
    return this.userService.findUserLogs(2)
  }

  @Get('/logsByGroup')
  async getLogsByGroup(): Promise<any> {
    const res = await this.userService.findLogsByGroup(2)
    // return res.map((o) => ({
    //   result: o.result,
    //   count: o.count,
    // }));
    return res
  }
}
