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
  TIME: 'HH:mm',
  DATE_FULL: 'DD/MM/YY HH:mm',
  MINUTES: 'mm[M]',
  HOURS_MINUTE: 'HH[H] mm[M]',
  DAYS_HOURS_MINUTES: 'DD[D] HH[H] mm[M]',
};

function getRefinePointDateTime(date) {
  return date ? dayjs(date).utc().format(DateFormat.DATE_TIME) : '';
}

function getRefinePointDateShort(date) {
  return date ? dayjs(date).utc().format(DateFormat.DATE_SHORT) : '';
}

function getRefineTimeDate(date) {
  return date ? dayjs(date).utc().format(DateFormat.TIME) : '';
}

function getRefineFullDate(date) {
  return date ? dayjs(date).utc().format(DateFormat.DATE_FULL) : '';
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

function isPointFuture(dateFrom) {
  return dayjs(dateFrom).isAfter(dayjs());
}

function isPointPresent(dateFrom, dateTo) {
  return dayjs(dateFrom).isSameOrBefore((dayjs())) && dayjs(dateTo).isSameOrAfter((dayjs()));
}

function isPointPast(dateTo) {
  return dayjs(dateTo).isBefore((dayjs()));
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
  isPointFuture,
  isPointPast,
  isPointPresent,
  sortByDay,
  sortByTime,
  sortByPrice
};
