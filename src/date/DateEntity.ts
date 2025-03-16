import {Serializable} from "../entity/serializable/Serializable";
import {IData} from "@mirodeon/ts-core";
import {IActivatable} from "../entity/activatable/IActivatable";

export class DateEntity extends Serializable implements IActivatable {
    private readonly date: Date = new Date();
    private activated: boolean = false;

    constructor(date?: Date) {
        super();
        this.date = date ?? new Date();
    }

    Value(): Date {
        return this.date;
    }

    //<editor-fold desc="Entity">
    Deserialize(data: IData): void {
        this.date.setTime(data['time']);
        this.activated = data['activated'];
    }

    Serialize(): IData {
        return {
            time: this.date.getTime(),
            activated: this.activated
        };
    }

    Clone(): DateEntity {
        return this.InnerClone(new DateEntity());
    }

    UpdateCreation(): DateEntity {
        if (this.IsInactive()) {
            this.Activate().SetNow()
        }
        return this;
    }

    UpdateModification(): DateEntity {
        return this.Activate().SetNow()
    }

    //</editor-fold>

    //<editor-fold desc="Activatable">
    Activate(date?: DateEntity): DateEntity {
        if (date != null) {
            this.date.setTime(date.Epoch());
        }
        this.activated = true;
        return this;
    }

    Deactivate(): DateEntity {
        this.activated = false;
        return this;
    }

    IsActive(): boolean {
        return this.activated;
    }

    IsInactive(): boolean {
        return !this.activated;
    }

    SetActive(active: boolean): DateEntity {
        this.activated = active;
        return this;
    }

    ToggleActive(): void {
        this.activated = !this.activated;
    }

    //</editor-fold>

    //<editor-fold desc="Index">
    YearIndex(): string {
        return new Date(this.date.getUTCFullYear(), 0).toISOString();
    }

    MonthIndex(): string {
        return new Date(this.date.getUTCFullYear(), this.date.getUTCMonth(), 1).toISOString();
    }

    WeekIndex(): string {
        const clone = this.Clone();
        const diff = clone.UTCDayOfMonth() - clone.UTCDayOfWeek() + (clone.UTCDayOfWeek() === 0 ? -6 : 1);
        return clone.SetUTCDayOfMonth(diff).ResetUTCHours().Value().toISOString();
    }

    DayIndex(): string {
        return this.Clone().ResetUTCHours().Value().toISOString();
    }

    //</editor-fold>

    //<editor-fold desc="Epoch">
    Epoch(): number {
        return this.date.getTime();
    }

    UnixEpoch(): number {
        return Math.round(this.date.getTime() / 1000);
    }

    EpochSeconds(): number {
        return this.date.getTime() / 1000;
    }

    EpochMinutes(): number {
        return this.date.getTime() / 60000;
    }

    EpochHours(): number {
        return this.date.getTime() / 3600000
    }

    EpochDays(): number {
        return this.date.getTime() / 86400000;
    }

    //</editor-fold>

    //<editor-fold desc="Get value">
    //<editor-fold desc="Locale">
    Milliseconds(): number {
        return this.date.getMilliseconds();
    }

    Seconds(): number {
        return this.date.getSeconds();
    }

    Minutes(): number {
        return this.date.getMinutes();
    }


    Hours(): number {
        return this.date.getHours();
    }

    DayOfMonth(): number {
        return this.date.getDate();
    }

    DayOfWeek(): number {
        return this.date.getDay();
    }

    Month(): number {
        return this.date.getMonth();
    }

    Year(): number {
        return this.date.getFullYear();
    }

    //</editor-fold>

    //<editor-fold desc="UTC">
    UTCMilliseconds(): number {
        return this.date.getUTCMilliseconds();
    }

    UTCSeconds(): number {
        return this.date.getUTCSeconds();
    }

    UTCMinutes(): number {
        return this.date.getUTCMinutes();
    }

    UTCHours(): number {
        return this.date.getUTCHours();
    }

    UTCDayOfMonth(): number {
        return this.date.getUTCDate();
    }

    UTCDayOfWeek(): number {
        return this.date.getUTCDay();
    }

    UTCMonth(): number {
        return this.date.getUTCMonth();
    }

    UTCYear(): number {
        return this.date.getUTCFullYear();
    }

    //</editor-fold>
    //</editor-fold>

    //<editor-fold desc="Set value">
    //<editor-fold desc="Locale">
    SetMilliseconds(milliseconds: number): DateEntity {
        this.date.setMilliseconds(milliseconds);
        return this;
    }

    SetSeconds(second: number): DateEntity {
        this.date.setSeconds(second);
        return this;
    }

    SetMinutes(minutes: number): DateEntity {
        this.date.setMinutes(minutes);
        return this;
    }

    SetHours(hours: number): DateEntity {
        this.date.setHours(hours);
        return this;
    }

    SetDayOfMonth(day: number): DateEntity {
        this.date.setDate(day);
        return this;
    }

    SetMonth(month: number): DateEntity {
        this.date.setMonth(month);
        return this;
    }

    SetYear(year: number): DateEntity {
        this.date.setFullYear(year);
        return this;
    }

    //</editor-fold>

    //<editor-fold desc="UTC">
    SetTime(time: number): DateEntity {
        this.date.setTime(time);
        return this;
    }

    SetUTCMilliseconds(milliseconds: number): DateEntity {
        this.date.setUTCMilliseconds(milliseconds);
        return this;
    }

    SetUTCSeconds(second: number): DateEntity {
        this.date.setUTCSeconds(second);
        return this;
    }

    SetUTCMinutes(minutes: number): DateEntity {
        this.date.setUTCMinutes(minutes);
        return this;
    }

    SetUTCHours(hours: number): DateEntity {
        this.date.setUTCHours(hours);
        return this;
    }

    SetUTCDayOfMonth(day: number): DateEntity {
        this.date.setUTCDate(day);
        return this;
    }

    SetUTCMonth(month: number): DateEntity {
        this.date.setUTCMonth(month);
        return this;
    }

    SetUTCYear(year: number): DateEntity {
        this.date.setUTCFullYear(year);
        return this;
    }

    //</editor-fold>
    //</editor-fold>

    //<editor-fold desc="Add/Subtract">
    //<editor-fold desc="Locale">
    AddMilliseconds(milliseconds: number): DateEntity {
        this.date.setMilliseconds(this.date.getMilliseconds() + milliseconds);
        return this;
    }

    SubtractMilliseconds(milliseconds: number): DateEntity {
        this.date.setMilliseconds(this.date.getMilliseconds() - milliseconds);
        return this;
    }

    AddSeconds(seconds: number): DateEntity {
        this.date.setSeconds(this.date.getSeconds() + seconds);
        return this;
    }

    SubtractSeconds(seconds: number): DateEntity {
        this.date.setSeconds(this.date.getSeconds() - seconds);
        return this;
    }

    AddMinutes(minutes: number): DateEntity {
        this.date.setMinutes(this.date.getMinutes() + minutes);
        return this;
    }

    SubtractMinutes(minutes: number): DateEntity {
        this.date.setMinutes(this.date.getMinutes() - minutes);
        return this;
    }

    AddHours(hours: number): DateEntity {
        this.date.setHours(this.date.getHours() + hours);
        return this;
    }

    SubtractHours(hours: number): DateEntity {
        this.date.setHours(this.date.getHours() - hours);
        return this;
    }

    AddDay(day: number): DateEntity {
        this.date.setDate(this.date.getDate() + day);
        return this;
    }

    SubtractDay(day: number): DateEntity {
        this.date.setDate(this.date.getDate() - day);
        return this;
    }

    AddWeek(week: number): DateEntity {
        this.AddDay(7 * week);
        return this;
    }

    SubtractWeek(week: number): DateEntity {
        this.SubtractDay(7 * week);
        return this;
    }

    AddMonth(month: number): DateEntity {
        let currentDate = this.DayOfMonth()

        this.SetDayOfMonth(1);
        this.date.setMonth(this.Month() + month);

        let daysInMonth = new Date(this.Year(), this.Month() + 1, 0).getDate();

        this.date.setDate(Math.min(currentDate, daysInMonth));
        return this;
    }

    SubtractMonth(month: number): DateEntity {
        this.AddMonth(-month);
        return this;
    }

    AddYear(year: number): DateEntity {
        this.date.setFullYear(this.date.getFullYear() + year);
        return this;
    }

    SubtractYear(year: number): DateEntity {
        this.date.setFullYear(this.date.getFullYear() - year);
        return this;
    }

    //</editor-fold>

    //<editor-fold desc="UTC">
    AddTime(time: number): DateEntity {
        this.date.setTime(this.date.getTime() + time);
        return this;
    }

    SubtractTime(time: number): DateEntity {
        this.date.setTime(this.date.getTime() - time);
        return this;
    }

    AddUTCMilliseconds(milliseconds: number): DateEntity {
        this.date.setUTCMilliseconds(this.date.getUTCMilliseconds() + milliseconds);
        return this;
    }

    SubtractUTCMilliseconds(milliseconds: number): DateEntity {
        this.date.setUTCMilliseconds(this.date.getUTCMilliseconds() - milliseconds);
        return this;
    }

    AddUTCSeconds(seconds: number): DateEntity {
        this.date.setUTCSeconds(this.date.getUTCSeconds() + seconds);
        return this;
    }

    SubtractUTCSeconds(seconds: number): DateEntity {
        this.date.setUTCSeconds(this.date.getUTCSeconds() - seconds);
        return this;
    }

    AddUTCMinutes(minutes: number): DateEntity {
        this.date.setUTCMinutes(this.date.getUTCMinutes() + minutes);
        return this;
    }

    SubtractUTCMinutes(minutes: number): DateEntity {
        this.date.setUTCMinutes(this.date.getUTCMinutes() - minutes);
        return this;
    }

    AddUTCHours(hours: number): DateEntity {
        this.date.setUTCHours(this.date.getUTCHours() + hours);
        return this;
    }

    SubtractUTCHours(hours: number): DateEntity {
        this.date.setUTCHours(this.date.getUTCHours() - hours);
        return this;
    }

    AddUTCDay(day: number): DateEntity {
        this.date.setUTCDate(this.date.getUTCDate() + day);
        return this;
    }

    SubtractUTCDay(day: number): DateEntity {
        this.date.setUTCDate(this.date.getUTCDate() - day);
        return this;
    }

    AddUTCWeek(week: number): DateEntity {
        this.AddUTCDay(7 * week);
        return this;
    }

    SubtractUTCWeek(week: number): DateEntity {
        this.SubtractUTCDay(7 * week);
        return this;
    }

    AddUTCMonth(month: number): DateEntity {
        let currentDate = this.UTCDayOfMonth()

        this.SetUTCDayOfMonth(1);
        this.date.setUTCMonth(this.UTCMonth() + month);

        let daysInMonth = new Date(this.UTCYear(), this.UTCMonth() + 1, 0).getUTCDate();

        this.date.setUTCDate(Math.min(currentDate, daysInMonth));
        return this;
    }

    SubtractUTCMonth(month: number): DateEntity {
        this.AddUTCMonth(-month);
        return this;
    }

    AddUTCYear(year: number): DateEntity {
        this.date.setUTCFullYear(this.date.getUTCFullYear() + year);
        return this;
    }

    SubtractUTCYear(year: number): DateEntity {
        this.date.setUTCFullYear(this.date.getUTCFullYear() - year);
        return this;
    }

    //</editor-fold>
    //</editor-fold>

    //<editor-fold desc="Reset/End/Now">
    //<editor-fold desc="Locale">
    ResetHours(): DateEntity {
        return this.SetHours(0).SetMinutes(0).SetSeconds(0).SetMilliseconds(0);
    }

    ResetMinutes(): DateEntity {
        return this.SetMinutes(0).SetSeconds(0).SetMilliseconds(0);
    }

    SetEndOfDay(): DateEntity {
        return this.SetHours(23).SetMinutes(59).SetSeconds(59).SetMilliseconds(999);
    }

    //</editor-fold>

    //<editor-fold desc="UTC">
    SetNow(): DateEntity {
        return this.SetTime(new Date().getTime());
    }

    ResetUTCHours(): DateEntity {
        return this.SetUTCHours(0).SetUTCMinutes(0).SetUTCSeconds(0).SetUTCMilliseconds(0);
    }

    ResetUTCMinutes(): DateEntity {
        return this.SetUTCMinutes(0).SetUTCSeconds(0).SetUTCMilliseconds(0);
    }

    SetUTCEndOfDay(): DateEntity {
        return this.SetUTCHours(23).SetUTCMinutes(59).SetUTCSeconds(59).SetUTCMilliseconds(999);
    }

    //</editor-fold>
    //</editor-fold>

    //<editor-fold desc="Info">
    IsWeekEnd(): boolean {
        return this.date.getDay() == 6 || this.date.getDay() == 0;
    }

    IsWeekDay(): boolean {
        return !this.IsWeekEnd();
    }

    //</editor-fold>
}