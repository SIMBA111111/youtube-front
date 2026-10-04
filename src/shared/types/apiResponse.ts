export interface ApiResponse<T> {
    readonly success: boolean;
    readonly data: T | null;
    readonly error: string | null;
}

export class ApiResponseDTO<T> {
  public readonly success: boolean;
  public readonly data: T | null;
  public readonly error: string | null;

  constructor(data: T | null = null, error: string | null = null) {
    this.success = !error;
    this.data = data;
    this.error = error;
  }

  static success<T>(data: T): ApiResponseDTO<T> {
    return new ApiResponseDTO(data, null);
  }

  static error(message: string): ApiResponseDTO<null> {
    return new ApiResponseDTO(null, message);
  }
}