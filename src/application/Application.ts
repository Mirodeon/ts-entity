import {Entity} from "../entity/Entity";
import {IData} from "@mirodeon/ts-core";
import {IVersionable} from "../version/IVersionable";
import {VersionMetadata} from "../version/VersionMetadata";

export class Application extends Entity implements IVersionable {
    name: string;
    live: boolean;
    protected versionMetadata: VersionMetadata = new VersionMetadata();

    VersionMetadata(): VersionMetadata {
        return this.versionMetadata;
    }

    protected InnerDeserialize(data: IData): void {
        this.name = data['name'];
        this.live = data['live'];
        this.versionMetadata.Deserialize(data);
    }

    protected InnerSerialize(): IData {
        return {
            name: this.name,
            live: this.live,
            ...this.versionMetadata.Serialize()
        };
    }

    protected InnerToEntity(data: IData): void {
        this.name = data['name'];
        this.live = data['live'];
        this.versionMetadata.ToEntity(data);
    }

    protected InnerToPersistable(): IData {
        return {
            name: this.name,
            live: this.live,
            ...this.versionMetadata.ToPersistable()
        };
    }

    ToLazyEntity(data: IData): void {
        this.SetId(data['id']);
    }

    ToLazyPersistable(): IData {
        return {
            id: this.GetId()
        };
    }

    Clone(): Application {
        return this.InnerClone(new Application());
    }
}