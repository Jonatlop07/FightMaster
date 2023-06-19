import { Logger as NestLogger, Global, Module, Provider } from '@nestjs/common';
import CoreDITokens from '@core/abstraction/di';
import Logger from '@core/shared/logging';
import { CoreLoggerService } from '@core/abstraction/logging';
import ApplicationDITokens from '@framework/module/application.di_tokens';

const providers: Array<Provider> = [
  {
    provide: CoreDITokens.CoreLogger,
    useFactory: (loggerService: CoreLoggerService) => new Logger(loggerService),
    inject: [ApplicationDITokens.Logger]
  },
  {
    provide: ApplicationDITokens.Logger,
    useFactory: () => new NestLogger()
  }
];

@Global()
@Module({
  providers,
  exports: providers
})
export class LoggingModule {}
