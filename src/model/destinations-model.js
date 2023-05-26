import {destinations} from '../mock/destinations';

export default class DestinationsModel {
  #destinations = destinations;
  #destinationById = null;

  get destinations() {
    return this.#destinations;
  }

  getDestinationById(id) {
    this.#destinationById = this.#destinations.find((destination) => destination.id === id);
    return this.#destinationById;
  }
}

