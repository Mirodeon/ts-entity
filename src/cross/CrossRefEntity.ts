import {IEntity} from "../entity/IEntity";
import {CrossEntity} from "./CrossEntity";
import {IData} from "@mirodeon/ts-core";

export abstract class CrossRefEntity<T extends IEntity, U extends IEntity> extends CrossEntity<T, U> {

    //<editor-fold desc="Serializable">
    protected PrimaryDeserialize(data: IData): void {
        this.primary.SetId(data["primary"]);
    }

    protected SecondaryDeserialize(data: IData): void {
        this.secondary.SetId(data["secondary"]);
    }

    protected PrimarySerialize(): IData {
        return {primary: this.primary.GetId()};
    }

    protected SecondarySerialize(): IData {
        return {secondary: this.secondary.GetId()};
    }

    //</editor-fold>

    //<editor-fold desc="Persistable">
    protected PrimaryToEntity(data: IData): void {
        this.primary.SetId(data["primary"]);
    }

    protected SecondaryToEntity(data: IData): void {
        this.secondary.SetId(data["secondary"]);
    }

    protected PrimaryToPersistable(): IData {
        return {primary: this.primary.GetId()};
    }

    protected SecondaryToPersistable(): IData {
        return {secondary: this.secondary.GetId()};
    }

    //</editor-fold>

}