import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { CaslAbilityService } from 'src/auth/casl-ability.service'
import {
  CHECK_POLICIES_KEY,
  CaslHandlerType,
  PolicyHandlerCallback
} from 'src/decorators/casl.decorators'

@Injectable()
export class CaslGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityService: CaslAbilityService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const handlers = this.reflector.getAllAndMerge<PolicyHandlerCallback[]>(
      CHECK_POLICIES_KEY.HANDLER,
      [context.getHandler(), context.getClass]
    )
    const canHandlers = this.reflector.getAllAndMerge<any[]>(
      CHECK_POLICIES_KEY.CAN,
      [context.getHandler(), context.getClass]
    ) as CaslHandlerType
    const cannotHandlers = this.reflector.getAllAndMerge<any[]>(
      CHECK_POLICIES_KEY.CANNOT,
      [context.getHandler(), context.getClass]
    ) as CaslHandlerType
    if (!handlers || !canHandlers || !cannotHandlers) {
      return true
    }

    const req = context.switchToHttp().getRequest()
    if (!req.user) return false

    const ability = await this.caslAbilityService.forRoot(req.user.username)

    let flag = true
    if (handlers) {
      flag = flag && handlers.every((handler) => handler(ability))
    }
    if (flag && handlers) {
      if (canHandlers instanceof Array) {
        flag = flag && canHandlers.every((handler) => handler(ability))
      } else if (typeof canHandlers === 'function') {
        flag = flag && canHandlers(ability)
      }
    }
    if (flag && handlers) {
      if (cannotHandlers instanceof Array) {
        flag = flag && cannotHandlers.every((handler) => handler(ability))
      } else if (typeof cannotHandlers === 'function') {
        flag = flag && cannotHandlers(ability)
      }
    }
  }
}
