import { destinations } from '../mock/destinations.js';
import { getRandomPoint } from '../mock/points.js';
import { offers } from '../mock/offers.js';

const POINTS_COUNT = 3;
export default class PointsModel {
  points = Array.from({ length: POINTS_COUNT }, getRandomPoint);
  destinations = destinations;
  offers = offers;
  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }
}
