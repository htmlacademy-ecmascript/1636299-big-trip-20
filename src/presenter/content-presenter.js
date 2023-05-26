import {render, replace} from '../framework/render';
import ContentListView from '../view/board-view';
import PointFormView from '../view/point-form-view';
import PointView from '../view/point-view';
import {isEscapeKey} from '../utils';

export default class ContentPresenter {
  contentListComponent = new ContentListView();

  constructor({contentContainer, pointsModel}) {
    this.contentContainer = contentContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];
    this.offers = [...this.pointsModel.getOffers()];
    this.destinations = [...this.pointsModel.getDestinations()];

    render(this.contentListComponent, this.contentContainer);
    for (let i = 0; i < this.points.length; i++) {
      this.renderPoint({
        point: this.points[i],
        offers: this.offers,
        destinations: this.destinations,
      });
    }
  }

  renderPoint({point, offers, destinations}) {
    const eventComponent = new PointView({
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
      replace(eventFormComponent, eventComponent);
    }

    function replaceEventFormToEvent() {
      replace(eventComponent, eventFormComponent);
      document.removeEventListener('keydown', onEscKey);
    }

    render(eventComponent, this.contentListComponent.element);
  }
}
