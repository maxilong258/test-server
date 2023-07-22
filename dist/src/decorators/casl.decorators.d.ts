import { Action } from 'src/enum/action.enum';
import { AnyMongoAbility, InferSubjects } from '@casl/ability';
export declare enum CHECK_POLICIES_KEY {
    HANDLER = "CHECK_POLICIES_HANDLER",
    CAN = "CHECK_POLICIES_CAN",
    CANNOT = "CHECK_POLICIES_CANNOT"
}
export declare type PolicyHandlerCallback = (ability: AnyMongoAbility) => boolean;
export declare type CaslHandlerType = PolicyHandlerCallback | PolicyHandlerCallback[];
export declare const CheckPolicies: (...handlers: PolicyHandlerCallback[]) => import("@nestjs/common").CustomDecorator<CHECK_POLICIES_KEY>;
export declare const Can: (action: Action, subject: InferSubjects<any>, conditions?: any) => import("@nestjs/common").CustomDecorator<CHECK_POLICIES_KEY>;
export declare const Cannot: (action: Action, subject: InferSubjects<any>, conditions?: any) => import("@nestjs/common").CustomDecorator<CHECK_POLICIES_KEY>;
