import {Serializable} from "../entity/serializable/Serializable";
import {IData, InvalidResult, ValidationResult, Validator, ValidResult} from "@mirodeon/ts-core";

export class UserLogin extends Serializable {
    username: string;
    email: string;
    input: string;
    password: string;

    Serialize(): IData {
        return {
            username: this.username,
            email: this.email,
            input: this.input,
            password: this.password,
        };
    }

    Deserialize(data: IData): void {
        this.username = data["username"];
        this.email = data["email"];
        this.input = data["input"];
        this.password = data["password"];
    }

    Clone(): UserLogin {
        return this.InnerClone(new UserLogin());
    }

    IsValid(fromInput: boolean = true): ValidationResult {
        switch (true) {
            case !this.ValidUser(fromInput):
                return new InvalidResult("please_specify_a_valid_username_or_email");
            case !this.ValidPassword():
                return new InvalidResult("the_password_must_be_at_least_6_characters");
            default:
                return new ValidResult();
        }
    }

    Validate(): ValidationResult {
        let validation = this.IsValid(true);
        if (validation.result) {
            switch (true) {
                case this.ValidEmail():
                    this.email = this.input;
                    break;
                case this.ValidUsername():
                    this.username = this.input;
                    break;
                default:
                    return new InvalidResult("please_specify_a_valid_username_or_email");
            }
        }
        return validation;
    }

    HasInput(): boolean {
        return this.input != null && this.input.length > 0;
    }

    HasUsername(): boolean {
        return this.username != null && this.username.length > 0;
    }

    HasEmail(): boolean {
        return this.email != null && this.email.length > 0;
    }

    private ValidUser(fromInput: boolean = true): boolean {
        return this.ValidUsername(fromInput) || this.ValidEmail(fromInput);
    }

    private ValidUsername(fromInput: boolean = true): boolean {
        const input = fromInput ? this.input : this.username;
        return input != null && input.length >= 4;
    }

    private ValidEmail(fromInput: boolean = true): boolean {
        const input = fromInput ? this.input : this.email;
        return Validator.ValidEmail(input);
    }

    private ValidPassword(): boolean {
        return Validator.ValidPassword(this.password);
    }
}
