import {Key} from "./Key";
import {IdGenerator} from "@mirodeon/ts-core";

export class IdKey extends Key {
    constructor(id?: string) {
        super({id: id});
    }

    GetId(): string {
        return this.value['id'];
    }

    HasId(): boolean {
        return this.value.hasOwnProperty('id') && this.value['id'] != null;
    }

    SetId(value: string): void {
        this.value['id'] = value;
    }

    GenerateId(): IdKey {
        this.SetId(IdGenerator.V4());
        return this;
    }

    Clone(): IdKey {
        return this.InnerClone(new IdKey());
    }
}
