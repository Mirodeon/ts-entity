import {Entity} from "../entity/Entity";
import {UserLogin} from "./UserLogin";
import {IData, ValidationResult} from "@mirodeon/ts-core";
import {UserAccess} from "./UserAccess";
import {Applications} from "../application/Applications";

export class User extends Entity {
    login: UserLogin = new UserLogin();
    access: UserAccess = new UserAccess();
    name: string;
    applications: Applications = new Applications();

    constructor() {
        super();
        this.TimeMetadata().WithDayIndex().WithMonthIndex().WithYearIndex();
    }

    InnerSerialize(): IData {
        return {
            login: this.login.Serialize(),
            access: this.access.Serialize(),
            name: this.name,
            applications: this.applications.Serialize()
        }
    }

    InnerDeserialize(data: IData): void {
        this.login.Deserialize(data['login']);
        this.access.Deserialize(data['access']);
        this.name = data['name'];
        this.applications.Deserialize(data['applications']);
    }

    InnerToPersistable(): IData {
        return {
            login: this.login.Serialize(),
            name: this.name,
            applications: this.applications.ToLazyPersistable()
        }
    }

    InnerToEntity(data: IData): void {
        this.login.Deserialize(data['login']);
        this.name = data['name'];
        this.applications.ToLazyEntity(data['applications']);
    }

    IsValid(): ValidationResult {
        return this.login.IsValid();
    }

    Clone(): User {
        return this.InnerClone(new User());
    }
}