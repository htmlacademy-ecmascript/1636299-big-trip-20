import { render, RenderPosition } from './framework/render';
import TripInfoView from './view/info-view';
import FiltersView from './view/filter-view';
import SortView from './view/sort-view';
import ContentPresenter from './presenter/content-presenter';
import PointsModel from './model/model';

const tripMainElement = document.querySelector('.trip-main');
const tripControlsFiltersElement = tripMainElement.querySelector(
  '.trip-controls__filters'
);
const tripEventsElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const contentPresenter = new ContentPresenter({
  contentContainer: tripEventsElement,
  pointsModel,
});

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FiltersView(), tripControlsFiltersElement);
render(new SortView(), tripEventsElement);

contentPresenter.init();
