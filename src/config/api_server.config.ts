import * as env from 'env-var';

export class APIServerConfiguration {
  public static readonly HOST: string = env.get('API_HOST').required().asString();

  public static readonly PORT: number = env.get('API_PORT')
    .required()
    .asPortNumber();

  public static readonly ENABLE_LOG: boolean = env.get('API_ENABLE_LOG')
    .required()
    .asBool();

  public static readonly ORIGIN: string = env.get('API_ORIGIN').required().asString();
  public static readonly GLOBAL_PREFIX: string = env.get('API_GLOBAL_PREFIX').required().asString();
}
