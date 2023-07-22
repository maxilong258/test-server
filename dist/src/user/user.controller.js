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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const config_1 = require("@nestjs/config");
const nest_winston_1 = require("nest-winston");
const typeorm_filter_1 = require("../filters/typeorm.filter");
const create_user_dto_1 = require("./dto/create-user.dto");
const jwt_guard_1 = require("../guards/jwt.guard");
let UserController = class UserController {
    constructor(userService, configService, logger) {
        this.userService = userService;
        this.configService = configService;
        this.logger = logger;
        this.logger.log('UserController init');
    }
    getUsers(query) {
        return this.userService.findAll(query);
    }
    addUser(dto) {
        const user = dto;
        return this.userService.create(user);
    }
    updateUser(dto, id, headers) {
        const user = dto;
        return this.userService.update(id, user);
    }
    removeUser(dto, id) {
        return this.userService.remove(id);
    }
    getUserProfile(id) {
        return this.userService.findProfile(id);
    }
    getUserLogs() {
        return this.userService.findUserLogs(2);
    }
    async getLogsByGroup() {
        const res = await this.userService.findLogsByGroup(2);
        return res;
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Object)
], UserController.prototype, "addUser", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Headers)('Authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Object)
], UserController.prototype, "removeUser", null);
__decorate([
    (0, common_1.Get)('/profile'),
    __param(0, (0, common_1.Query)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "getUserProfile", null);
__decorate([
    (0, common_1.Get)('/logs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], UserController.prototype, "getUserLogs", null);
__decorate([
    (0, common_1.Get)('/logsByGroup'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getLogsByGroup", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, common_1.UseFilters)(new typeorm_filter_1.TypeormFilter()),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(2, (0, common_1.Inject)(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        config_1.ConfigService, Object])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map