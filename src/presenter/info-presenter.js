import TripInfoView from '../view/trip-info-view';
import {render, remove, RenderPosition} from '../framework/render';

export default class InfoPresenter {
  #infoContainer = null;
  #points = null;
  #destinations = null;
  #offers = null;

  #infoComponent = null;

  constructor({infoContainer, points, destinations, offers}) {
    this.#infoContainer = infoContainer;
    this.#points = points;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  init() {
    this.#infoComponent = new TripInfoView({
      points: this.#points,
      destinations: this.#destinations,
      offers: this.#offers
    });

    render(this.#infoComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);
  }

  destroy() {
    if (this.#infoComponent === null) {
      return;
    }

    remove(this.#infoComponent);
    this.#infoComponent = null;
  }
}
