import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(createRoleDto: CreateRoleDto): Promise<import("./roles.entity").Roles>;
    findAll(): Promise<import("./roles.entity").Roles[]>;
    findOne(id: string): Promise<import("./roles.entity").Roles>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<import("./roles.entity").Roles>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
