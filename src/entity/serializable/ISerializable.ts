import {ISignal} from "strongly-typed-events";
import {IData, ValidationResult} from "@mirodeon/ts-core";

export interface ISerializable {
    // @formatter:off
    Serialize(): IData;
    Deserialize(data: IData): void;
    IsValid(): ValidationResult;
    Clone(): ISerializable;
    Update(other: ISerializable): boolean;
    IsEqual(other: ISerializable): boolean;
    Updated(): ISignal
    // @formatter:on
}
