import { Optional } from '@core/abstraction/type';
import moment from 'moment';

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

const DATE_FORMAT = 'YYYY/MM/DD';
const TIMESTAMP_FORMAT = 'HH:mm';
const DATETIME_FORMAT = `${DATE_FORMAT}-${TIMESTAMP_FORMAT}`;

export function formatDate(date: CoreDate): string {
  const moment_date = moment(date);
  return moment_date.format(DATE_FORMAT);
}

export function formatTimestamp(timestamp: CoreTimestamp): string {
  const moment_timestamp = moment(timestamp);
  return moment_timestamp.format(TIMESTAMP_FORMAT);
}

export function formatDateTime(datetime: CoreDateTime): string {
  const moment_datetime = moment(datetime);
  return moment_datetime.format(DATETIME_FORMAT);
}
