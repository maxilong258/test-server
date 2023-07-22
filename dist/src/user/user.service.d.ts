import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Logs } from '../logs/logs.entity';
import { getUserDto } from './dto/get-user.dto';
import { Roles } from 'src/roles/roles.entity';
export declare class UserService {
    private readonly userRepository;
    private readonly logsRepository;
    private readonly rolesRepository;
    constructor(userRepository: Repository<User>, logsRepository: Repository<Logs>, rolesRepository: Repository<Roles>);
    findAll(query: getUserDto): Promise<User[]>;
    find(username: string): Promise<User>;
    findOne(id: number): Promise<User>;
    create(user: Partial<User>): Promise<User>;
    update(id: number, user: Partial<User>): Promise<User>;
    remove(id: number): Promise<User>;
    findProfile(id: number): Promise<User>;
    findUserLogs(id: number): Promise<void>;
    findLogsByGroup(id: number): Promise<any[]>;
}
