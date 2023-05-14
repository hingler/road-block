import { IWindow } from "../IWindow";
import { IDragListener } from "./IDragListener";

/**
 * Tracks drags originating from `detector`,
 * and moves `root` correspondingly.
 */
export class MouseDragTrackerImpl {
  private detector: HTMLElement;
  private listener: IDragListener;

  private lastX: number;
  private lastY: number;

  constructor(detector: HTMLElement, listener: IDragListener) {
    this.detector = detector;
    this.listener = listener;
    this.detector.onpointerdown = this.startDrag.bind(this);
    this.detector.onpointermove = null;
    this.detector.onpointerup = this.endDrag.bind(this);
  }

  startDrag(ev: PointerEvent) {
    this.lastX = ev.screenX;
    this.lastY = ev.screenY;
    this.detector.onpointermove = this.moveDrag.bind(this);
    this.detector.setPointerCapture(ev.pointerId);
    this.listener.onDragStart();
  }
  
  moveDrag(ev: PointerEvent) {
    let delta: [number, number] = [ev.screenX - this.lastX, ev.screenY - this.lastY];
    this.lastX = ev.screenX;
    this.lastY = ev.screenY;
    this.listener.onDragMove(delta);
  }

  endDrag(ev: PointerEvent) {
    this.detector.releasePointerCapture(ev.pointerId);
    this.detector.onpointermove = null;
  }
}