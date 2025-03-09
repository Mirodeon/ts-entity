import {IData} from "@mirodeon/ts-core";
import {DateEntity} from "../../date/DateEntity";
import {Metadata} from "../../metadata/Metadata";

export class TimeMetadata extends Metadata {
    private creation: DateEntity = new DateEntity().Deactivate();
    private modification: DateEntity = new DateEntity().Deactivate();
    private withCreation: boolean = false;
    private withModification: boolean = false;
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

    WithCreation(value: boolean = true): TimeMetadata {
        this.withCreation = value;
        return this;
    }

    WithModification(value: boolean = true): TimeMetadata {
        this.withModification = value;
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
            data['creation'] = this.creation.Serialize();
        }
        if (this.withModification) {
            data['modification'] = this.modification.Serialize();
        }
        return data;
    }

    Deserialize(data: IData): void {
        if (this.withCreation && data.hasOwnProperty('creation')) {
            this.creation.Deserialize(data['creation']);
        }
        if (this.withModification && data.hasOwnProperty('modification')) {
            this.modification.Deserialize(data['modification']);
        }
    }

    ToPersistable(): IData {
        const data: IData = {};
        if (this.withCreation) {
            data['creation'] = this.creation.UpdateCreation().Serialize();
        }
        if (this.withModification) {
            data['modification'] = this.modification.UpdateModification().Serialize();
        }
        if (this.withCreationDayIndex) {
            data['creationDayIndex'] = this.creation.DayIndex();
        }
        if (this.withModificationDayIndex) {
            data['modificationDayIndex'] = this.modification.DayIndex();
        }
        if (this.withCreationWeekIndex) {
            data['creationWeekIndex'] = this.creation.WeekIndex();
        }
        if (this.withModificationWeekIndex) {
            data['modificationWeekIndex'] = this.modification.WeekIndex();
        }
        if (this.withCreationMonthIndex) {
            data['creationMonthIndex'] = this.creation.MonthIndex();
        }
        if (this.withModificationMonthIndex) {
            data['modificationMonthIndex'] = this.modification.MonthIndex();
        }
        if (this.withCreationYearIndex) {
            data['creationYearIndex'] = this.creation.YearIndex();
        }
        if (this.withModificationYearIndex) {
            data['modificationYearIndex'] = this.modification.YearIndex();
        }
        return data;
    }

    ToEntity(data: IData): void {
        if (this.withCreation && data.hasOwnProperty('creation')) {
            this.creation.Deserialize(data['creation']);
        }
        if (this.withModification && data.hasOwnProperty('modification')) {
            this.modification.Deserialize(data['modification']);
        }
    }
}