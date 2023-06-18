import { Inject } from '@nestjs/common';
import CoreDITokens from '@core/abstraction/di';
import { CoreLogger, CoreLoggerService } from '@core/abstraction/logging';

export default class Logger implements CoreLogger {
  constructor(
    @Inject(CoreDITokens.CoreLogger)
    private readonly logger_service: CoreLoggerService
  ) {}

  public log(message: any, context: string) {
    this.logger_service.log(message, context);
  }

  public debug(message: any, context: string) {
    this.logger_service.debug(message, context);
  }

  public warn(message: any, context: string) {
    this.logger_service.warn(message, context);
  }

  public error(message: any, context: string) {
    this.logger_service.error(message, context);
  }

  public verbose(message: any, context: string) {
    this.logger_service.verbose(message, context);
  }
}
