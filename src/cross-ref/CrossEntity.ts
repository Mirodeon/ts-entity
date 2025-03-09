import {Entity} from "../entity/Entity";
import {IEntity} from "../entity/IEntity";
import {IData} from "@mirodeon/ts-core";
import {ICrossEntity} from "./ICrossEntity";

export abstract class CrossEntity<T extends IEntity, U extends IEntity> extends Entity implements ICrossEntity<T, U> {
    protected primary: T = this.CreatePrimary();
    protected secondary: U = this.CreateSecondary();

    Primary(): T {
        return this.primary;
    }

    SetPrimary(value: T): void {
        this.primary.Update(value);
    }

    Secondary(): U {
        return this.secondary;
    }

    SetSecondary(value: U): void {
        this.secondary.Update(value);
    }

    protected abstract CreatePrimary(): T;

    protected abstract CreateSecondary(): U;

    //<editor-fold desc="Serializable">
    protected InnerBaseDeserialize(data: IData) {
        super.InnerBaseDeserialize(data);
        this.primary.SetId(data["primary"]);
        this.secondary.SetId(data["secondary"]);
    }

    protected InnerBaseSerialize(): IData {
        return {
            ...super.InnerBaseSerialize(),
            primary: this.primary.GetId(),
            secondary: this.secondary.GetId()
        };
    }

    protected InnerDeserialize(data: IData) {
    }

    protected InnerSerialize(): IData {
        return {};
    }

    //</editor-fold>

    //<editor-fold desc="Persistable">
    protected InnerBaseToEntity(data: IData) {
        super.InnerBaseToEntity(data);
        this.primary.SetId(data["primary"]);
        this.secondary.SetId(data["secondary"]);
    }

    protected InnerBaseToPersistable(): IData {
        return {
            ...super.InnerBaseToPersistable(),
            primary: this.primary.GetId(),
            secondary: this.secondary.GetId()
        };
    }

    protected InnerToEntity(data: IData) {
    }

    protected InnerToPersistable(): IData {
        return {};
    }

    //</editor-fold>
}