import { IWindow } from "../IWindow";

/**
 * Tracks drags originating from `detector`,
 * and moves `root` correspondingly.
 */
export class MouseDragTracker {
  private detector: HTMLElement;
  private root: IWindow;

  private lastX: number;
  private lastY: number;

  constructor(detector: HTMLElement, root: IWindow) {
    this.detector = detector;
    this.root = root;
    this.detector.onpointerdown = this.startDrag.bind(this);
    this.detector.onpointermove = null;
    this.detector.onpointerup = this.endDrag.bind(this);
  }

  startDrag(ev: PointerEvent) {
    this.lastX = ev.screenX;
    this.lastY = ev.screenY;
    console.log("start drag: " + this.lastX + ", " + this.lastY);
    this.detector.onpointermove = this.moveDrag.bind(this);
    this.detector.setPointerCapture(ev.pointerId);
  }
  
  moveDrag(ev: PointerEvent) {
    let delta: [number, number] = [ev.screenX - this.lastX, ev.screenY - this.lastY];
    let updatePosition = this.root.getWindowPosition();
    console.log("new drag: ")
    updatePosition[0] += delta[0];
    updatePosition[1] += delta[1];
    this.lastX = ev.screenX;
    this.lastY = ev.screenY;
    this.root.setWindowPosition(updatePosition);
  }

  endDrag(ev: PointerEvent) {
    console.log("end drag");
    this.detector.releasePointerCapture(ev.pointerId);
    this.detector.onpointermove = null;
  }
}