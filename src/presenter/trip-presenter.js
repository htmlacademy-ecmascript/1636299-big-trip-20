import {remove, render, RenderPosition} from '../framework/render';
import TripListView from '../view/trip-list-view';
import SortView from '../view/sort-view';
import TripListEmptyView from '../view/trip-list-empty-view';
import PointPresenter from './point-presenter';
import {FilterType, SortType, UpdateType, UserAction} from '../const';
import {sortByDay, sortByPrice, sortByTime} from '../utils/points';
import {Filter} from '../utils/filter';
import NewPointPresenter from './new-point-presenter';
import LoadingView from '../view/loading-view';
import UiBlocker from '../framework/ui-blocker/ui-blocker';
import InfoPresenter from './info-presenter';
import NewPointButtonView from '../view/new-point-button-view';
import ErrorView from '../view/error-view';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class TripPresenter {
  #tripContainer = null;
  #infoContainer = null;
  #pointsModel = null;
  #filterModel = null;

  #tripListComponent = new TripListView();
  #loadingComponent = new LoadingView();
  #sortComponent = null;
  #tripEmptyComponent = null;
  #newPointButtonComponent = null;
  #errorComponent = null;
  #pointPresenters = new Map();
  #newPointPresenter = null;
  #infoPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({tripContainer, pointsModel, filterModel, infoContainer}) {
    this.#tripContainer = tripContainer;
    this.#infoContainer = infoContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#newPointPresenter = new NewPointPresenter({
      pointListContainer: this.#tripListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#handleNewPointFormClose,
      destinations: this.destinations,
      offers: this.offers,
      onModeChange: this.#handleModeChange
    });

    this.#newPointButtonComponent = new NewPointButtonView({
      onClick: this.#handleNewPointButtonClick
    });

    this.#pointsModel.addObserver(this.#handleModelPoint);
    this.#filterModel.addObserver(this.#handleModelPoint);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = Filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortByDay);
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
    }
    return filteredPoints;
  }

  get destinations() {
    return this.#pointsModel.destinations;
  }

  get offers() {
    return this.#pointsModel.offers;
  }

  init() {
    this.#renderTrip();
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortComponent, this.#tripListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint({pointTrip, destinations, offers}) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#tripListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
      destinations, offers
    });

    pointPresenter.init(pointTrip);
    this.#pointPresenters.set(pointTrip.id, pointPresenter);
  }

  #renderPoints(points, destinations, offers) {
    points.forEach((point) => this.#renderPoint({
      pointTrip: point,
      destinations: destinations,
      offers: offers
    }));
  }

  #renderInfo() {
    const points = this.#pointsModel.points.sort(sortByDay);
    const destinations = this.destinations;
    const offers = this.offers;
    this.#infoPresenter = new InfoPresenter({
      infoContainer: this.#infoContainer,
      points: points,
      destinations: destinations,
      offers: offers,
    });
    this.#infoPresenter.init();
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  }

  #renderError() {
    const errorComponent = new ErrorView();
    render(errorComponent, this.#tripContainer, RenderPosition.AFTERBEGIN);
  }

  #renderTripEmpty() {
    this.#tripEmptyComponent = new TripListEmptyView({
      filterType: this.#filterType,
    });
    render(this.#tripEmptyComponent, this.#tripContainer);
  }

  #renderTripList() {
    const points = this.points;
    const destinations = this.destinations;
    const offers = this.offers;

    render(this.#tripListComponent, this.#tripContainer);
    this.#renderPoints(points, destinations, offers);
  }

  #clearTrip({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#infoPresenter.destroy();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);

    if (this.#tripEmptyComponent) {
      remove(this.#tripEmptyComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderTrip() {
    render(this.#tripListComponent, this.#tripContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.points.length === 0) {
      this.#renderTripEmpty();
      return;
    }

    this.#renderSort();
    this.#renderInfo();
    this.#renderTripList();
  }

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch (err) {
          this.#newPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelPoint = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearTrip({resetSortType: true});
        this.#renderTrip();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderTrip();
        render(this.#newPointButtonComponent, this.#infoContainer);
        break;
      case UpdateType.ERROR:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderError();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTrip();
    this.#renderTrip();
  };

  #handleNewPointFormClose = () => {
    this.#newPointButtonComponent.element.disabled = false;
  };

  #handleNewPointButtonClick = () => {
    this.createPoint();
    this.#newPointButtonComponent.element.disabled = true;
  };
}
