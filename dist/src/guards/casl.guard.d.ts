import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityService } from 'src/auth/casl-ability.service';
export declare class CaslGuard implements CanActivate {
    private reflector;
    private caslAbilityService;
    constructor(reflector: Reflector, caslAbilityService: CaslAbilityService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
