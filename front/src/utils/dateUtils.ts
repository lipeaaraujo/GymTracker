import dayjs, { Dayjs } from "dayjs";
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'

dayjs.extend(utc);
dayjs.extend(tz);
// const timezone = dayjs.tz.guess();

export const formatDate = (date: string) => {
  return Intl.DateTimeFormat("en-us", {
    dateStyle: "full",
    timeZone: "UTC",
  }).format(new Date(date));
};

export const formatDateToYMD = (date: string) => {
  return Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC"
  }).format(new Date(date));
}

export const dateStr2DayJs = (date: string) => {
  return dayjs(date).utc();
}

export const dayjs2DateStr = (date: Dayjs): string => {
  const dateString = date.utc().format("YYYY-MM-DD");
  // console.log(dateString);
  return dateString;
}