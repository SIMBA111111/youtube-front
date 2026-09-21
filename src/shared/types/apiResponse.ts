export interface ApiResponse<T> {
    readonly success: boolean;
    readonly data: T | null;
    readonly error: string | null;
}
