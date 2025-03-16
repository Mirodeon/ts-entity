import {Serializable} from "../entity/serializable/Serializable";
import {IPersistable} from "../entity/persistable/IPersistable";
import {IData, InvalidResult, ValidationResult, Validator, ValidResult} from "@mirodeon/ts-core";
import {TimeMetadata} from "../date/TimeMetadata";
import {DateEntity} from "../date/DateEntity";

export class UserPassword extends Serializable implements IPersistable {
    protected value: string;
    protected lastUpdate: TimeMetadata = new TimeMetadata().WithModificationKey('lastUpdate').WithUpdateModification(false);

    LastUpdate(): DateEntity {
        return this.lastUpdate.Modification();
    }

    UpdateModification(): UserPassword {
        this.lastUpdate.Modification().UpdateModification();
        return this;
    }

    Value(): string {
        return this.value;
    }

    SetValue(value: string): UserPassword {
        this.value = value;
        return this;
    }

    HasValue(): boolean {
        return this.value != null && this.value.length > 0;
    }

    IsValid(): ValidationResult {
        if (Validator.ValidPassword(this.value)) {
            return new ValidResult();
        }

        return new InvalidResult("the_password_must_be_at_least_6_characters");
    }

    Clear(): void {
        this.value = null;
    }

    Deserialize(data: IData): void {
        this.value = data["value"];
        this.lastUpdate.Deserialize(data);
    }

    Serialize(): IData {
        return {
            value: this.value,
            ...this.lastUpdate.Serialize()
        };
    }

    ToEntity(data: IData): void {
        this.value = data["value"];
        this.lastUpdate.Deserialize(data);
    }

    ToPersistable(): IData {
        return {
            value: this.value,
            ...this.lastUpdate.ToPersistable()
        };
    }

    Clone(): UserPassword {
        return this.InnerClone(new UserPassword());
    }
}