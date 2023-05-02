import { render, RenderPosition } from './render';
import InfoView from './view/info-view';
import FilterView from './view/filter-view';
import SortView from './view/sort-view';
import BoardPresenter from './presenter/board-presenter';
import PointsModel from './model/model';

const tripMainElement = document.querySelector('.trip-main');
const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripSortElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter ({
  boardContainer: tripSortElement,
  pointsModel,
});

render(new InfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), tripFiltersElement);
render(new SortView(), tripSortElement);

boardPresenter.init();

