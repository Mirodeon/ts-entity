import {Serializable} from "../entity/serializable/Serializable";
import {IData, InvalidResult, ValidationResult, Validator, ValidResult} from "@mirodeon/ts-core";
import {IPersistable} from "../entity/persistable/IPersistable";

export class UserInfo extends Serializable implements IPersistable {
    username: string;
    name: string;
    primaryEmail: string;
    emails: string[] = [];

    IsValid(): ValidationResult {
        switch (true) {
            case !this.ValidEmail():
                return new InvalidResult("please_specify_a_valid_email");
            case !this.ValidUsername():
                return new InvalidResult("the_username_must_be_at_least_4_characters");
            default:
                return new ValidResult();
        }
    }

    private ValidEmail(): boolean {
        return this.ValidEmails() && this.ValidPrimaryEmail();
    }

    private ValidPrimaryEmail(): boolean {
        return Validator.ValidEmail(this.primaryEmail);
    }

    private ValidEmails(): boolean {
        return Validator.ValidEmails(this.emails);
    }

    private ValidUsername(): boolean {
        return this.username != null && this.username.length >= 4;
    }

    Deserialize(data: IData): void {
        this.username = data["username"];
        this.name = data["name"];
        this.primaryEmail = data["primaryEmail"];
        this.emails = data["emails"];
    }

    Serialize(): IData {
        return {
            username: this.username,
            name: this.name,
            primaryEmail: this.primaryEmail,
            emails: this.emails
        };
    }

    ToEntity(data: IData) {
        this.username = data["username"];
        this.name = data["name"];
        this.primaryEmail = data["primaryEmail"];
        this.emails = data["emails"];
    }

    ToPersistable(): IData {
        return {
            username: this.username,
            name: this.name,
            primaryEmail: this.primaryEmail,
            emails: this.emails
        };
    }

    Clone(): UserInfo {
        return this.InnerClone(new UserInfo());
    }
}