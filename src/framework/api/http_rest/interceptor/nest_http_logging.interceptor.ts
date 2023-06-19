import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CoreResponse } from '@core/abstraction/response';

@Injectable()
export class NestHttpLoggingInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<CoreResponse<void>> {
    const request: Request = context.switchToHttp().getRequest();
    const request_start_date: number = Date.now();
    return next
      .handle()
      .pipe(
        tap(
          (): void => {
            const request_finish_date: number = Date.now();
            const message: string =
              `Method: ${request.method}; ` +
              `Path: ${request.path}; ` +
              `SpentTime: ${request_finish_date - request_start_date}ms`;
            Logger.log(message, NestHttpLoggingInterceptor.name);
          }
        )
      );
  }
}
