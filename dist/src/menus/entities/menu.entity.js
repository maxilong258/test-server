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
exports.Menus = void 0;
const roles_entity_1 = require("../../roles/roles.entity");
const typeorm_1 = require("typeorm");
let Menus = class Menus {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Menus.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Menus.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Menus.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Menus.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Menus.prototype, "acl", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => roles_entity_1.Roles, (roles) => roles.menus),
    (0, typeorm_1.JoinTable)({ name: 'role_menus' }),
    __metadata("design:type", roles_entity_1.Roles)
], Menus.prototype, "role", void 0);
Menus = __decorate([
    (0, typeorm_1.Entity)()
], Menus);
exports.Menus = Menus;
//# sourceMappingURL=menu.entity.js.map