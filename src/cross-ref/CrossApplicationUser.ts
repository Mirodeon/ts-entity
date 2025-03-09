import {CrossEntity} from "./CrossEntity";
import {Application} from "../application/Application";
import {User} from "../user/User";

export class CrossApplicationUser extends CrossEntity<Application, User> {
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

    Clone(): CrossApplicationUser {
        return this.InnerClone(new CrossApplicationUser());
    }
}