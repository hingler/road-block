import { IWindow } from "../IWindow";
import { IWindowView } from "../IWindowView";
import { MouseDragTracker } from "./MouseDragTracker";

export class TileWindow implements IWindow {

  private windowElem: HTMLDivElement;
  private header: HTMLDivElement;
  private subwindowElem: HTMLDivElement;

  private windowPosition: [number, number] = [0, 0];

  private windowView: IWindowView;

  private dragTracker: MouseDragTracker;

  constructor(view: IWindowView) {
    this.windowView = view;
    this.createWindowElements();
    this.dragTracker = new MouseDragTracker(this.header, this);
  }

  getWindowPosition(): [number, number] {
    return [this.windowPosition[0], this.windowPosition[1]];
  }

  setWindowPosition(pos: [number, number]) {
    this.windowPosition[0] = pos[0];
    this.windowPosition[1] = pos[1];

    console.log(pos);
    console.log(this.windowPosition);

    // might be bad but whatever :3
    console.log("moving: " + pos);
    this.windowElem.style.left = pos[0] + "px";
    this.windowElem.style.top = pos[1] + "px";
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