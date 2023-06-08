import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import {getRandomNumber} from './common';

dayjs.extend(utc);
dayjs.extend(duration);

const DATE_SHORT_FORMAT = 'MMM D';
const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
const TIME_FORMAT = 'HH:mm';
const DATE_FULL_FORMAT = 'DD/MM/YY HH:mm';
const MIN_COUNT_DATE = 0;
const MAX_DAY = 5;
const MAX_HOUR = 10;
const MAX_MIN = 59;

function getDate() {
  const minutesGap = getRandomNumber(MIN_COUNT_DATE, MAX_MIN);
  const hoursGap = getRandomNumber(MIN_COUNT_DATE, MAX_HOUR);
  const daysGap = getRandomNumber(MIN_COUNT_DATE, MAX_DAY);

  const dateFrom = dayjs().subtract(getRandomNumber(MIN_COUNT_DATE, MAX_DAY), 'day').toDate();

  const dateTo = dayjs(dateFrom)
    .add(minutesGap, 'minute')
    .add(hoursGap, 'hour')
    .add(daysGap, 'day')
    .toDate();

  return {
    from: dateFrom,
    to: dateTo
  };
}

function getRefinePointDateTime(date) {
  return date ? dayjs(date).utc().format(DATE_TIME_FORMAT) : '';
}

function getRefinePointDateShort(date) {
  return date ? dayjs(date).utc().format(DATE_SHORT_FORMAT) : '';
}

function getRefineTimeDate(date) {
  return date ? dayjs(date).utc().format(TIME_FORMAT) : '';
}

function getRefineFullDate(date) {
  return date ? dayjs(date).utc().format(DATE_FULL_FORMAT) : '';
}

function getTimeDifference(dateFrom, dateTo) {
  const timeDiff = dayjs.duration(dayjs(dateTo).diff(dateFrom));
  const years = timeDiff.years();
  const months = timeDiff.months();
  const days = timeDiff.days();
  const hours = timeDiff.hours();
  const minutes = timeDiff.minutes();

  let totalDays = 0;
  if (years > 0) {
    totalDays += years * 365;
  }
  if (months > 0) {
    totalDays += months * 30;
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

function isPointFuture(dataFrom) {
  return dayjs(dataFrom).isAfter(dayjs());
}

function isPointPresent(dataFrom) {
  return dayjs(dataFrom).isSame((dayjs()));
}

function isPointPast(dataTo) {
  return dayjs(dataTo).isBefore((dayjs()));
}

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

function sortByTime(pointA, pointB) {
  return dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom)) - dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
}

function sortByPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

export {
  getRefinePointDateShort,
  getRefineTimeDate,
  getTimeDifference,
  getRefineFullDate,
  getRefinePointDateTime,
  getDate,
  isPointFuture,
  isPointPast,
  isPointPresent,
  sortByDay,
  sortByTime,
  sortByPrice
};
