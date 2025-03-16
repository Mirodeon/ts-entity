import {Application} from "../application/Application";
import {User} from "../user/User";
import {CrossRefEntity} from "./CrossRefEntity";

export class CrossRefApplicationUser extends CrossRefEntity<Application, User> {
    constructor() {
        super();
        this.TimeMetadata().WithCreationDayIndex().WithCreationMonthIndex().WithCreationYearIndex();
    }

    protected CreatePrimary(): Application {
        return new Application();
    }

    protected CreateSecondary(): User {
        return new User();
    }

    Clone(): CrossRefApplicationUser {
        return this.InnerClone(new CrossRefApplicationUser());
    }
}