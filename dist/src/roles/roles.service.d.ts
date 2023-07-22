import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Repository } from 'typeorm';
import { Roles } from './roles.entity';
export declare class RolesService {
    private roleRepository;
    constructor(roleRepository: Repository<Roles>);
    create(createRoleDto: CreateRoleDto): Promise<Roles>;
    findAll(): Promise<Roles[]>;
    findOne(id: number): Promise<Roles>;
    update(id: number, updateRoleDto: UpdateRoleDto): Promise<Roles>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
