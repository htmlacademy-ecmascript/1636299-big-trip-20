import {getRandomNumber, getRandomArrayElement} from '../utils/common';
import {POINT_TYPES} from '../const';

const points = [
  {
    id: '1',
    basePrice: getRandomNumber(10, 5000),
    dateFrom: '2024-01-11T10:55:56.845Z',
    dateTo: '2024-03-16T04:22:13.375Z',
    destination: getRandomNumber(1, 4),
    isFavorite: false,
    type: POINT_TYPES.TAXI,
    offers: ['1'],
  },
  {
    id: '2',
    basePrice: getRandomNumber(10, 5000),
    dateFrom: '2019-07-12T20:55:56.845Z',
    dateTo: '2019-07-13T07:22:13.375Z',
    destination: getRandomNumber(1, 4),
    isFavorite: true,
    type: POINT_TYPES.TRAIN,
    offers: ['1', '2'],
  },
  {
    id: '3',
    basePrice: getRandomNumber(10, 5000),
    dateFrom: '2019-03-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: getRandomNumber(1, 4),
    isFavorite: false,
    type: POINT_TYPES.RESTAURANT,
    offers: ['1', '2', '3'],
  },
];

const getRandomPoint = () => getRandomArrayElement(points);

export {getRandomPoint};
