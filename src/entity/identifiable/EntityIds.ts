import {IdKey} from "./IdKey";
import {IEntity} from "../IEntity";
import {Serializable} from "../serializable/Serializable";
import {IData} from "@mirodeon/ts-core";

export class EntityIds extends Serializable {
    ids: string[] = [];

    Has(value: string): boolean {
        return this.ids.some(id => id == value);
    }

    Clone(): EntityIds {
        return this.InnerClone(new EntityIds());
    }

    Deserialize(data: IData): void {
        this.ids = data["ids"];
    }

    Serialize(): IData {
        return {
            ids: this.ids
        };
    }

    Add(id: string){
        if(!this.Has(id)){
            this.ids.push(id);
            this.updated.dispatch();
        }
    }

    AddEntity(entity: IEntity) {
        this.Add(entity.GetId());
    }

    Keys(): IdKey[] {
        let keys: IdKey[] = [];
        this.ids.forEach(id => {
            keys.push(new IdKey(id));
        });

        return keys;
    }

    Count(): number {
        return this.ids.length;
    }

    ToString(separator: string = ','): string {
        let ids = '';
        for (let id of this.ids) {
            ids += id + separator;
        }

        return ids.slice(0, -1);
    }

    FromString(idsString: string, separator: string = ','): EntityIds {
        this.ids = [];
        for (let id of idsString.split(separator)) {
            this.ids.push(id);
        }

        return this;
    }

    IsEmpty(): boolean {
        return this.ids.length == 0;
    }

    IsNotEmpty(): boolean {
        return !this.IsEmpty();
    }
}