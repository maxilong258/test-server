import { Action } from 'src/enum/action.enum'
import { AnyAbility, AnyMongoAbility, InferSubjects } from '@casl/ability'
import { SetMetadata } from '@nestjs/common'

export enum CHECK_POLICIES_KEY {
  HANDLER = 'CHECK_POLICIES_HANDLER',
  CAN = 'CHECK_POLICIES_CAN',
  CANNOT = 'CHECK_POLICIES_CANNOT'
}

export type PolicyHandlerCallback = (ability: AnyMongoAbility) => boolean

export type CaslHandlerType = PolicyHandlerCallback | PolicyHandlerCallback[]

export const CheckPolicies = (...handlers: PolicyHandlerCallback[]) =>
  SetMetadata(CHECK_POLICIES_KEY.HANDLER, handlers)

export const Can = (
  action: Action,
  subject: InferSubjects<any>,
  conditions?: any
) =>
  SetMetadata(CHECK_POLICIES_KEY.CAN, (ability: AnyAbility) =>
    ability.can(action, subject, conditions)
  )

export const Cannot = (
  action: Action,
  subject: InferSubjects<any>,
  conditions?: any
) =>
  SetMetadata(CHECK_POLICIES_KEY.CAN, (ability: AnyAbility) =>
    ability.cannot(action, subject, conditions)
  )
