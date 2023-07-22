import { Roles } from "src/roles/roles.entity";
import { Profile } from "../profile.entity";
export declare class CreateUserDto {
    username: string;
    password: string;
    profile?: Profile;
    roles?: Roles[] | number[];
}
