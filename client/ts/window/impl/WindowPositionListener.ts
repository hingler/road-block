import { IWindow } from "../IWindow";
import { IDragListener } from '../drag/IDragListener';

export class WindowPositionListener implements IDragListener {
  private elementWindow: IWindow;
  
  constructor(elementWindow: IWindow) {
    this.elementWindow = elementWindow;
  }

  onDragStart(): void {
    // no op
  }

  onDragMove(delta: [number, number]): void {
    let oldPos = this.elementWindow.getWindowPosition();
    oldPos[0] += delta[0];
    oldPos[1] += delta[1];
    this.elementWindow.setWindowPosition(oldPos);
  }
}