import * as env from 'env-var';

export class DBConfiguration {
  public static readonly SCHEMA: string = env.get('DATABASE_NAME').required().asString();
}
