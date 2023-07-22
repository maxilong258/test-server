import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Menus } from './entities/menu.entity';
import { Repository } from 'typeorm';
export declare class MenusService {
    private menusRepository;
    constructor(menusRepository: Repository<Menus>);
    create(createMenuDto: CreateMenuDto): Promise<Menus>;
    findAll(): Promise<Menus[]>;
    findOne(id: number): Promise<Menus>;
    update(id: number, updateMenuDto: UpdateMenuDto): Promise<Menus>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
