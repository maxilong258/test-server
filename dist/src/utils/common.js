"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEntities = void 0;
const logs_entity_1 = require("../logs/logs.entity");
const menu_entity_1 = require("../menus/entities/menu.entity");
const roles_entity_1 = require("../roles/roles.entity");
const user_entity_1 = require("../user/user.entity");
const getEntities = (path) => {
    const map = {
        '/users': user_entity_1.User,
        '/logs': logs_entity_1.Logs,
        '/roles': roles_entity_1.Roles,
        '/menus': menu_entity_1.Menus,
        '/auth': 'Auth'
    };
    for (let i = 0; i < Object.keys(map).length; i++) {
        const key = Object.keys(map)[i];
        if (path.startsWith(key)) {
            return map[key];
        }
    }
};
exports.getEntities = getEntities;
//# sourceMappingURL=common.js.map