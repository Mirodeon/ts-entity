import {IData} from "@mirodeon/ts-core";
import {EnumRef} from "./EnumRef";

type EnumCtor<U> = Function & { prototype: U };

export abstract class EnumBase<T extends EnumBase<T>> {
    readonly value: string;
    readonly label: string;

    protected constructor(value: string, label: string) {
        this.value = value;
        this.label = label;
    }

    static Values<U extends EnumBase<U>>(this: EnumCtor<U>): U[] {
        const bag = this as unknown as Record<string, unknown>;
        const allStatics = Object.values(bag);
        const Ctor = this as unknown as Function;

        return allStatics.filter((entity): entity is U => entity instanceof Ctor);
    }

    static FromValue<U extends EnumBase<U>>(
        this: EnumCtor<U> & { Values(): U[] },
        value: string
    ): U | undefined {
        return this.Values().find(enumEntity => enumEntity.value === value);
    }

    static HasValue<U extends EnumBase<U>>(
        this: EnumCtor<U> & { Values(): U[] },
        value: string
    ): boolean {
        return this.Values().some(enumEntity => enumEntity.value === value);
    }

    static Ensure<U extends EnumBase<U>>(
        this: EnumCtor<U> & { FromValue(v: string): U | undefined },
        value: string
    ): U {
        const enumEntity: U = this.FromValue(value);
        if (!enumEntity) throw new Error(`Unknown enum value "${value}".`);
        return enumEntity;
    }

    static Deserialize<U extends EnumBase<U>>(
        this: EnumCtor<U> & { Ensure(v: string): U },
        data: IData
    ): U {
        return this.Ensure(data["value"]);
    }

    Serialize(): IData {
        return {value: this.value};
    }

    static Ref<U extends EnumBase<U>>(
        this: Function & { Deserialize(data: IData): U; Default?(): U },
        value?: U
    ): EnumRef<U> {
        const initial = value ?? this.Default?.();
        if (!initial) throw new Error('EnumRef requires an initial value or a static Default() method.');
        return new EnumRef<U>(this as unknown as Function & { Deserialize(data: IData): U }, initial);
    }

    static RefFromValue<U extends EnumBase<U>>(
        this: Function & { Ensure(value: string): U },
        raw: string
    ): EnumRef<U> {
        const value = this.Ensure(raw) as U;
        return new EnumRef<U>(this as unknown as Function & { Deserialize(data: IData): U }, value);
    }
}
