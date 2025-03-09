import {Application} from "./Application";
import {Entities} from "../entity/Entities";
import {IData} from "@mirodeon/ts-core";

export class Applications extends Entities<Applications, Application> {
    constructor() {
        super();
    }

    protected CreateEntities(): Applications {
        return new Applications();
    }

    protected CreateEntity(): Application {
        return new Application();
    }

    ToLazyEntity(data: IData) {
        this.ItemsDeserializer(data, (data, item) => {
            item.ToLazyEntity(data);
        });
    }

    ToLazyPersistable(): IData {
        return this.ItemsSerializer((item) => item.ToLazyPersistable());
    }
}