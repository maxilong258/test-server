import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common'
import { Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'
import { Can, CheckPolicies } from 'src/decorators/casl.decorators'
import { Roles } from 'src/decorators/roles.decorator'
import { Serialize } from 'src/decorators/serialize.decorators'
import { Action } from 'src/enum/action.enum'
import { Role } from 'src/enum/roles.enum'
import { JwtGuard } from 'src/guards/jwt.guard'
import { RolesGuard } from 'src/guards/roles.guard'
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor'
import { Logs } from './logs.entity'
import { CaslGuard } from 'src/guards/casl.guard'

class LogsDto {
  @IsString()
  @IsNotEmpty()
  msg: string

  @IsString()
  @IsNotEmpty()
  id: string
}

class PublicLogsDto {
  @Expose()
  msg: string
}

@Controller('logs')
// @Roles(Role.Admin)
// @UseGuards(JwtGuard, CaslGuard)
// @CheckPolicies((ability) => ability.can(Action.Read, Logs))
export class LogsController {

  @Get()
  // @Can(Action.Read, Logs)
  getTest() {
    return 'test'
  }

  @Post()
  @Serialize(PublicLogsDto)
  postTest(@Body() dto: LogsDto) {
    return dto
  }

}
