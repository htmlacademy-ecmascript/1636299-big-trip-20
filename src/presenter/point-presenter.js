import PointView from '../view/point-view.js';
import {remove, render, replace} from '../framework/render';
import PointEditView from '../view/point-edit-view';
import {UpdateType, UserAction} from '../const';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #pointTrip = null;
  #destinations = null;
  #offers = null;
  #mode = Mode.DEFAULT;

  constructor({pointListContainer, onDataChange, onModeChange, destinations, offers}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  init(pointTrip) {
    this.#pointTrip = pointTrip;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView({
      pointTrip: this.#pointTrip,
      destinations: this.#destinations,
      offers: this.#offers,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick
    });
    this.#pointEditComponent = new PointEditView({
      pointTrip: this.#pointTrip,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onToggleClick: this.#handleToggleClick,
      onDeleteClick: this.#handleDeleteClick,
      onCanselClick: this.#handleCanselClick,
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
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

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#pointTrip);
      this.#replaceEditorToPoint();
    }
  }

  #replacePointToEditor() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceEditorToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#pointTrip);
      this.#replaceEditorToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToEditor();
  };

  #handleToggleClick = () => {
    this.#pointEditComponent.reset(this.#pointTrip);
    this.#replaceEditorToPoint();
  };

  #handleCanselClick = () => {
    this.#pointEditComponent.reset(this.#pointTrip);
    this.#replaceEditorToPoint();
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    );
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#pointTrip, isFavorite: !this.#pointTrip.isFavorite}
    );
  };

  #handleFormSubmit = (pointTrip) => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      pointTrip,
    );
    this.#replaceEditorToPoint();
  };
}
