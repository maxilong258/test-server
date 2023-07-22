"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeormFilter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let TypeormFilter = class TypeormFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        let code = 500;
        if (exception instanceof typeorm_1.QueryFailedError) {
            code = exception.driverError.errno;
        }
        const response = ctx.getResponse();
        response.status(500).json({
            code,
            timestamp: new Date().toISOString(),
            message: exception.message
        });
    }
};
TypeormFilter = __decorate([
    (0, common_1.Catch)(typeorm_1.TypeORMError)
], TypeormFilter);
exports.TypeormFilter = TypeormFilter;
//# sourceMappingURL=typeorm.filter.js.map