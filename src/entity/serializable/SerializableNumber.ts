import {Serializable} from "./Serializable";
import {IData} from "@mirodeon/ts-core";

export class SerializableNumber extends Serializable {
    value: number;

    constructor(value?: number) {
        super();
        if (value != null) {
            this.value = value;
        }
    }

    Deserialize(data: IData): void {
        this.value = data['value'];
    }

    Serialize(): IData {
        return {
            value: this.value,
        };
    }

    Clone(): SerializableNumber {
        return this.InnerClone(new SerializableNumber());
    }
}