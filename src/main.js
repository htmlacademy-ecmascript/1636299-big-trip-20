import { render, RenderPosition } from './render.js';
import TripInfoView from './view/info-view.js';
import FiltersView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import ContentPresenter from './presenter/content-presenter.js';
import PointsModel from './model/model.js';

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
