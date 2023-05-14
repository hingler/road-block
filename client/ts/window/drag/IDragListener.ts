export interface IDragListener {

  /**
   * Called at start of drag
   */
  onDragStart(): void;

  /**
   * Fired when drag move
   * @param delta change in drag position
   */
  onDragMove(delta: [number, number]): void;
}