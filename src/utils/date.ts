import fromUnixTime from 'date-fns/fromUnixTime'
import format from 'date-fns/format'
import getTime from 'date-fns/getTime'

export const getDateFromTimestamp = (timestamp: number) => {
  return fromUnixTime(timestamp);
}

export const getTimestampFromDate = (date: Date) => {
  return getTime(date);
}

export const formatDateByMonthAndDay = (date: Date) => {
  return format(date, 'LLLL d');
}

export const formatDateByMonthDayAndHour = (date: Date) => {
  return format(date, "d LLLL 'at' hh:mm aa");
}