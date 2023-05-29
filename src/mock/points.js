import {getRandomNumber, getRandomArrayElement} from '../utils/common';
import {POINT_TYPES, MIN_PRICE, MAX_PRICE, MIN_DESTINATION_ID, MAX_DESTINATION_ID} from '../const';
import {nanoid} from 'nanoid';

const points = [
  {
    basePrice: getRandomNumber(MIN_PRICE, MAX_PRICE),
    dateFrom: '2024-01-11T10:55:56.845Z',
    dateTo: '2024-03-16T04:22:13.375Z',
    destination: getRandomNumber(MIN_DESTINATION_ID, MAX_DESTINATION_ID),
    isFavorite: false,
    type: POINT_TYPES.TAXI,
    offers: ['1'],
  },
  {
    basePrice: getRandomNumber(MIN_PRICE, MAX_PRICE),
    dateFrom: '2019-07-12T20:55:56.845Z',
    dateTo: '2019-07-13T07:22:13.375Z',
    destination: getRandomNumber(MIN_DESTINATION_ID, MAX_DESTINATION_ID),
    isFavorite: true,
    type: POINT_TYPES.TRAIN,
    offers: ['1', '2'],
  },
  {
    basePrice: getRandomNumber(MIN_PRICE, MAX_PRICE),
    dateFrom: '2019-03-10T22:55:56.845Z',
    dateTo: '2019-07-11T11:22:13.375Z',
    destination: getRandomNumber(MIN_DESTINATION_ID, MAX_DESTINATION_ID),
    isFavorite: false,
    type: POINT_TYPES.RESTAURANT,
    offers: ['1', '2', '3'],
  },
];

function getRandomPoint() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(points),
  };
}

export {getRandomPoint};
