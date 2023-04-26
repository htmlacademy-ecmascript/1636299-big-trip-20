import { render, RenderPosition } from './render';
import InfoView from './view/info-view';
import FilterView from './view/filter-view';
import SortView from './view/sort-view';
import BoardPresenter from './presenter/board-presenter';

const tripMainElement = document.querySelector('.trip-main');
const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripSortElement = document.querySelector('.trip-events');
const boardPresenter = new BoardPresenter ({boardContainer: tripSortElement});

render(new InfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), tripFiltersElement);
render(new SortView(), tripSortElement);

boardPresenter.init();

