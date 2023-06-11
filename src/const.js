const DEFAULT_TYPE = 'Taxi';

const POINT_EMPTY = {
  type: DEFAULT_TYPE,
  dateFrom: null,
  dateTo: null,
  basePrice: 0,
  offers: [],
  destination: null,
  isFavorite: false
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export {POINT_EMPTY, FilterType, SortType, UpdateType, UserAction};
