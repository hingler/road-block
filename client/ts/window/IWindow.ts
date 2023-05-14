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
  setWindowPosition(pos: [number, number]): void;


  /**
   * @returns size of this window
   */
  getWindowSize(): [number, number];

  /**
   * Sets size of this window
   * @param size - new size, X/Y from top left
   */
  setWindowSize(size: [number, number]): void;
}