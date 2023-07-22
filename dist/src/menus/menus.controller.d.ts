import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
export declare class MenusController {
    private readonly menusService;
    constructor(menusService: MenusService);
    create(createMenuDto: CreateMenuDto): Promise<import("./entities/menu.entity").Menus>;
    findAll(): Promise<import("./entities/menu.entity").Menus[]>;
    findOne(id: string): Promise<import("./entities/menu.entity").Menus>;
    update(id: string, updateMenuDto: UpdateMenuDto): Promise<import("./entities/menu.entity").Menus>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
