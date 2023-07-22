import { AuthService } from './auth.service';
import { SigninUserDto } from './dto/signin-user.dto';
import { Roles } from 'src/roles/roles.entity';
import { Profile } from 'src/user/profile.entity';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    me(req: Request): Promise<{
        username: string;
        token: string;
    }>;
    signin(dto: SigninUserDto): Promise<{
        token: string;
        id: number;
        username: string;
        password: string;
        logs: import("../logs/logs.entity").Logs[];
        roles: Roles[];
        profile: Profile;
    }>;
    signup(dto: SigninUserDto): Promise<{
        token: string;
        id: number;
        username: string;
        password: string;
        logs: import("../logs/logs.entity").Logs[];
        roles: Roles[];
        profile: Profile;
    }>;
}
