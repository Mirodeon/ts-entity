import {ISerializable} from "./ISerializable";
import {ISerializables} from "./ISerializables";
import {IData, TypeHelper, ValidationResult, ValidResult} from "@mirodeon/ts-core";
import {Serializable} from "./Serializable";

export abstract class Serializables<U extends ISerializable> extends Serializable implements ISerializables<U> {
    protected items: Array<U>;
    protected itemsKey: string = 'items';

    constructor(items: Array<U> = []) {
        super();
        this.items = items;
        this.SubscribeToItems(items);
    }

    [Symbol.iterator](): IterableIterator<U> {
        return this.items[Symbol.iterator]();
    }

    protected WithItemsKey(key: string): Serializables<U> {
        this.itemsKey = key;
        return this;
    }

    SetValue(items: Array<U>): void {
        this.items = items;
        this.SubscribeToItems(items);
        this.updated.dispatch();
    }

    IsEqual(other: Serializables<U>): boolean {
        if (!TypeHelper.Is(other, Serializables<U>)) {
            return false;
        }

        if (this.Count() != other.Count()) {
            return false;
        }

        for (let i = 0; i < this.Count(); i++) {
            if (!this.items[i].IsEqual(other.items[i])) {
                return false;
            }
        }

        return true;
    }

    Serialize(): IData {
        return this.InnerSerialize();
    }

    protected InnerSerialize(): IData {
        return this.ItemsSerializer(item => item.Serialize());
    }

    protected ItemsSerializer(serialize: (item: U) => IData): IData {
        let serializedItems: IData[] = [];
        this.items.forEach(item => {
            serializedItems.push(serialize(item));
        });
        const data: IData = {};
        data[this.itemsKey] = serializedItems;
        return data;
    }

    Deserialize(data: IData): void {
        this.InnerDeserialize(data);
    }

    protected InnerDeserialize(data: IData) {
        this.ItemsDeserializer(data, (data, item) => item.Deserialize(data));
    }

    protected ItemsDeserializer(data: IData, deserialize: (data: IData, item: U) => void): void {
        this.items = [];
        if (data != null && data.hasOwnProperty(this.itemsKey)) {
            for (let serializedItem of data[this.itemsKey]) {
                let item: U = this.CreateEntity();
                deserialize(serializedItem, item);
                this.SubscribeToItem(item);
                this.items.push(item);
            }
        }
        this.updated.dispatch();
    }

    Add(item: U): void {
        this.SubscribeToItem(item);
        this.items.push(item);
        this.updated.dispatch();
    }

    Insert(item: U, index: number): void {
        this.SubscribeToItem(item);
        if (index <= this.items.length) {
            this.items.splice(index, 0, item);
        } else {
            this.items.push(item);
        }
        this.updated.dispatch();
    }

    AddFirst(item: U): void {
        this.SubscribeToItem(item);
        this.items.unshift(item);
        this.updated.dispatch();
    }

    AddAll(items: ISerializables<U>): void {
        this.AddAllArray(items.Value());
    }

    AddAllArray(items: Array<U>): void {
        this.SubscribeToItems(items);
        items.forEach(item => {
            this.items.push(item);
        });
        this.updated.dispatch();
    }

    AddAtIndex(item: U, index: number): void {
        this.SubscribeToItem(item);
        this.items.splice(index, 0, item);
    }

    Append(items: ISerializables<U>): void {
        this.AppendArray(items.Value());
    }

    AppendArray(items: Array<U>): void {
        this.SubscribeToItems(items);
        this.items = this.items.concat(items);
        this.updated.dispatch();
    }

    Prepend(items: ISerializables<U>): void {
        this.PrependArray(items.Value());
    }

    PrependArray(items: Array<U>): void {
        this.SubscribeToItems(items);
        this.items = items.concat(this.items);
        this.updated.dispatch();
    }

    UpdateItem(item: U): boolean {
        this.items.splice(this.items.indexOf(item), 1);
        this.items.push(item);
        this.SubscribeToItem(item);
        this.updated.dispatch();
        return true;
    }

    Remove(item: U): boolean {
        let index = this.items.indexOf(item);
        if (index != -1) {
            this.UnsubscribeToItem(item);
            this.items.splice(index, 1);
            this.updated.dispatch();
            return true;
        }
        return false;
    }

    Count(): number {
        return this.items.length;
    }

    First(): U {
        return this.items[0];
    }

    Last(): U {
        return this.items[this.items.length - 1];
    }

    AtIndex(index: number): U {
        return this.items[index];
    }

    Clear(): void {
        this.items = [];
        this.updated.dispatch();
    }

    IsEmpty(): boolean {
        return this.Count() == 0;
    }

    IsNotEmpty(): boolean {
        return this.Count() > 0;
    }

    All(callback: (value: U, index: number, array: U[]) => unknown): boolean {
        return this.items.every(callback);
    }

    Has(callback: (value: U, index: number, array: U[]) => unknown): boolean {
        return this.items.some(callback);
    }

    Where(callback: (value: U, index: number, array: U[]) => unknown): U[] {
        return this.items.filter(callback);
    }

    ForEach(callback: (value: U, index: number, array: U[]) => unknown): void {
        this.items.forEach(callback);
    }

    Get(callback: (value: U, index: number, array: U[]) => unknown): U {
        if (this.items.findIndex(callback) != -1) {
            return this.items.find(callback);
        }
        return null;
    }

    Split(nbItems: number): Array<Array<U>> {
        let result: U[][] = [];
        let currentGroup: U[] = [];

        this.items.forEach((item, index) => {
            currentGroup.push(item);
            if (nbItems == 1 || (index > 0 && (index + 1) % nbItems == 0)) {
                result.push(currentGroup);
                currentGroup = [];
            }
        });

        if (currentGroup.length > 0) {
            result.push(currentGroup);
        }

        return result;
    }

    RemoveIndex(index: number): U {
        let item = this.items[index];
        this.UnsubscribeToItem(item);
        this.items.splice(index, 1);
        return item;
    }

    Value(): Array<U> {
        return this.items;
    }

    IsValid(): ValidationResult {
        for (let item of this.items) {
            let isValid = item.IsValid();
            if (!isValid.result) {
                return isValid;
            }
        }

        return new ValidResult();
    }

    AllAreNotNull(): boolean {
        return this.All(item => item != null);
    }

    Sort(compareFn?: (a: U, b: U) => number): void {
        this.items.sort(compareFn);
    }

    RemoveWhere(predicate: (value: U, index: number, obj: U[]) => unknown): U[] {
        let result: U[] = [];
        let index: number = -1;
        do {
            index = this.IndexOfWithPredicate(predicate);
            if (index != -1) {
                result.push(this.RemoveIndex(index));
            }
        } while (index != -1);

        return result;
    }

    IndexOfWithPredicate(predicate: (value: U, index: number, obj: U[]) => unknown): number {
        return this.items.findIndex(predicate);
    }

    protected SubscribeToItems(items: Array<U>): void {
        for (let item of items) {
            this.SubscribeToItem(item);
        }
    }

    protected SubscribeToItem(item: U): void {
        item.Updated().subscribe(() => this.updated.dispatch());
    }

    protected UnsubscribeToItem(item: U): void {
        item.Updated().unsubscribe(this.updated.dispatch);
    }

    protected abstract CreateEntity(): U;
}
