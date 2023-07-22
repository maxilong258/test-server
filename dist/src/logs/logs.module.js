"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogsModule = void 0;
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const config_1 = require("@nestjs/config");
const winston = require("winston");
const transports_1 = require("winston/lib/winston/transports");
const nest_winston_2 = require("nest-winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const config_enum_1 = require("../enum/config.enum");
const logs_controller_1 = require("./logs.controller");
const logs_service_1 = require("./logs.service");
function createDailyRotateTrasnport(level, filename) {
    return new DailyRotateFile({
        level,
        dirname: 'logs',
        filename: `${filename}-%DATE%.log`,
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        format: winston.format.combine(winston.format.timestamp(), winston.format.simple()),
    });
}
let LogsModule = class LogsModule {
};
LogsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nest_winston_1.WinstonModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const consoleTransports = new transports_1.Console({
                        level: 'info',
                        format: winston.format.combine(winston.format.timestamp(), nest_winston_2.utilities.format.nestLike()),
                    });
                    return {
                        transports: [
                            consoleTransports,
                            ...(configService.get(config_enum_1.LogEnum.LOG_ON)
                                ? [
                                    createDailyRotateTrasnport('info', 'application'),
                                    createDailyRotateTrasnport('warn', 'error'),
                                ]
                                : []),
                        ],
                    };
                },
            }),
        ],
        controllers: [logs_controller_1.LogsController],
        providers: [logs_service_1.LogsService],
    })
], LogsModule);
exports.LogsModule = LogsModule;
//# sourceMappingURL=logs.module.js.map