import { IWindow } from "../IWindow";
import { IDragListener } from "../drag/IDragListener";

export class WindowResizeListener implements IDragListener {
  private elementWindow: IWindow;

  static MIN_WINDOW_SIZE: [number, number] = [180, 180];

  private trackSize: [number, number]

  constructor(elementWindow: IWindow) {
    this.elementWindow = elementWindow;
  }

  onDragStart(): void {
    this.trackSize = this.elementWindow.getWindowSize();
  }
  
  onDragMove(delta: [number, number]): void {
    let oldSize = this.elementWindow.getWindowSize();
    this.trackSize[0] += delta[0];
    this.trackSize[1] += delta[1];
    this.elementWindow.setWindowSize([
      Math.max(this.trackSize[0], WindowResizeListener.MIN_WINDOW_SIZE[0]),
      Math.max(this.trackSize[1], WindowResizeListener.MIN_WINDOW_SIZE[1])
    ]);
  }

}