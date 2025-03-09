import {ISignal, SignalDispatcher} from "strongly-typed-events";
import {ISerializable} from "./ISerializable";
import {IData, ValidationResult, ValidResult} from "@mirodeon/ts-core";

export abstract class Serializable implements ISerializable {
    protected updated: SignalDispatcher = new SignalDispatcher();

    Update(other: ISerializable): boolean {
        if (this.IsEqual(other)) {
            return false;
        } else {
            this.Deserialize(other.Serialize());
            this.updated.dispatch();
            return true;
        }
    }

    IsEqual(other: ISerializable): boolean {
        return JSON.stringify(this.Serialize()) == JSON.stringify(other.Serialize());
    }

    Updated(): ISignal {
        return this.updated;
    }

    IsValid(): ValidationResult {
        return new ValidResult();
    }

    protected InnerClone<T extends ISerializable>(clone: T): T {
        clone.Deserialize(this.Serialize());
        return clone;
    }

    abstract Clone(): ISerializable;

    abstract Deserialize(data: IData): void;

    abstract Serialize(): IData;
}