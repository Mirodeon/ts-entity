import {Serializable} from "../entity/serializable/Serializable";
import {IData} from "@mirodeon/ts-core";

export class UserAccess extends Serializable {
    token: string;
    refreshToken: string;

    Serialize(): IData {
        return {
            token: this.token,
            refreshToken: this.refreshToken,
        };
    }

    Deserialize(data: IData): void {
        this.token = data["token"];
        this.refreshToken = data["refreshToken"];
    }

    Clone(): UserAccess {
        return this.InnerClone(new UserAccess());
    }
}