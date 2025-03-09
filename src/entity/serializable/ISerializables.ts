import {ISerializable} from "./ISerializable";

export interface ISerializables<T extends ISerializable> extends ISerializable {
    // @formatter:off
    [Symbol.iterator](): IterableIterator<T>;
    SetValue(items: Array<T>): void;
    Add(item: T): void;
    Insert(item: T, index: number): void;
    AddFirst(item: T): void;
    AddAll(items: ISerializables<T>): void;
    AddAllArray(items: Array<T>): void;
    AddAtIndex(item: T, index: number): void;
    Append(items: ISerializables<T>): void;
    AppendArray(items: Array<T>): void;
    Prepend(Items: ISerializables<T>): void;
    PrependArray(items: Array<T>): void;
    UpdateItem(item: T): boolean;
    Remove(item: T): boolean;
    Count(): number;
    First(): T;
    Last(): T;
    AtIndex(index: number): T;
    Clear(): void;
    IsEmpty(): boolean;
    IsNotEmpty(): boolean;
    All(callback: (value: T, index: number, array: T[]) => unknown): boolean;
    Has(callback: (value: T, index: number, array: T[]) => unknown): boolean;
    Where(callback: (value: T, index: number, array: T[]) => unknown): T[];
    ForEach(callback: (value: T, index: number, array: T[]) => unknown): void;
    Get(callback: (value: T, index: number, array: T[]) => unknown): T;
    Split(nbItems: number): Array<Array<T>>;
    RemoveIndex(index: number): T;
    Value(): Array<T>;
    AllAreNotNull(): boolean;
    Sort(compareFn?: (a: T, b: T) => number): void;
    RemoveWhere(predicate: (value: T, index: number, obj: T[]) => unknown): Array<T>;
    IndexOfWithPredicate(predicate: (value: T, index: number, obj: T[]) => unknown): number;
    // @formatter:on
}