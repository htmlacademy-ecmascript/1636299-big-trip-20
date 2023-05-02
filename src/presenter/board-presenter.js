import { render, RenderPosition } from '../render';
import BoardView from '../view/board-view';
import EditFormView from '../view/edit-form-view';
import PointView from '../view/point-view';

export default class BoardPresenter {
  boardComponent = new BoardView();
  constructor({boardContainer, pointsModel}) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
  }

  init() {

    this.boardPoints = [...this.pointsModel.getPoints()];
    render(this.boardComponent, this.boardContainer);
    for (let i = 0; i < this.boardPoints.length; i++) {
      render(new PointView({point: this.boardPoints[i]}), this.boardComponent.getElement());
    }

    render(new EditFormView({point: this.boardPoints[0]}), this.boardComponent.getElement(), RenderPosition.AFTERBEGIN);
  }
}
