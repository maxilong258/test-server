"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conditionUtils = void 0;
const conditionUtils = (queryBuilder, obj) => {
    Object.keys(obj).forEach((key) => {
        if (obj[key]) {
            queryBuilder.andWhere(`${key} = :${key}`, { [key]: obj[key] });
        }
    });
    return queryBuilder;
};
exports.conditionUtils = conditionUtils;
//# sourceMappingURL=db.helper.js.map