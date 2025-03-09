import {Serializables} from "./serializable/Serializables";
import {IEntity} from "./IEntity";
import {IEntities} from "./IEntities";
import {EntityIds} from "./identifiable/EntityIds";
import {IData} from "@mirodeon/ts-core";
import {TimeMetadata} from "./datable/TimeMetadata";

export abstract class Entities<T extends IEntities<T, U>, U extends IEntity> extends Serializables<U> implements IEntities<T, U> {
    protected timeMetadata: TimeMetadata = new TimeMetadata();

    //<editor-fold desc="Entities">
    Ids(): EntityIds {
        let ids = new EntityIds();
        for (let item of this.items) {
            ids.Add(item.GetId());
        }
        return ids;
    }

    AddOrUpdate(item: U): U {
        if (this.Contains(item)) {
            let existingItem = this.WithId(item.GetId());
            existingItem.Update(item);
            return existingItem;
        } else {
            this.Add(item);
            return item;
        }
    }

    AddOrUpdateAll(items: IEntities<T, U>): void {
        for (let item of items.Value()) {
            this.AddOrUpdate(item);
        }
    }

    AddAll(items: IEntities<T, U>): void {
        for (let item of items.Value()) {
            if (!item.HasId() || !this.HasId(item.GetId())) {
                this.Add(item);
            }
        }
    }

    GetOrAdd(item: U): U {
        if (this.Contains(item)) {
            return this.WithId(item.GetId());
        } else {
            this.Add(item);
            return item;
        }
    }

    Update(item: U): boolean {
        this.items.splice(this.items.findIndex((entity) => entity.Key().ToString() == item.Key().ToString()), 1);
        this.items.push(item);
        this.SubscribeToItem(item);
        this.updated.dispatch();
        return true;
    }

    UpdateAll(items: T): void {
        items.ForEach(updatedItem => {
            this.Get(item => item.Key().ToString() == updatedItem.Key().ToString()).Update(updatedItem);
        });
    }

    Remove(item: U): boolean {
        if (this.Contains(item)) {
            this.UnsubscribeToItem(item);
            this.items.splice(this.IndexOf(item), 1);
            this.updated.dispatch();
            return true;
        } else {
            return super.Remove(item); //Remove by reference
        }
    }

    RemoveById(id: string): boolean {
        if (this.HasId(id)) {
            return this.Remove(this.WithId(id));
        }
        return false
    }

    RemoveAll(items: T): boolean {
        let updated = false;
        items.ForEach(item => {
            if (this.Contains(item)) {
                this.items.splice(this.IndexOf(item), 1);
                updated = true;
            }
        });

        if (updated) {
            this.updated.dispatch();
        }
        return updated;
    }

    RemoveAllByIds(ids: string[]): boolean {
        const entities = this.CreateEntities();
        ids.forEach(id => {
            if (this.HasId(id)) {
                entities.Add(this.WithId(id));
            }
        });

        if (entities.IsNotEmpty()) {
            return this.RemoveAll(entities);
        }
        return false;
    }

    Contains(entity: U): boolean {
        if (!entity.HasId()) {
            return false;
        }
        return this.Has(item => item.Key().ToString() == entity.Key().ToString());
    }

    CountOccurrence(entity: U): number {
        let count = 0;
        this.items.forEach(item => {
            if (item.GetId() == entity.GetId()) {
                count++;
            }
        })
        return count;
    }

    FirstOrDefault(entity: U): U {
        let result = this.items.filter(item => item.Key().ToString() == entity.Key().ToString());
        if (result.length == 0) {
            return this.CreateEntity();
        } else {
            return result[0];
        }
    }

    IndexOf(entity: U): number {
        for (let i = 0; i < this.items.length; ++i) {
            if (this.items[i].Key().ToString() == entity.Key().ToString()) {
                return i;
            }
        }
        return -1;
    }

    HasId(id: string): boolean {
        return this.items.some(item => item.HasId() && item.GetId() == id);
    }

    WithId(id: string): U {
        if (!this.HasId(id)) {
            return null;
        }
        return this.items.find(item => item.HasId() && item.GetId() == id);
    }

    protected abstract CreateEntities(): T;

    //</editor-fold>

    //<editor-fold desc="Serializable">
    Deserialize(data: IData): void {
        this.InnerBaseDeserialize(data);
        this.InnerDeserialize(data);
    }

    protected InnerBaseDeserialize(data: IData): void {
        this.timeMetadata.Deserialize(data);
    }

    Serialize(): IData {
        return {
            ...this.InnerBaseSerialize(),
            ...this.InnerSerialize()
        }
    }

    protected InnerBaseSerialize(): IData {
        return this.timeMetadata.Serialize();
    }

    Clone(): T {
        return this.InnerClone(this.CreateEntities());
    }

    //</editor-fold>

    //<editor-fold desc="Persistable">
    TimeMetadata(): TimeMetadata {
        return this.timeMetadata;
    }

    ToEntity(data: IData): void {
        this.InnerBaseToEntity(data);
        this.InnerToEntity(data);
    }

    protected InnerToEntity(data: IData): void {
        this.ItemsDeserializer(data, (data, item) => item.ToEntity(data));
    }

    protected InnerBaseToEntity(data: IData): void {
        this.timeMetadata.ToEntity(data);
    }

    ToPersistable(): IData {
        return {
            ...this.InnerBaseToPersistable(),
            ...this.InnerToPersistable()
        }
    }

    protected InnerToPersistable(): IData {
        return this.ItemsSerializer(item => item.ToPersistable());
    }

    protected InnerBaseToPersistable(): IData {
        return this.timeMetadata.ToPersistable();
    }

    //</editor-fold>
}