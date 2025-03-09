import {Serializable} from "./Serializable";
import {IData} from "@mirodeon/ts-core";

export class SerializableString extends Serializable {
    value: string;

    constructor(value: string = '') {
        super();
        this.value = value;
    }

    Deserialize(data: IData): void {
        this.value = data['value'];
    }

    Serialize(): IData {
        return {
            value: this.value,
        };
    }

    Clone(): SerializableString {
        return this.InnerClone(new SerializableString());
    }
}