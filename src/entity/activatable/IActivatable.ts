export interface IActivatable {
    Activate(): void;
    Deactivate(): void;
    IsActive(): boolean;
    IsInactive(): boolean;
    SetActive(active: boolean): void;
    ToggleActive(): void;
}