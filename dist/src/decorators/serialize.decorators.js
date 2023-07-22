"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serialize = void 0;
const common_1 = require("@nestjs/common");
const serialize_interceptor_1 = require("../interceptors/serialize.interceptor");
function Serialize(dto) {
    return (0, common_1.UseInterceptors)(new serialize_interceptor_1.SerializeInterceptor(dto));
}
exports.Serialize = Serialize;
//# sourceMappingURL=serialize.decorators.js.map