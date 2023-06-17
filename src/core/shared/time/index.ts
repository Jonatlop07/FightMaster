import moment from 'moment';
import {
  CoreDate,
  CoreDateTime,
  CoreTimestamp,
  DATE_FORMAT,
  DATETIME_FORMAT,
  TIMESTAMP_FORMAT
} from '@core/abstraction/time';

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
