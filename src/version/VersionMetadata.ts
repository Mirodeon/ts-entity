import {IData} from "@mirodeon/ts-core";
import {Metadata} from "../metadata/Metadata";

export class VersionMetadata extends Metadata {
    private major: number = 0;
    private minor: number = 0;
    private patch: number = 0;

    Version(): string {
        return `${this.major}.${this.minor}.${this.patch}`;
    }

    MajorVersion(): number {
        return this.major;
    }

    MinorVersion(): number {
        return this.minor;
    }

    PatchVersion(): number {
        return this.patch;
    }

    IncrementMajor(): VersionMetadata {
        this.major++;
        this.minor = 0;
        this.patch = 0;
        return this;
    }

    IncrementMinor(): VersionMetadata {
        this.minor++;
        this.patch = 0;
        return this;
    }

    IncrementPatch(): VersionMetadata {
        this.patch++;
        return this;
    }

    IsDeprecated(other: VersionMetadata, option?: { minor?: boolean, patch?: boolean }): boolean {
        let result: boolean;
        option = this.NormalizeOption(option);
        result = this.major > other.major;
        if (option.minor && !result) {
            result = this.minor > other.minor;
        }
        if (option.patch && !result) {
            result = this.patch > other.patch;
        }
        return result;
    }

    IsLatest(other: VersionMetadata, option?: { minor?: boolean, patch?: boolean }): boolean {
        let result: boolean;
        option = this.NormalizeOption(option);
        result = this.major == other.major;
        if (option.minor && result) {
            result = this.minor == other.minor;
        }
        if (option.patch && result) {
            result = this.patch == other.patch;
        }
        return result;
    }

    IsNewer(other: VersionMetadata, option?: { minor?: boolean, patch?: boolean }): boolean {
        let result: boolean;
        option = this.NormalizeOption(option);
        result = this.major < other.major;
        if (option.minor && result) {
            result = this.minor < other.minor;
        }
        if (option.patch && result) {
            result = this.patch < other.patch;
        }
        return result;
    }

    private NormalizeOption(option?: { minor?: boolean, patch?: boolean }): { minor: boolean, patch: boolean } {
        const normalized = {minor: true, patch: true};
        if (option != null) {
            normalized.minor = option.minor ?? true;
            normalized.patch = option.patch ?? true;
        }
        return normalized;
    }


    private ParseVersion(version: string): void {
        const parts = version.split('.');
        if (parts.length != 3) {
            throw new Error('Invalid version format');
        }
        this.major = parseInt(parts[0]);
        this.minor = parseInt(parts[1]);
        this.patch = parseInt(parts[2]);
    }

    Serialize(): IData {
        return {
            version: this.Version()
        };
    }

    Deserialize(data: IData): void {
        if (data.hasOwnProperty('version')) {
            this.ParseVersion(data['version']);
        }
    }

    ToPersistable(): IData {
        return {
            version: this.Version()
        };
    }

    ToEntity(data: IData): void {
        if (data.hasOwnProperty('version')) {
            this.ParseVersion(data['version']);
        }
    }
}