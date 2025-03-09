import {Serializable} from "../serializable/Serializable";
import {IData, ValidationResult, ValidResult} from "@mirodeon/ts-core";

export class Key extends Serializable {
    protected value: IData;

    constructor(value: IData) {
        super();
        this.value = value;
    }

    public Value(): IData {
        return this.value;
    }

    public ToString(): string {
        if (this.value == null) {
            return ''
        }

        let stringValue = "";
        for (let key in this.value) {
            if (this.value.hasOwnProperty(key)) {
                let value = this.value[key];

                stringValue += key + ":" + (value == null ? 'null' : value.toString()) + ",";
            }
        }
        return stringValue;
    }

    Serialize(): IData {
        return {
            value: this.value
        };
    }

    Deserialize(data: IData): void {
        this.value = data['value'];
    }

    IsValid(): ValidationResult {
        return new ValidResult();
    }

    Clone(): Key {
        return this.InnerClone(new Key(null));
    }
}
