import { Nullable } from '@core/abstraction/type';
import { Code } from '@core/abstraction/exception/type/code';

export class CoreResponse<TData> {

  public readonly code: number;

  public readonly message: string;

  public readonly timestamp: number;

  public readonly data: Nullable<TData>;

  private constructor(code: number, message: string, data?: TData) {
    this.code      = code;
    this.message   = message;
    this.data      = data || null;
    this.timestamp = Date.now();
  }

  public static success<TData>(data?: TData, message?: string): CoreResponse<TData> {
    const result_code: number = Code.SUCCESS.code;
    const result_message: string = message || Code.SUCCESS.message;

    return new CoreResponse(result_code, result_message, data);
  }

  public static created<TData>(data?: TData, message?: string): CoreResponse<TData> {
    const result_code: number = Code.CREATED.code;
    const result_message: string = message || Code.CREATED.message;

    return new CoreResponse(result_code, result_message, data);
  }

  public static error<TData>(code?: number, message?: string, data?: TData): CoreResponse<TData> {
    const result_code: number = code || Code.INTERNAL_ERROR.code;
    const result_message: string = message || Code.INTERNAL_ERROR.message;

    return new CoreResponse(result_code, result_message, data);
  }
}
