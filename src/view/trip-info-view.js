import AbstractView from '../framework/view/abstract-view';
import {getRefinePointDateDayShort, getRefinePointDateShort} from '../utils/points';
import dayjs from 'dayjs';

const createTripInfoSumTemplate = (points, offers) => {
  const sumPoints = points.map((element) => element.basePrice).reduce((a, b) => a + b);

  const allOffers = [];
  points.forEach((point) => {
    const currentOffers = offers.find((element) => element.type === point.type).offers;
    const selectedOffers = point.offers.map((offerId) => currentOffers.find((element) => element.id === offerId));
    allOffers.push(...selectedOffers);
  });
  const sumOffers = allOffers.map((element) => element.price).reduce((a, b) => a + b);

  const sumPointsTotal = sumPoints + sumOffers;

  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${sumPointsTotal}</span>
    </p>`
  );
};

const createTripInfoCitiesTemplate = (points, destinations) => {
  const allDestinations = [];
  points.forEach((point) => {
    const destinationCurrent = destinations.find((element) => element.id === point.destination);
    allDestinations.push(destinationCurrent);
  });
  const firstDestination = allDestinations[0].name;
  const lastDestination = allDestinations[allDestinations.length - 1].name;
  const middleDestination = allDestinations.length > 3 ? '...' : `&mdash; ${allDestinations[1].name} &mdash;`;

  return (
    `<h1 class="trip-info__title">${firstDestination} ${middleDestination} ${lastDestination}</h1>`
  );
};

const createTripInfoTemplate = (points, destinations, offers) => {
  const firstDatePoint = getRefinePointDateShort(points[0].dateFrom);
  let lastDatePoint = getRefinePointDateShort(points[points.length - 1].dateTo);
  if (dayjs(firstDatePoint).month() === dayjs(lastDatePoint).month()) {
    lastDatePoint = getRefinePointDateDayShort(points[points.length - 1].dateTo);
  }

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        ${createTripInfoCitiesTemplate(points, destinations)}
        <p class="trip-info__dates">${firstDatePoint}&nbsp;&mdash;&nbsp;${lastDatePoint}</p>
      </div>
      ${createTripInfoSumTemplate(points, offers)}
    </section>`
  );
};

export default class TripInfoView extends AbstractView {
  #points = null;
  #destinations = null;
  #offers = null;

  constructor({points, destinations, offers}) {
    super();
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#destinations, this.#offers);
  }
}
