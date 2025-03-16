import {Entity} from "../entity/Entity";
import {IEntity} from "../entity/IEntity";
import {IData} from "@mirodeon/ts-core";
import {ICrossEntity} from "./ICrossEntity";

export abstract class CrossEntity<T extends IEntity, U extends IEntity> extends Entity implements ICrossEntity<T, U> {
    protected primary: T = this.CreatePrimary();
    protected secondary: U = this.CreateSecondary();

    //<editor-fold desc="CrossEntity">
    Primary(): T {
        return this.primary;
    }

    SetPrimary(value: T): void {
        this.primary = value;
    }

    UpdatePrimary(value: T): boolean {
        return this.primary.Update(value);
    }

    Secondary(): U {
        return this.secondary;
    }

    SetSecondary(value: U): void {
        this.secondary = value;
    }

    UpdateSecondary(value: U): boolean {
        return this.secondary.Update(value);
    }

    protected abstract CreatePrimary(): T;

    protected abstract CreateSecondary(): U;

    //</editor-fold>

    //<editor-fold desc="Serializable">
    protected InnerBaseDeserialize(data: IData): void {
        super.InnerBaseDeserialize(data);
        this.PrimaryDeserialize(data);
        this.SecondaryDeserialize(data);
    }

    protected PrimaryDeserialize(data: IData): void {
        this.primary.Deserialize(data["primary"]);
    }

    protected SecondaryDeserialize(data: IData): void {
        this.secondary.Deserialize(data["secondary"]);
    }

    protected InnerBaseSerialize(): IData {
        return {
            ...super.InnerBaseSerialize(),
            ...this.PrimarySerialize(),
            ...this.SecondarySerialize()
        };
    }

    protected PrimarySerialize(): IData {
        return {primary: this.primary.Serialize()};
    }

    protected SecondarySerialize(): IData {
        return {secondary: this.secondary.Serialize()};
    }

    protected InnerDeserialize(data: IData) {
    }

    protected InnerSerialize(): IData {
        return {};
    }

    //</editor-fold>

    //<editor-fold desc="Persistable">
    protected InnerBaseToEntity(data: IData): void {
        super.InnerBaseToEntity(data);
        this.PrimaryToEntity(data);
        this.SecondaryToEntity(data);
    }

    protected PrimaryToEntity(data: IData): void {
        this.primary.ToEntity(data["primary"]);
    }

    protected SecondaryToEntity(data: IData): void {
        this.secondary.ToEntity(data["secondary"]);
    }

    protected InnerBaseToPersistable(): IData {
        return {
            ...super.InnerBaseToPersistable(),
            ...this.PrimaryToPersistable,
            ...this.SecondaryToPersistable()
        };
    }

    protected PrimaryToPersistable(): IData {
        return {primary: this.primary.ToPersistable()};
    }

    protected SecondaryToPersistable(): IData {
        return {secondary: this.secondary.ToPersistable()};
    }

    protected InnerToEntity(data: IData): void {
    }

    protected InnerToPersistable(): IData {
        return {};
    }

    //</editor-fold>
}