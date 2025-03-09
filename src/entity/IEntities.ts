import {ISerializables} from "./serializable/ISerializables";
import {IEntity} from "./IEntity";
import {IPersistable} from "./persistable/IPersistable";
import {EntityIds} from "./identifiable/EntityIds";
import {IDatable} from "./datable/IDatable";


export interface IEntities<T extends ISerializables<U>, U extends IEntity> extends ISerializables<U>, IPersistable, IDatable {
    Ids(): EntityIds;
    AddOrUpdate(item: U): U;
    AddOrUpdateAll(items: ISerializables<U>): void;
    AddAll(items: ISerializables<U>): void;
    GetOrAdd(item: U): U;
    UpdateAll(items: T): void;
    RemoveById(id: string): boolean;
    RemoveAll(items: T): boolean;
    RemoveAllByIds(ids: string[]): boolean;
    Contains(entity: U): boolean;
    CountOccurrence(entity: U): number;
    FirstOrDefault(entity: U): U;
    IndexOf(entity: U): number;
    HasId(id: string): boolean;
    WithId(id: string): U;
}