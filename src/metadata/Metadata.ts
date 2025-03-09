import {IMetadata} from "./IMetadata";
import {IData} from "@mirodeon/ts-core";
import {Serializable} from "../entity/serializable/Serializable";

export abstract class Metadata extends Serializable implements IMetadata {
    Clone(): IMetadata {
        throw new Error("Method not implemented.");
    }

    Update(other: IMetadata): boolean {
        throw new Error("Method not implemented.");
    }

    abstract ToEntity(data: IData): void;

    abstract ToPersistable(): IData;
}