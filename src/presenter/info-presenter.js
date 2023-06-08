import InfoView from '../view/info-view';
import {render, RenderPosition} from '../framework/render';

export default class InfoPresenter {
  #infoContainer = null;
  #pointsModel = null;

  #infoComponent = null;

  constructor({infoContainer, pointsModel}) {
    this.#infoContainer = infoContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#infoComponent = new InfoView({
      pointsModel: this.#pointsModel
    });

    render(this.#infoComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);
  }
}
