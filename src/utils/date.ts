import fromUnixTime from 'date-fns/fromUnixTime'
import format from 'date-fns/format'

export const getDateFromTimestamp = (timestamp: number) => {
  return fromUnixTime(timestamp);
}

export const formatDateByMonthAndDay = (date: Date) => {
  return format(date, 'LLLL d');
}

export const formatDateByMonthDayAndHour = (date: Date) => {
  return format(date, "d LLLL 'at' hh:mm aa");
}