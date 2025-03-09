import {IData} from "@mirodeon/ts-core";

export interface IPersistable {
    // @formatter:off
    ToPersistable(): IData;
    ToEntity(data: IData): void;
    // @formatter:on
}