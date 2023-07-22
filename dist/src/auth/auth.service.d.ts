import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private userService;
    private jwt;
    constructor(userService: UserService, jwt: JwtService);
    me(token: string): Promise<{
        username: string;
        token: string;
    }>;
    signin(username: string, password: string): Promise<{
        token: string;
        id: number;
        username: string;
        password: string;
        logs: import("../logs/logs.entity").Logs[];
        roles: import("../roles/roles.entity").Roles[];
        profile: import("../user/profile.entity").Profile;
    }>;
    signup(username: string, password: string): Promise<{
        token: string;
        id: number;
        username: string;
        password: string;
        logs: import("../logs/logs.entity").Logs[];
        roles: import("../roles/roles.entity").Roles[];
        profile: import("../user/profile.entity").Profile;
    }>;
}
