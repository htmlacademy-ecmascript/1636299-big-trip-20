const POINT_TYPES = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant',
};

const OFFERS = [
  'Upgrade to a business class',
  'Upgrade to coupe',
  'Add meals',
  'Choose seats',
  'Add luggage',
  'Add premium service',
];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const FILTER_TYPES = {
  FUTURE: 'Future',
  PRESENT: 'Present',
  PAST: 'Past',
  EVERYTHING: 'Everything',
};

const MIN_PRICE = 5;
const MAX_PRICE = 5000;

const MIN_DESTINATION_ID = 1;
const MAX_DESTINATION_ID = 4;

export {POINT_TYPES, OFFERS, DESCRIPTIONS, FILTER_TYPES, MIN_PRICE, MAX_PRICE, MIN_DESTINATION_ID, MAX_DESTINATION_ID};
