import {VersionMetadata} from "./VersionMetadata";

export interface IVersionable {
    VersionMetadata(): VersionMetadata
}