"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cannot = exports.Can = exports.CheckPolicies = exports.CHECK_POLICIES_KEY = void 0;
const common_1 = require("@nestjs/common");
var CHECK_POLICIES_KEY;
(function (CHECK_POLICIES_KEY) {
    CHECK_POLICIES_KEY["HANDLER"] = "CHECK_POLICIES_HANDLER";
    CHECK_POLICIES_KEY["CAN"] = "CHECK_POLICIES_CAN";
    CHECK_POLICIES_KEY["CANNOT"] = "CHECK_POLICIES_CANNOT";
})(CHECK_POLICIES_KEY = exports.CHECK_POLICIES_KEY || (exports.CHECK_POLICIES_KEY = {}));
const CheckPolicies = (...handlers) => (0, common_1.SetMetadata)(CHECK_POLICIES_KEY.HANDLER, handlers);
exports.CheckPolicies = CheckPolicies;
const Can = (action, subject, conditions) => (0, common_1.SetMetadata)(CHECK_POLICIES_KEY.CAN, (ability) => ability.can(action, subject, conditions));
exports.Can = Can;
const Cannot = (action, subject, conditions) => (0, common_1.SetMetadata)(CHECK_POLICIES_KEY.CAN, (ability) => ability.cannot(action, subject, conditions));
exports.Cannot = Cannot;
//# sourceMappingURL=casl.decorators.js.map