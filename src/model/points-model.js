import {
  generatePoints,
  generateMockOffers,
  getRandomMockDestination,
} from '../mock/point';
import {MAX_COUNT_DESCRIPTION, MAX_COUNT_OFFER, MIN_COUNT_OFFER, WAYPOINTS} from '../const';
import {getRandomArrayElement, getRandomNumber} from '../utils/common';
import Observable from '../framework/observable';

const POINT_COUNT = 4;

export default class PointsModel extends Observable {
  #points = null;
  #destinations = null;
  #offers = null;

  constructor() {
    super();
    this.#destinations = this.#generateDestinations();
    this.#offers = this.#generateOffers();
    this.#points = this.#generatePoints();
  }

  get offers() {
    return this.#offers;
  }

  get destinations() {
    return this.#destinations;
  }

  get events() {
    return this.#points;
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType);
  }

  #generateDestinations() {
    return Array.from({length: MAX_COUNT_DESCRIPTION}, () => getRandomMockDestination());
  }

  #generateOffers() {
    return WAYPOINTS.map((type) => ({
      type,
      offers: Array.from({length: getRandomNumber(MIN_COUNT_OFFER, MAX_COUNT_OFFER)}, generateMockOffers)
    }));
  }

  #generatePoints() {
    return Array.from({length: POINT_COUNT}, () => {
      const type = getRandomArrayElement(WAYPOINTS);
      const destination = getRandomArrayElement(this.destinations);

      const hasOffer = getRandomNumber(0, 1);

      const offersByType = this.offers.find((offerByType) => offerByType.type === type);

      const offerIds = (hasOffer)
        ? offersByType.offers
          .slice(0, getRandomNumber(MIN_COUNT_OFFER, MAX_COUNT_OFFER))
          .map((offer) => offer.id)
        : [];

      return generatePoints(type, destination.id, offerIds);
    });
  }
}
