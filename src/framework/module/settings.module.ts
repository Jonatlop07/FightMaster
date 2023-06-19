import { APIServerConfiguration } from '../../config/api_server.config';
import { Global, Module, Provider } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { NestHttpExceptionFilter } from '@framework/api/http_rest/exception_filter/nest_http.exception_filter';
import { NestHttpLoggingInterceptor } from '@framework/api/http_rest/interceptor/nest_http_logging.interceptor';

const providers: Array<Provider> = [
  {
    provide : APP_FILTER,
    useClass: NestHttpExceptionFilter,
  },
];

if (APIServerConfiguration.ENABLE_LOG) {
  providers.push({
    provide : APP_INTERCEPTOR,
    useClass: NestHttpLoggingInterceptor,
  });
}

@Global()
@Module({
  providers
})
export class SettingsModule {}
