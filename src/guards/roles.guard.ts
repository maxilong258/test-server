import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/roles.enum';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userService: UserService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
      ROLES_KEY, [
        context.getHandler(),
        context.getClass()
      ]
    )
    if (!requiredRoles) return true
    const req = context.switchToHttp().getRequest()
    const user = await this.userService.find(req.user.username)
    const roleIds = user.roles.map(o => o.id)
    return requiredRoles.some(role => roleIds.includes(role))
  }
}
