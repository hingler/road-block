/**
 * Interface representing a view which can be embedded in a window
 */
export interface IWindowView {
  /**
   * @returns the root element associated with this window view.
   */
  getRootElement(): HTMLElement;

  getViewName(): string
}