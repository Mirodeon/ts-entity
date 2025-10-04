import {EnumBase} from "../enum/EnumBase";

export class UserRole extends EnumBase<UserRole> {
    static readonly MEMBER = new UserRole('MEMBER', 'Member');
    static readonly MODERATOR = new UserRole('MODERATOR', 'Moderator');
    static readonly MANAGER = new UserRole('MANAGER', 'Manager');
    static readonly ADMIN = new UserRole('ADMIN', 'Admin');
    static readonly SUPER_ADMIN = new UserRole('SUPER_ADMIN', 'Super admin');

    static Default(): UserRole {
        return UserRole.MEMBER;
    }
}