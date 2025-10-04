import {Serializable} from "../entity/serializable/Serializable";
import {IData} from "@mirodeon/ts-core";
import {EnumBase} from "./EnumBase";

export class EnumRef<T extends EnumBase<T>> extends Serializable {
    private value: T;

    constructor(private readonly ctor: { Deserialize(data: IData): T; }, initialValue: T) {
        super();
        this.value = initialValue;
    }

    Serialize(): IData {
        return this.value.Serialize();
    }

    Deserialize(data: IData): void {
        this.value = this.ctor.Deserialize(data);
    }

    Clone(): EnumRef<T> {
        return new EnumRef(this.ctor, this.value);
    }

    static FromEnum<U extends EnumBase<U>>(value: U): EnumRef<U> {
        return new EnumRef((value.constructor as Function & { Deserialize(data: IData): U }), value);
    }

    FromEnum(value: T): EnumRef<T> {
        this.value = value;
        return this;
    }
}