import { User } from '../user/user.entity';
import { Menus } from '../menus/entities/menu.entity';
export declare class Roles {
    id: number;
    name: string;
    users: User[];
    menus: Menus[];
}
