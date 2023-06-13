import AbstractView from '../framework/view/abstract-view';

function createTripInfoTemplate(points, destinations, offers) {
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
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>
        <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
      </div>
      <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${sumPointsTotal}</span>      </p>
    </section>`
  );
}

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
