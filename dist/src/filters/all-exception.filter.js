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
exports.AllExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const requestIp = require("request-ip");
let AllExceptionFilter = class AllExceptionFilter {
    constructor(logger, httpAdapterHost) {
        this.logger = logger;
        this.httpAdapterHost = httpAdapterHost;
    }
    catch(exception, host) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const httpStatus = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const responseBody = {
            headers: request.headers,
            query: request.query,
            body: request.body,
            params: request.params,
            timestamp: new Date().toISOString(),
            ip: requestIp.getClientIp(request),
            exceptioin: exception['name'],
            error: exception['response'] || 'Internal Server Error',
        };
        this.logger.error('[toimc]', responseBody);
        httpAdapter.reply(response, responseBody, httpStatus);
    }
};
AllExceptionFilter = __decorate([
    (0, common_2.Catch)(),
    __metadata("design:paramtypes", [Object, Object])
], AllExceptionFilter);
exports.AllExceptionFilter = AllExceptionFilter;
//# sourceMappingURL=all-exception.filter.js.map