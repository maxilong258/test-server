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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const argon2 = require("argon2");
let AuthService = class AuthService {
    constructor(userService, jwt) {
        this.userService = userService;
        this.jwt = jwt;
    }
    async me(token) {
        try {
            const decodedToken = await this.jwt.verifyAsync(token);
            const user = await this.userService.findOne(decodedToken.sub);
            return {
                username: user.username,
                token
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
    async signin(username, password) {
        const user = await this.userService.find(username);
        if (!user) {
            throw new common_1.ForbiddenException('User not found');
        }
        const isPasswordValid = await argon2.verify(user.password, password);
        if (!isPasswordValid) {
            throw new common_1.ForbiddenException('invalid username or password');
        }
        const token = await this.jwt.signAsync({
            username: user.username,
            sub: user.id
        });
        return Object.assign(Object.assign({}, user), { token });
    }
    async signup(username, password) {
        const user = await this.userService.find(username);
        if (user) {
            throw new common_1.ForbiddenException('User already exist');
        }
        const newUser = await this.userService.create({
            username,
            password
        });
        const token = await this.jwt.signAsync({
            username: newUser.username,
            sub: newUser.id
        });
        return Object.assign(Object.assign({}, newUser), { token });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService, jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map