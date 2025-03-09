import {IPersistable} from "./persistable/IPersistable";
import {ISerializable} from "./serializable/ISerializable";
import {IIdentifiable} from "./identifiable/IIdentifiable";
import {IdKey} from "./identifiable/IdKey";
import {IActivatable} from "./activatable/IActivatable";
import {IDatable} from "./datable/IDatable";


export interface IEntity extends ISerializable, IPersistable, IIdentifiable, IActivatable, IDatable {
    // @formatter:off
    Key(): IdKey;
    HasId(): boolean;
    GetId(): string;
    SetId(value: string): void;
    EnsureId(): void;
    // @formatter:on
}
