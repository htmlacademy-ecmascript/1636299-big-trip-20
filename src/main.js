import {render, RenderPosition} from './framework/render';
import TripInfoView from './view/info-view';
import FiltersView from './view/filter-view';
import ContentPresenter from './presenter/content-presenter';
import OffersModel from './model/offers-model';
import DestinationsModel from './model/destinations-model';
import PointsModel from './model/points-model';
import {generateFilter} from './utils/filter';

const filtersMainElement = document.querySelector('.trip-controls__filters');
const tripMainElement = document.querySelector('.trip-main');
const tripEventElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

const filters = generateFilter(pointsModel.points);

const contentPresenter = new ContentPresenter({
  eventContainer: tripEventElement,
  pointsModel,
  offersModel,
  destinationsModel
});

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FiltersView({filters}), filtersMainElement);

contentPresenter.init();
