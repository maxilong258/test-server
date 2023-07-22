"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionParams = void 0;
const typeorm_1 = require("typeorm");
const fs = require("fs");
const dotenv = require("dotenv");
const config_enum_1 = require("./src/enum/config.enum");
function getEnv(env) {
    if (fs.existsSync(env)) {
        return dotenv.parse(fs.readFileSync(env));
    }
    return {};
}
function buildConnectionOptions() {
    const defaultConfig = getEnv('.env');
    const envConfig = getEnv(`.env.${process.env.NODE_ENV || 'development'}`);
    const config = Object.assign(Object.assign({}, defaultConfig), envConfig);
    const entitiesDir = process.env.NODE_ENV === 'test'
        ? [__dirname + '/**/*.entity.ts']
        : [__dirname + '/**/*.entity{.js,.ts}'];
    return {
        type: config[config_enum_1.ConfigEnum.DB_TYPE],
        host: config[config_enum_1.ConfigEnum.DB_HOST],
        port: config[config_enum_1.ConfigEnum.DB_PORT],
        username: config[config_enum_1.ConfigEnum.DB_USERNAME],
        password: config[config_enum_1.ConfigEnum.DB_PASSWORD],
        database: config[config_enum_1.ConfigEnum.DB_DATABASE],
        entities: entitiesDir,
        synchronize: true,
        logging: false,
    };
}
exports.connectionParams = buildConnectionOptions();
exports.default = new typeorm_1.DataSource(Object.assign(Object.assign({}, exports.connectionParams), { migrations: ['src/migrations/**'], subscribers: [] }));
//# sourceMappingURL=ormconfig.js.map