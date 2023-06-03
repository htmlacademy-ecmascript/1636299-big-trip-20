import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';
const FULL_DATE_FORMAT = 'YY/MM/DD HH:mm';

dayjs.extend(utc);
dayjs.extend(duration);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const humanizePointDate = (time, format) => time ? dayjs(time).utc().format(format) : '';

const countTimeDuration = (startDate, endDate) => {
  const timeDiff = dayjs.duration(dayjs(endDate).diff(startDate));
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

  let eventDuration = '';

  if (totalDays > 0) {
    eventDuration += `${totalDays}D `;
  }

  if (hours > 0 || (totalDays === 0 && minutes === 0)) {
    eventDuration += `${hours.toString().padStart(2, '0')}H `;
  }

  if (minutes > 0 || (totalDays === 0 && hours === 0)) {
    eventDuration += `${minutes.toString().padStart(2, '0')}M`;
  }

  return eventDuration.trim();
};

const isPointDateExpired = (endDate) => endDate && dayjs().isAfter(endDate, 'D');

const isPointDateInFuture = (startDate) => startDate && dayjs().isBefore(startDate, 'D');

const isPointDateInPresent = (startDate, endDate) => {
  const startIsSameOrBeforeToday = dayjs().isSameOrAfter(dayjs(startDate), 'day');
  const endIsSameOrAfterToday = dayjs().isSameOrBefore(dayjs(endDate).format(), 'D');

  return startIsSameOrBeforeToday && endIsSameOrAfterToday;
};

function getDataDifference(pointA, pointB) {
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function getTimeDifference(pointA, pointB) {
  const pointAdifference = dayjs(pointA.dateTo).diff(pointA.dateFrom);
  const pointBdifference = dayjs(pointB.dateTo).diff(pointB.dateFrom);

  const difference = pointBdifference - pointAdifference;

  return difference;
}

function getPriceDifference(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

export {
  countTimeDuration,
  isPointDateExpired,
  isPointDateInFuture,
  isPointDateInPresent,
  getPriceDifference,
  getTimeDifference,
  getDataDifference,
  humanizePointDate,
  FULL_DATE_FORMAT,
  DATE_FORMAT,
  TIME_FORMAT
};
