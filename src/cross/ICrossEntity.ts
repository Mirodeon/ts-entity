import {IEntity} from "../entity/IEntity";

export interface ICrossEntity<T extends IEntity, U extends IEntity> extends IEntity {
    Primary(): T;
    SetPrimary(value: T): void;
    UpdatePrimary(value: T): boolean;
    Secondary(): U;
    SetSecondary(value: U): void;
    UpdateSecondary(value: U): boolean;
}