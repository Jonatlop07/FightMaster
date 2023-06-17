import { Optional } from '@core/abstraction/type';

export interface CoreDate {
  year: number;
  month: number;
  day: number;
}

export interface CoreTimestamp {
  hour: number;
  minutes: number;
  seconds: Optional<number>;
  milliseconds: Optional<number>;
  nanoseconds: Optional<number>;
}

export interface CoreDateTime extends CoreDate, CoreTimestamp {}

export const DATE_FORMAT = 'YYYY/MM/DD';
export const TIMESTAMP_FORMAT = 'HH:mm';
export const DATETIME_FORMAT = `${DATE_FORMAT}-${TIMESTAMP_FORMAT}`;
