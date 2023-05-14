import { IWindowView } from "../window/IWindowView";

export class DebugWindow implements IWindowView {
  private root: HTMLElement;

  constructor() {
    this.root = document.createElement("div");
  }

  getViewName(): string {
    return "hello";
  }  

  getRootElement(): HTMLElement {
    return this.root;
  }
}