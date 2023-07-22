import { Roles } from "../../roles/roles.entity";
export declare class Menus {
    id: number;
    name: string;
    path: string;
    order: number;
    acl: string;
    role: Roles;
}
