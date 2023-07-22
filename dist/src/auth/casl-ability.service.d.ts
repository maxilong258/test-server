import { UserService } from 'src/user/user.service';
export declare class CaslAbilityService {
    private userService;
    constructor(userService: UserService);
    forRoot(username: string): Promise<import("@casl/ability").MongoAbility<import("@casl/ability").AbilityTuple<string, import("@casl/ability").Subject>, import("@casl/ability").MongoQuery<import("@casl/ability/dist/types/types").AnyObject>>>;
}
