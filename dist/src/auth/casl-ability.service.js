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
exports.CaslAbilityService = void 0;
const ability_1 = require("@casl/ability");
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const common_2 = require("../utils/common");
let CaslAbilityService = class CaslAbilityService {
    constructor(userService) {
        this.userService = userService;
    }
    async forRoot(username) {
        const { can, cannot, build } = new ability_1.AbilityBuilder(ability_1.createMongoAbility);
        const user = await this.userService.find(username);
        user.roles.forEach(role => {
            role.menus.forEach(menu => {
                const actions = menu.acl.split(',');
                actions.forEach(action => can(action, (0, common_2.getEntities)(menu.path)));
            });
        });
        const ability = build({
            detectSubjectType: (object) => object.constructor
        });
        return ability;
    }
};
CaslAbilityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], CaslAbilityService);
exports.CaslAbilityService = CaslAbilityService;
//# sourceMappingURL=casl-ability.service.js.map