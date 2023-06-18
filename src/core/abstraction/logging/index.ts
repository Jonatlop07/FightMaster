export interface CoreLoggerService {
  log(message: any, context?: string);
  debug(message: any, context?: string);
  warn(message: any, context?: string);
  error(message: any, context?: string);
  verbose(message: any, context?: string);
}

export interface CoreLogger {
  log(message: any, context: string);
  debug(message: any, context: string);
  warn(message: any, context: string);
  error(message: any, context: string);
  verbose(message: any, context: string);
}
