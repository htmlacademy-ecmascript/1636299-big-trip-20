import {render, replace, remove} from '../framework/render';
import PointFormView from '../view/point-form-view';
import PointView from '../view/point-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #point = null;
  #offersModel = null;
  #destinationModel = null;
  #listComponent = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #mode = Mode.DEFAULT;

  constructor({listComponent, offersModel, destinationModel, onDataChange, onModeChange}) {
    this.#listComponent = listComponent;
    this.#offersModel = offersModel;
    this.#destinationModel = destinationModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      offers: this.#offersModel.getOffersByType(this.#point.type),
      destinations: this.#destinationModel.getDestinationById(point.destination),
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new PointFormView({
      point: this.#point,
      allOffers: this.#offersModel.offers,
      allDestinations: this.#destinationModel.destinations,
      onFormSubmit: this.#handleSubmitForm,
      onRollUpClick: this.#handleRollDownClick
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#listComponent);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }
    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceEditFormToRoutPoint();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceEditFormToRoutPoint();
    }
  };

  #replaceRoutPointToEditForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditFormToRoutPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #handleRollDownClick = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceEditFormToRoutPoint();
  };

  #handleSubmitForm = (point) => {
    this.#handleDataChange(point);
    this.#replaceEditFormToRoutPoint();
  };

  #handleEditClick = () => {
    this.#replaceRoutPointToEditForm();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
