import {POINT_TYPES, OFFERS} from '../const';
import {getRandomNumber, getRandomArrayElement} from '../utils/common';

export const offers = [
  {
    type: POINT_TYPES.TAXI,
    offers: [
      {
        id: '1',
        title: getRandomArrayElement(OFFERS),
        price: getRandomNumber(10, 5000),
      },
    ],
  },
  {
    type: POINT_TYPES.TRAIN,
    offers: [
      {
        id: '1',
        title: getRandomArrayElement(OFFERS),
        price: getRandomNumber(10, 5000),
      },
      {
        id: '2',
        title: getRandomArrayElement(OFFERS),
        price: getRandomNumber(10, 5000),
      },
    ],
  },
  {
    type: POINT_TYPES.RESTAURANT,
    offers: [
      {
        id: '1',
        title: getRandomArrayElement(OFFERS),
        price: getRandomNumber(10, 5000),
      },
      {
        id: '2',
        title: getRandomArrayElement(OFFERS),
        price: getRandomNumber(10, 5000),
      },
      {
        id: '3',
        title: getRandomArrayElement(OFFERS),
        price: getRandomNumber(10, 5000),
      },
    ],
  },
];
