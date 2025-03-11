import {IEntity} from "../entity/IEntity";

export interface ICrossEntity<T extends IEntity, U extends IEntity> extends IEntity {
    Primary(): T;
    SetPrimary(value: T): void;
    Secondary(): U;
    SetSecondary(value: U): void;
}