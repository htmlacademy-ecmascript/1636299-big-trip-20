import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';

const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';
const FULL_DATE_FORMAT = 'YY/MM/DD HH:mm';
const TIME_DIFFERENCE_MIN = 'mm[m]';
const TIME_DIFFERENCE_HOUR_MIN = 'HH[h] mm[m]';
const TIME_DIFFERENCE_DAY_HOUR_MIN = 'DD[d] HH[h] mm[m]';

const MS_IN_HOUR = 3600000;
const MS_IN_DAY = 86400000;

dayjs.extend(utc);
dayjs.extend(duration);

const humanizePointDate = (time, format) => time ? dayjs(time).utc().format(format) : '';

const countTimeDuration = (startDate, endDate) => {
  const difference = dayjs(endDate).diff(startDate);
  const timeDiffInMs = dayjs.duration(difference).$ms;
  let eventDuration = 0;

  switch (true) {
    case timeDiffInMs >= MS_IN_DAY:
      eventDuration = dayjs
        .duration(difference)
        .format(TIME_DIFFERENCE_DAY_HOUR_MIN);
      break;
    case timeDiffInMs >= MS_IN_HOUR:
      eventDuration = dayjs
        .duration(difference)
        .format(TIME_DIFFERENCE_HOUR_MIN);
      break;
    case timeDiffInMs < MS_IN_HOUR:
      eventDuration = dayjs.duration(difference).format(TIME_DIFFERENCE_MIN);
      break;
  }

  return eventDuration;
};

const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

const getRandomNumber = (a, b) => {

  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

export { humanizePointDate, countTimeDuration, getRandomArrayElement, getRandomNumber, FULL_DATE_FORMAT, DATE_FORMAT, TIME_FORMAT,};
