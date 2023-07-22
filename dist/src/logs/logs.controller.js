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
exports.LogsController = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const serialize_decorators_1 = require("../decorators/serialize.decorators");
class LogsDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LogsDto.prototype, "msg", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LogsDto.prototype, "id", void 0);
class PublicLogsDto {
}
__decorate([
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PublicLogsDto.prototype, "msg", void 0);
let LogsController = class LogsController {
    getTest() {
        return 'test';
    }
    postTest(dto) {
        return dto;
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LogsController.prototype, "getTest", null);
__decorate([
    (0, common_1.Post)(),
    (0, serialize_decorators_1.Serialize)(PublicLogsDto),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LogsDto]),
    __metadata("design:returntype", void 0)
], LogsController.prototype, "postTest", null);
LogsController = __decorate([
    (0, common_1.Controller)('logs')
], LogsController);
exports.LogsController = LogsController;
//# sourceMappingURL=logs.controller.js.map