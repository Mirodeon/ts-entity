import {Entity} from "../entity/Entity";
import {UserLogin} from "./UserLogin";
import {IData, ValidationResult} from "@mirodeon/ts-core";
import {UserAccess} from "./UserAccess";
import {Applications} from "../application/Applications";
import {TimeMetadata} from "../date/TimeMetadata";
import {DateEntity} from "../date/DateEntity";

export class User extends Entity {
    login: UserLogin = new UserLogin();
    access: UserAccess = new UserAccess();
    name: string;
    applications: Applications = new Applications();
    protected lastLogin: TimeMetadata = new TimeMetadata().WithModificationKey('lastLogin').WithTime().WithAllIndex();

    constructor() {
        super();
        this.TimeMetadata().WithDayIndex().WithMonthIndex().WithYearIndex();
    }

    LastLogin(): DateEntity {
        return this.lastLogin.Modification();
    }

    InnerSerialize(): IData {
        return {
            login: this.login.Serialize(),
            access: this.access.Serialize(),
            name: this.name,
            applications: this.applications.Serialize(),
            ...this.lastLogin.Serialize()
        }
    }

    InnerDeserialize(data: IData): void {
        this.login.Deserialize(data['login']);
        this.access.Deserialize(data['access']);
        this.name = data['name'];
        this.applications.Deserialize(data['applications']);
        this.lastLogin.Deserialize(data);
    }

    InnerToPersistable(): IData {
        return {
            login: this.login.Serialize(),
            name: this.name,
            applications: this.applications.ToLazyPersistable(),
            ...this.lastLogin.ToPersistable()
        }
    }

    InnerToEntity(data: IData): void {
        this.login.Deserialize(data['login']);
        this.name = data['name'];
        this.applications.ToLazyEntity(data['applications']);
        this.lastLogin.ToEntity(data);
    }

    IsValid(): ValidationResult {
        return this.login.IsValid();
    }

    Clone(): User {
        return this.InnerClone(new User());
    }
}