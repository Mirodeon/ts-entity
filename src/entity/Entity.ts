import {Serializable} from "./serializable/Serializable";
import {IEntity} from "./IEntity";
import {IdKey} from "./identifiable/IdKey";
import {IData} from "@mirodeon/ts-core";
import {TimeMetadata} from "./datable/TimeMetadata";


export abstract class Entity extends Serializable implements IEntity {
    protected key: IdKey = new IdKey();
    protected activated: boolean = true;
    protected timeMetadata: TimeMetadata = new TimeMetadata().WithCreation().WithModification();

    //<editor-fold desc="Identifiable">
    Key(): IdKey {
        return this.key;
    }

    HasId(): boolean {
        return this.Key().HasId();
    }

    GetId(): string {
        return this.HasId() ? this.Key().GetId() : null;
    }

    SetId(value: string): void {
        this.Key().SetId(value);
    }

    EnsureId(): void {
        if (!this.HasId()) {
            this.Key().GenerateId();
        }
    }

    //</editor-fold>

    //<editor-fold desc="Activatable">
    Activate(): void {
        this.activated = true;
    }

    Deactivate(): void {
        this.activated = false;
    }

    IsActive(): boolean {
        return this.activated;
    }

    IsInactive(): boolean {
        return !this.activated;
    }

    SetActive(active: boolean): void {
        this.activated = active;
    }

    //</editor-fold>

    //<editor-fold desc="Serializable">
    Deserialize(data: IData): void {
        this.InnerBaseDeserialize(data);
        this.InnerDeserialize(data);
    }

    protected InnerBaseDeserialize(data: IData): void {
        this.SetId(data['id']);
        this.SetActive(data['activated']);
        this.timeMetadata.Deserialize(data);
    }

    Serialize(): IData {
        return {
            ...this.InnerBaseSerialize(),
            ...this.InnerSerialize()
        };
    }

    protected InnerBaseSerialize(): IData {
        return {
            id: this.GetId(),
            activated: this.IsActive(),
            ...this.timeMetadata.Serialize()
        };
    }

    protected abstract InnerDeserialize(data: IData): void;

    protected abstract InnerSerialize(): IData;

    //</editor-fold>

    //<editor-fold desc="Persistable">
    TimeMetadata(): TimeMetadata {
        return this.timeMetadata;
    }

    ToEntity(data: IData): void {
        this.InnerBaseToEntity(data);
        this.InnerToEntity(data);
    }

    protected InnerBaseToEntity(data: IData): void {
        this.SetId(data['id']);
        this.SetActive(data['activated']);
        this.timeMetadata.ToEntity(data);
    }

    ToPersistable(): IData {
        return {
            ...this.InnerBaseToPersistable(),
            ...this.InnerToPersistable()
        };
    }

    protected InnerBaseToPersistable(): IData {
        return {
            id: this.GetId(),
            activated: this.IsActive(),
            ...this.timeMetadata.ToPersistable()
        };
    }

    protected abstract InnerToEntity(data: IData): void;

    protected abstract InnerToPersistable(): IData;

    //</editor-fold>
}