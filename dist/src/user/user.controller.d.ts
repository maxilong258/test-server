import { LoggerService } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { getUserDto } from './dto/get-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserController {
    private userService;
    private configService;
    private readonly logger;
    constructor(userService: UserService, configService: ConfigService, logger: LoggerService);
    getUsers(query: getUserDto): any;
    addUser(dto: CreateUserDto): any;
    updateUser(dto: any, id: number, headers: any): any;
    removeUser(dto: any, id: number): any;
    getUserProfile(id: any): any;
    getUserLogs(): any;
    getLogsByGroup(): Promise<any>;
}
