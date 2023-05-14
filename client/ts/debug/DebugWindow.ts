import { IWindowView } from "../window/IWindowView";

export class DebugWindow implements IWindowView {
  private root: HTMLElement;

  constructor() {
    this.root = document.createElement("div");
    this.root.style.color = "white";
    this.root.textContent = "this is a placeholder message :3 there's a lot that i could write about it and i'm not sure what would be good. what do you think i should do? any tips? advice? give me your suggestions";
  }

  getViewName(): string {
    return "hello";
  }  

  getRootElement(): HTMLElement {
    return this.root;
  }
}