import {Serializable} from "../entity/serializable/Serializable";
import {IData, InvalidResult, ValidationResult, ValidResult} from "@mirodeon/ts-core";

export class UserLogin extends Serializable {
    email: string;
    password: string;

    Serialize(): IData {
        return {
            email: this.email,
            password: this.password,
        };
    }

    Deserialize(data: IData): void {
        this.email = data["email"];
        this.password = data["password"];
    }

    Clone(): UserLogin {
        return this.InnerClone(new UserLogin());
    }

    IsValid(): ValidationResult {
        switch (true) {
            case !this.ValidEmail():
                return new InvalidResult("please_specify_an_valid_email");
            case this.ValidPassword():
                return new InvalidResult("the_password_must_be_contains_at_least_6_characters");
            default:
                return new ValidResult();
        }
    }

    private ValidEmail(): boolean {
        let regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regularExpression.test(String(this.email).toLowerCase());
    }

    private ValidPassword(): boolean {
        if (this.password != null) {
            return this.password.length >= 6;
        }

        return true;
    }
}
