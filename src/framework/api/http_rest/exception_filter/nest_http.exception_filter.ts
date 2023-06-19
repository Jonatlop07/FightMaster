import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
  UnauthorizedException
} from '@nestjs/common';
import { Code } from '@core/abstraction/exception/type/code';
import { APIServerConfiguration } from '../../../../config/api_server.config';
import { CoreResponse } from '@core/abstraction/response';
import { Request, Response } from 'express';
import { CoreException } from '@core/abstraction/exception/core.exception';

@Catch()
export class NestHttpExceptionFilter implements ExceptionFilter {
  public catch(error: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request: Request = ctx.getRequest<Request>();
    const response: Response = ctx.getResponse<Response>();
    let error_response: CoreResponse<unknown> = CoreResponse.error(
      Code.INTERNAL_ERROR.code,
      error.message
    );
    error_response = NestHttpExceptionFilter.handleNestError(error, error_response);
    error_response = NestHttpExceptionFilter.handleCoreException(error, error_response);
    if (APIServerConfiguration.ENABLE_LOG) {
      const message: string =
        `Method: ${request.method}; ` +
        `Path: ${request.url}; `+
        `Error: ${error_response.message}`;
      Logger.error(message);
    }
    response.json(error_response);
  }

  private static handleNestError(
    error: Error,
    error_response: CoreResponse<unknown>
  ): CoreResponse<unknown> {
    if (error instanceof HttpException) {
      error_response = CoreResponse.error(
        error.getStatus(),
        error.message, null
      );
    }
    if (error instanceof UnauthorizedException) {
      error_response = CoreResponse.error(
        Code.UNAUTHORIZED_ERROR.code,
        Code.UNAUTHORIZED_ERROR.message,
        null
      );
    }
    return error_response;
  }

  private static handleCoreException(
    error: Error,
    errorResponse: CoreResponse<unknown>
  ): CoreResponse<unknown> {
    if (error instanceof CoreException) {
      errorResponse = CoreResponse.error(
        error.code,
        error.message,
        error.data
      );
    }
    return errorResponse;
  }
}
