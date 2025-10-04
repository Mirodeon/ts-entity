import {Entity} from "../entity/Entity";
import {IData, ValidationResult, ValidResult} from "@mirodeon/ts-core";
import {UserAccess} from "./UserAccess";
import {Applications} from "../application/Applications";
import {TimeMetadata} from "../date/TimeMetadata";
import {DateEntity} from "../date/DateEntity";
import {UserInfo} from "./UserInfo";
import {UserLogin} from "./UserLogin";
import {UserPassword} from "./UserPassword";
import {EnumRef} from "../enum/EnumRef";
import {UserRole} from "./UserRole";

export class User extends Entity {
    protected access: UserAccess = new UserAccess();
    protected info: UserInfo = new UserInfo();
    protected password: UserPassword = new UserPassword();
    protected role: EnumRef<UserRole> = UserRole.Ref();
    applications: Applications = new Applications();
    protected lastLogin: TimeMetadata = new TimeMetadata().WithModificationKey('lastLogin').WithUpdateModification(false).WithTime().WithAllIndex();

    constructor() {
        super();
        this.TimeMetadata().WithDayIndex().WithMonthIndex().WithYearIndex();
    }

    LastLogin(): DateEntity {
        return this.lastLogin.Modification();
    }

    UpdateLastLogin(): void {
        this.lastLogin.Modification().UpdateModification();
    }

    Login(): UserLogin {
        const login = new UserLogin();
        login.email = this.info.primaryEmail;
        login.username = this.info.username;
        login.password = this.password.Value();
        return login;
    }

    Access(): UserAccess {
        return this.access;
    }

    Role(): EnumRef<UserRole> {
        return this.role;
    }

    Info(): UserInfo {
        return this.info;
    }

    Password(): UserPassword {
        return this.password;
    }

    SetPassword(value: string): void {
        this.password.SetValue(value);
    }

    CompletePassword(password: UserPassword): boolean {
        const hasValue = this.password.HasValue();
        if (hasValue) {
            this.password.UpdateModification();
        } else {
            this.password.Update(password);
        }
        return !hasValue;
    }

    ClearPassword(): void {
        this.password.Clear();
    }

    IsValid(): ValidationResult {
        const infoValidation = this.info.IsValid();
        if (!infoValidation.result) {
            return infoValidation;
        }

        const passwordValidation = this.password.IsValid();
        if (!passwordValidation.result) {
            return passwordValidation;
        }
        return new ValidResult();
    }

    InnerSerialize(): IData {
        return {
            access: this.access.Serialize(),
            ...this.info.Serialize(),
            password: this.password.Serialize(),
            role: this.role.Serialize(),
            applications: this.applications.Serialize(),
            ...this.lastLogin.Serialize()
        }
    }

    InnerDeserialize(data: IData): void {
        this.access.Deserialize(data['access']);
        this.info.Deserialize(data);
        this.password.Deserialize(data['password']);
        this.role.Deserialize(data['role']);
        this.applications.Deserialize(data['applications']);
        this.lastLogin.Deserialize(data);
    }

    InnerToPersistable(): IData {
        return {
            ...this.info.ToPersistable(),
            password: this.password.ToPersistable(),
            role: this.role.Serialize(),
            applications: this.applications.ToLazyPersistable(),
            ...this.lastLogin.ToPersistable()
        }
    }

    InnerToEntity(data: IData): void {
        this.info.ToEntity(data);
        this.password.ToEntity(data['password']);
        this.role.Deserialize(data['role']);
        this.applications.ToLazyEntity(data['applications']);
        this.lastLogin.ToEntity(data);
    }

    Clone(): User {
        return this.InnerClone(new User());
    }
}