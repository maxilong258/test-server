import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    const user = (await this.userService.find(req.user.username)) as User
    console.log(user, 'user')
    if (user.roles.filter(role => role.id === 2).length) {
      return true
    }
    return false;
  }
}
