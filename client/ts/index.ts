import { DebugWindow } from "./debug/DebugWindow";
import { TileWindow } from "./window/impl/TileWindow";

(function() {

  function main() {
    let view = new DebugWindow();
    let window = new TileWindow(view);
    console.log("testoid");
  }

  window.addEventListener("load", main);
  console.log("running");
})();