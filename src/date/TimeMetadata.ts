import {IData} from "@mirodeon/ts-core";
import {DateEntity} from "./DateEntity";
import {Metadata} from "../metadata/Metadata";

export class TimeMetadata extends Metadata {
    private creation: DateEntity = new DateEntity().Deactivate();
    private modification: DateEntity = new DateEntity().Deactivate();
    private creationKey: string = 'creation';
    private modificationKey: string = 'modification';
    private withCreation: boolean = false;
    private withUpdateCreation: boolean = false;
    private withModification: boolean = false;
    private withUpdateModification: boolean = false;
    private withCreationTime: boolean = false;
    private withModificationTime: boolean = false;
    private withCreationDayIndex: boolean = false;
    private withModificationDayIndex: boolean = false;
    private withCreationWeekIndex: boolean = false;
    private withModificationWeekIndex: boolean = false;
    private withCreationMonthIndex: boolean = false;
    private withModificationMonthIndex: boolean = false;
    private withCreationYearIndex: boolean = false;
    private withModificationYearIndex: boolean = false;

    Creation(): DateEntity {
        return this.creation;
    }

    Modification(): DateEntity {
        return this.modification;
    }

    WithCreationKey(value: string): TimeMetadata {
        this.creationKey = value;
        this.WithCreation();
        return this;
    }

    WithModificationKey(value: string): TimeMetadata {
        this.modificationKey = value;
        this.WithModification();
        return this;
    }

    WithCreation(value: boolean = true): TimeMetadata {
        this.withCreation = value;
        this.withUpdateCreation = value;
        return this;
    }

    WithUpdateCreation(value: boolean = true): TimeMetadata {
        this.withUpdateCreation = value;
        return this;
    }

    WithModification(value: boolean = true): TimeMetadata {
        this.withModification = value;
        this.withUpdateModification = value;
        return this;
    }

    WithUpdateModification(value: boolean = true): TimeMetadata {
        this.withUpdateModification = value;
        return this;
    }

    WithCreationTime(value: boolean = true): TimeMetadata {
        this.withCreationTime = value;
        return this;
    }

    WithModificationTime(value: boolean = true): TimeMetadata {
        this.withModificationTime = value;
        return this;
    }

    WithTime(value: boolean = true): TimeMetadata {
        this.withCreationTime = value;
        this.withModificationTime = value;
        return this;
    }

    WithCreationDayIndex(value: boolean = true): TimeMetadata {
        this.withCreationDayIndex = value;
        return this;
    }

    WithModificationDayIndex(value: boolean = true): TimeMetadata {
        this.withModificationDayIndex = value;
        return this;
    }

    WithDayIndex(value: boolean = true): TimeMetadata {
        this.withCreationDayIndex = value;
        this.withModificationDayIndex = value;
        return this;
    }

    WithCreationWeekIndex(value: boolean = true): TimeMetadata {
        this.withCreationWeekIndex = value;
        return this;
    }

    WithModificationWeekIndex(value: boolean = true): TimeMetadata {
        this.withModificationWeekIndex = value;
        return this;
    }

    WithWeekIndex(value: boolean = true): TimeMetadata {
        this.withCreationWeekIndex = value;
        this.withModificationWeekIndex = value;
        return this;
    }

    WithCreationMonthIndex(value: boolean = true): TimeMetadata {
        this.withCreationMonthIndex = value;
        return this;
    }

    WithModificationMonthIndex(value: boolean = true): TimeMetadata {
        this.withModificationMonthIndex = value;
        return this;
    }

    WithMonthIndex(value: boolean = true): TimeMetadata {
        this.withCreationMonthIndex = value;
        this.withModificationMonthIndex = value;
        return this;
    }

    WithCreationYearIndex(value: boolean = true): TimeMetadata {
        this.withCreationYearIndex = value;
        return this;
    }

    WithModificationYearIndex(value: boolean = true): TimeMetadata {
        this.withModificationYearIndex = value;
        return this;
    }

    WithYearIndex(value: boolean = true): TimeMetadata {
        this.withCreationYearIndex = value;
        this.withModificationYearIndex = value;
        return this;
    }

    WithAllIndex(value: boolean = true): TimeMetadata {
        this.withCreationDayIndex = value;
        this.withModificationDayIndex = value;
        this.withCreationWeekIndex = value;
        this.withModificationWeekIndex = value;
        this.withCreationMonthIndex = value;
        this.withModificationMonthIndex = value;
        this.withCreationYearIndex = value;
        this.withModificationYearIndex = value;
        return this;
    }

    Serialize(): IData {
        const data: IData = {};
        if (this.withCreation) {
            data[this.creationKey] = this.creation.Serialize();
        }
        if (this.withModification) {
            data[this.modificationKey] = this.modification.Serialize();
        }
        return data;
    }

    Deserialize(data: IData): void {
        if (this.withCreation && data.hasOwnProperty(this.creationKey)) {
            this.creation.Deserialize(data[this.creationKey]);
        }
        if (this.withModification && data.hasOwnProperty(this.modificationKey)) {
            this.modification.Deserialize(data[this.modificationKey]);
        }
    }

    ToPersistable(): IData {
        return {
            ...this.CreationToPersistable(),
            ...this.ModificationToPersistable()
        };
    }

    private CreationToPersistable(): IData {
        const data: IData = {};
        if (this.withCreation) {
            if (this.withUpdateCreation) {
                this.creation.UpdateCreation();
            }
            data[this.creationKey] = this.creation.Serialize();

            if (this.withCreationTime) {
                data[this.creationKey + 'Time'] = this.creation.IsActive() ? this.creation.Epoch() : null;
            }

            if (this.withCreationDayIndex) {
                data[this.creationKey + 'DayIndex'] = this.creation.DayIndex();
            }
            if (this.withCreationWeekIndex) {
                data[this.creationKey + 'WeekIndex'] = this.creation.WeekIndex();
            }
            if (this.withCreationMonthIndex) {
                data[this.creationKey + 'MonthIndex'] = this.creation.MonthIndex();
            }
            if (this.withCreationYearIndex) {
                data[this.creationKey + 'YearIndex'] = this.creation.YearIndex();
            }
        }
        return data;
    }

    private ModificationToPersistable(): IData {
        const data: IData = {};
        if (this.withModification) {
            if (this.withUpdateModification) {
                this.modification.UpdateModification();
            }
            data[this.modificationKey] = this.modification.Serialize();

            if (this.withModificationTime) {
                data[this.modificationKey + 'Time'] = this.modification.IsActive() ? this.modification.Epoch() : null;
            }
            if (this.withModificationDayIndex) {
                data[this.modificationKey + 'DayIndex'] = this.modification.DayIndex();
            }
            if (this.withModificationWeekIndex) {
                data[this.modificationKey + 'WeekIndex'] = this.modification.WeekIndex();
            }
            if (this.withModificationMonthIndex) {
                data[this.modificationKey + 'MonthIndex'] = this.modification.MonthIndex();
            }
            if (this.withModificationYearIndex) {
                data[this.modificationKey + 'YearIndex'] = this.modification.YearIndex();
            }
        }
        return data;
    }

    ToEntity(data: IData): void {
        if (this.withCreation && data.hasOwnProperty(this.creationKey)) {
            this.creation.Deserialize(data[this.creationKey]);
        }
        if (this.withModification && data.hasOwnProperty(this.modificationKey)) {
            this.modification.Deserialize(data[this.modificationKey]);
        }
    }
}