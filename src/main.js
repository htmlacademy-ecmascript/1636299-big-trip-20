import TripPresenter from './presenter/trip-presenter';
import FilterPresenter from './presenter/filter-presenter';
import {render} from './framework/render';
import NewPointButtonView from './view/new-point-button-view';
import PointsApiService from './points-api-service';
import PointsModel from './model/points-model';
import FilterModel from './model/filter-model';
import InfoPresenter from './presenter/info-presenter';

const AUTHORIZATION = 'Basic Sfdwqf1d6rflu9d';
const END_POINT = 'https://20.ecmascript.pages.academy/big-trip';

const siteTripMainElement = document.querySelector('.trip-main');
const tripPointsElement = document.querySelector('.trip-events');
const filtersContainerElement = document.querySelector('.trip-controls__filters');

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter({
  tripContainer: tripPointsElement,
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});

const filterPresenter = new FilterPresenter({
  filterContainer: filtersContainerElement,
  filterModel,
  pointsModel
});

const infoPresenter = new InfoPresenter({
  infoContainer: siteTripMainElement,
  pointsModel
});

const newPointButtonComponent = new NewPointButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newPointButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  tripPresenter.createPoint();
  newPointButtonComponent.element.disabled = true;
}

render(newPointButtonComponent, siteTripMainElement);

filterPresenter.init();
infoPresenter.init();
tripPresenter.init();
pointsModel.init()
  .finally(() => {
    render(newPointButtonComponent, siteTripMainElement);
  });

