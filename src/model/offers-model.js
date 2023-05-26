import {offers} from '../mock/offers';

export default class OffersModel {
  #offers = offers;
  #offersByType = null;

  get offers() {
    return this.#offers;
  }

  getOffersByType(type) {
    this.#offersByType = this.#offers.find((item) => item.type === type).offers;
    return this.#offersByType;
  }
}
