import {getRandomArrayElement, getRandomNumber} from '../utils/common';
import {DESCRIPTIONS} from '../const';

export const destinations = [
  {
    id: 1,
    description: getRandomArrayElement(DESCRIPTIONS),
    name: 'London',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTIONS),
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTIONS),
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTIONS),
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        description: 'London is a capital of GB'
      }]
  },
  {
    id: 2,
    description: getRandomArrayElement(DESCRIPTIONS),
    name: 'Berlin',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTIONS),
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTIONS),
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTIONS),
      }]
  },
  {
    id: 3,
    description: getRandomArrayElement(DESCRIPTIONS),
    name: 'Amsterdam',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTIONS),
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTIONS),
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTIONS),
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTIONS),
      }]
  },
  {
    id: 4,
    description: getRandomArrayElement(DESCRIPTIONS),
    name: 'Rome',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTIONS),
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTIONS),
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTIONS),
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1, 10)}`,
        description: getRandomArrayElement(DESCRIPTIONS),
      }]
  }
];
