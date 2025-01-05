import { DateTime } from 'luxon';
import { isStr } from './cond';

/**
 * Formats a date and time string based on a specified format.
 *
 * @param {string | Date | {year: number, month: number, day: number}} value - The date and time to format.
 * @param {string} [format='dd.MM.yy HH:mm:ss'] - The format string to use. Defaults to 'dd.MM.yy HH:mm:ss'.
 * @return {string | false} The formatted date and time string or false if the input value is invalid.
 */
export const formatDatetime = (
  value,
  format = 'dd.MM.yy HH:mm:ss',
  returnAsJsDate = false,
  fromFormat
) => {
  if (!value) {
    return false;
  }

  let dt;

  if (typeof value === 'string') {
    if (isStr(fromFormat)) {
      dt = DateTime.fromFormat(value, fromFormat);
    } else {
      dt = DateTime.fromISO(value);
    }
  } else if (value instanceof Date) {
    dt = DateTime.fromJSDate(value);
  } else if (
    typeof value === 'object' &&
    value !== null &&
    value.hasOwnProperty('year') &&
    value.hasOwnProperty('month') &&
    value.hasOwnProperty('day')
  ) {
    dt = DateTime.fromObject(value);
  }

  if (dt && dt.isValid) {
    if (returnAsJsDate) {
      return dt.toJSDate();
    }

    return dt.toFormat(format);
  }

  return '';
};

/**
 * Formats a value to a specific date format using `formatDatetime`.
 *
 * @param {any} value - The value to be formatted.
 * @param {string} [format='dd.MM.yy'] - The format string to be used. Defaults to 'dd.MM.yy'.
 * @return {any} The formatted date value.
 */
export const formatDate = (value, format = 'dd.MM.yy') => {
  return formatDatetime(value, format) || '';
};

/**
 * Formats a given time value according to a specified format.
 *
 * @param {any} value - The time value to be formatted.
 * @param {string} [format='HH:mm:ss'] - The format to be used for formatting the time value. Defaults to 'HH:mm:ss'.
 * @return {any} - The formatted time value.
 */
export const formatTime = (value, format = 'HH:mm:ss') => {
  return formatDatetime(value, format);
};
