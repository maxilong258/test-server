"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaslGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const casl_ability_service_1 = require("../auth/casl-ability.service");
const casl_decorators_1 = require("../decorators/casl.decorators");
let CaslGuard = class CaslGuard {
    constructor(reflector, caslAbilityService) {
        this.reflector = reflector;
        this.caslAbilityService = caslAbilityService;
    }
    async canActivate(context) {
        const handlers = this.reflector.getAllAndMerge(casl_decorators_1.CHECK_POLICIES_KEY.HANDLER, [context.getHandler(), context.getClass]);
        const canHandlers = this.reflector.getAllAndMerge(casl_decorators_1.CHECK_POLICIES_KEY.CAN, [context.getHandler(), context.getClass]);
        const cannotHandlers = this.reflector.getAllAndMerge(casl_decorators_1.CHECK_POLICIES_KEY.CANNOT, [context.getHandler(), context.getClass]);
        if (!handlers || !canHandlers || !cannotHandlers) {
            return true;
        }
        const req = context.switchToHttp().getRequest();
        if (!req.user)
            return false;
        const ability = await this.caslAbilityService.forRoot(req.user.username);
        let flag = true;
        if (handlers) {
            flag = flag && handlers.every((handler) => handler(ability));
        }
        if (flag && handlers) {
            if (canHandlers instanceof Array) {
                flag = flag && canHandlers.every((handler) => handler(ability));
            }
            else if (typeof canHandlers === 'function') {
                flag = flag && canHandlers(ability);
            }
        }
        if (flag && handlers) {
            if (cannotHandlers instanceof Array) {
                flag = flag && cannotHandlers.every((handler) => handler(ability));
            }
            else if (typeof cannotHandlers === 'function') {
                flag = flag && cannotHandlers(ability);
            }
        }
    }
};
CaslGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        casl_ability_service_1.CaslAbilityService])
], CaslGuard);
exports.CaslGuard = CaslGuard;
//# sourceMappingURL=casl.guard.js.map