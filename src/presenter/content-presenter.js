import {render, replace} from '../framework/render';
import ContentListView from '../view/board-view';
import PointFormView from '../view/point-form-view';
import PointView from '../view/point-view';
import SortView from '../view/sort-view';
import EmptyListMessage from '../view/empty-list-view';
import {isEscapeKey} from '../utils/common';

export default class ContentPresenter {
  #contentListComponent = new ContentListView();
  #eventPoints = [];

  #eventContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;

  constructor({eventContainer, pointsModel, offersModel, destinationsModel}) {
    this.#eventContainer = eventContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#eventPoints = [...this.#pointsModel.points];

    this.#renderEvents();
  }

  #renderPoint({point, offers, destinations}) {
    const pointComponent = new PointView({
      point,
      offers,
      destinations,
      onEditClick: () => {
        replaceEventToEventForm();
        document.addEventListener('keydown', onEscKey);
      },
    });

    const eventFormComponent = new PointFormView({
      point,
      offers,
      destinations,
      onFormSubmit: () => {
        replaceEventFormToEvent();
      },
      onRollUpClick: () => {
        replaceEventFormToEvent();
      },
    });

    function onEscKey(evt) {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceEventFormToEvent();
      }
    }

    function replaceEventToEventForm() {
      replace(eventFormComponent, pointComponent);
    }

    function replaceEventFormToEvent() {
      replace(pointComponent, eventFormComponent);
      document.removeEventListener('keydown', onEscKey);
    }

    render(pointComponent, this.#contentListComponent.element);
  }

  #renderEvents() {
    if (!this.#eventPoints.length) {
      render(new EmptyListMessage(), this.#eventContainer);
    } else {
      render(new SortView(), this.#eventContainer);
      render(this.#contentListComponent, this.#eventContainer);

      for (let i = 0; i < this.#eventPoints.length; i++) {
        this.#renderPoint({
          point: this.#eventPoints[i],
          offers: this.#offersModel.getOffersByType(this.#eventPoints[i].type),
          destinations: this.#destinationsModel.getDestinationById(this.#eventPoints[i].destination)
        });
      }
    }
  }
}
