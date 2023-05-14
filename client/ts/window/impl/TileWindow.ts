import { IWindow } from "../IWindow";
import { IWindowView } from "../IWindowView";
import { IDragListener } from "../drag/IDragListener";
import { MouseDragTrackerImpl } from "../drag/MouseDragTrackerImpl";
import { WindowPositionListener } from "./WindowPositionListener";
import { WindowResizeListener } from "./WindowResizeListener";

export class TileWindow implements IWindow {

  private windowElem: HTMLDivElement;
  private header: HTMLDivElement;
  private resizeHandle: HTMLDivElement;
  private subwindowElem: HTMLDivElement;

  private windowPosition: [number, number] = [0, 0];
  private windowSize: [number, number] = [0, 0];

  private windowView: IWindowView;

  private dragTracker: MouseDragTrackerImpl;
  private resizeTracker: MouseDragTrackerImpl;

  constructor(view: IWindowView) {
    this.windowView = view;
    this.createWindowElements();
    this.dragTracker = new MouseDragTrackerImpl(this.header, new WindowPositionListener(this));
    this.resizeTracker = new MouseDragTrackerImpl(this.resizeHandle, new WindowResizeListener(this));

    this.subwindowElem.appendChild(view.getRootElement());

    this.windowSize = [this.windowElem.clientWidth, this.windowElem.clientHeight];
  }

  getWindowPosition(): [number, number] {
    return [this.windowPosition[0], this.windowPosition[1]];
  }

  setWindowPosition(pos: [number, number]) {
    this.windowPosition[0] = pos[0];
    this.windowPosition[1] = pos[1];

    // might be bad but whatever :3
    console.log("moving: " + pos);
    this.windowElem.style.left = pos[0] + "px";
    this.windowElem.style.top = pos[1] + "px";
  }

  getWindowSize(): [number, number] {
    return [this.windowElem.clientWidth, this.windowElem.clientHeight];
  }

  setWindowSize(size: [number, number]) {
    this.windowElem.style.width = size[0] + "px";
    this.windowElem.style.height = size[1] + "px";
  }

  private createWindowElements() {
    // create root element for window
    // add listener to header elements (window doesn't need to know anything)
    this.windowElem = this.getElem("window");

    this.header = this.getElem("header");

    this.header.appendChild(this.getElem("window-close"));
    this.header.appendChild(this.getElem("bars-left"));

    let headerName = this.getElem("header-name");
    headerName.textContent = this.windowView.getViewName();
    this.header.appendChild(headerName);

    this.header.appendChild(this.getElem("bars-right"));
    this.header.appendChild(this.getElem("window-max"));

    this.windowElem.appendChild(this.header);

    let content = this.getElem("content");
    this.subwindowElem = this.getElem("subwindow");
    content.appendChild(this.subwindowElem);

    this.resizeHandle = this.getElem("resize-corner");
    content.appendChild(this.resizeHandle);

    this.windowElem.appendChild(content);

    document.body.appendChild(this.windowElem);
    this.setWindowPosition([0, 0]);
  }

  private getElem(className: string): HTMLDivElement {
    let elem = document.createElement("div");
    elem.classList.add(className);
    return elem;
  }
}