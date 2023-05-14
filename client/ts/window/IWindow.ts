/**
 * Interface representing a window on the screen
 */
export interface IWindow {
  /**
   * @returns position of this window
   */
  getWindowPosition(): [number, number];

  /**
   * Sets position of this window
   * @param pos - new position, offset from left
   */
  setWindowPosition(pos: [number, number]);
}