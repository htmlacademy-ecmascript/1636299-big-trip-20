import { render } from '../render.js';
import ContentListView from '../view/board-view.js';
import PointFormView from '../view/point-form-view.js';
import PointView from '../view/point-view.js';

export default class ContentPresenter {
  contentListComponent = new ContentListView();

  constructor({ contentContainer, pointsModel }) {
    this.contentContainer = contentContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];
    this.offers = [...this.pointsModel.getOffers()];
    this.destinations = [...this.pointsModel.getDestinations()];

    render(this.contentListComponent, this.contentContainer);
    render(
      new PointFormView({
        point: this.points[0],
        offers: this.offers,
        destinations: this.destinations,
      }),
      this.contentListComponent.getElement()
    );

    for (let i = 0; i < this.points.length; i++) {
      render(
        new PointView({
          point: this.points[i],
          offers: this.offers,
          destinations: this.destinations,
        }),
        this.contentListComponent.getElement()
      );
    }
  }
}
