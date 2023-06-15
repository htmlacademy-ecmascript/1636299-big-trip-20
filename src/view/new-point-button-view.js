import AbstractView from '../framework/view/abstract-view';

const createNewPointButtonTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class NewPointButtonView extends AbstractView {
  #clickButtonHandler = null;

  constructor({ onClick }) {
    super();
    this.#clickButtonHandler = onClick;
    this.element.addEventListener('click', this.#clickButtonHandler);
  }

  get template() {
    return createNewPointButtonTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#clickButtonHandler();
  };
}
