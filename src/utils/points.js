import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';

dayjs.extend(utc);
dayjs.extend(duration);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const DateFormat = {
  DATE_SHORT: 'MMM D',
  DATE_TIME: 'YYYY-MM-DDTHH:mm',
  ONLY_DAY: 'DD',
  TIME: 'HH:mm',
  DATE_FULL: 'DD/MM/YY HH:mm',
  MINUTES: 'mm[M]',
  HOURS_MINUTE: 'HH[H] mm[M]',
  DAYS_HOURS_MINUTES: 'DD[D] HH[H] mm[M]',
};

const DAYS_IN_YEAR = 365;
const DAYS_IN_MONTH = 30;

const getRefinePointDateTime = (date) => date ? dayjs(date).utc().format(DateFormat.DATE_TIME) : '';
const getRefinePointDateShort = (date) => date ? dayjs(date).utc().format(DateFormat.DATE_SHORT) : '';
const getRefinePointDateDayShort = (date) => date ? dayjs(date).utc().format(DateFormat.ONLY_DAY) : '';
const getRefineTimeDate = (date) => date ? dayjs(date).utc().format(DateFormat.TIME) : '';
const getRefineFullDate = (date) => date ? dayjs(date).utc().format(DateFormat.DATE_FULL) : '';

function getTimeDifference(dateFrom, dateTo) {
  const timeDiff = dayjs.duration(dayjs(dateTo).diff(dateFrom));
  const years = timeDiff.years();
  const months = timeDiff.months();
  const days = timeDiff.days();
  const hours = timeDiff.hours();
  const minutes = timeDiff.minutes();

  let totalDays = 0;
  if (years > 0) {
    totalDays += years * DAYS_IN_YEAR;
  }
  if (months > 0) {
    totalDays += months * DAYS_IN_MONTH;
  }
  totalDays += days;

  let durationPoint = '';

  if (totalDays > 0) {
    durationPoint += `${totalDays}D `;
  }

  if (hours > 0 || (totalDays === 0 && minutes === 0)) {
    durationPoint += `${hours.toString().padStart(2, '0')}H `;
  }

  if (minutes > 0 || (totalDays === 0 && hours === 0)) {
    durationPoint += `${minutes.toString().padStart(2, '0')}M`;
  }

  return durationPoint.trim();
}

const isPointFuture = (dateFrom) => dayjs(dateFrom).isAfter(dayjs());
const isPointPresent = (dateFrom, dateTo) => dayjs(dateFrom).isSameOrBefore((dayjs())) && dayjs(dateTo).isSameOrAfter((dayjs()));
const isPointPast = (dateTo) => dayjs(dateTo).isBefore((dayjs()));

function sortByDay(pointA, pointB) {
  if (dayjs(pointA.dateFrom).isAfter(dayjs(pointB.dateFrom))) {
    return 1;
  }
  if (dayjs(pointA.dateFrom) === dayjs(pointB.dateFrom)) {
    return 0;
  }
  if (dayjs(pointA.dateFrom).isBefore(dayjs(pointB.dateFrom))) {
    return -1;
  }
}

const sortByTime = (pointA, pointB) => dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom)) - dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));

const sortByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export {
  getRefinePointDateShort,
  getRefineTimeDate,
  getRefinePointDateDayShort,
  getTimeDifference,
  getRefineFullDate,
  getRefinePointDateTime,
  isPointFuture,
  isPointPast,
  isPointPresent,
  sortByDay,
  sortByTime,
  sortByPrice
};
