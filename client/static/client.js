/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/ts/debug/DebugWindow.ts":
/*!****************************************!*\
  !*** ./client/ts/debug/DebugWindow.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.DebugWindow = void 0;\nclass DebugWindow {\n    constructor() {\n        this.root = document.createElement(\"div\");\n    }\n    getViewName() {\n        return \"hello\";\n    }\n    getRootElement() {\n        return this.root;\n    }\n}\nexports.DebugWindow = DebugWindow;\n\n\n//# sourceURL=webpack://road-block/./client/ts/debug/DebugWindow.ts?");

/***/ }),

/***/ "./client/ts/index.ts":
/*!****************************!*\
  !*** ./client/ts/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst DebugWindow_1 = __webpack_require__(/*! ./debug/DebugWindow */ \"./client/ts/debug/DebugWindow.ts\");\nconst TileWindow_1 = __webpack_require__(/*! ./window/impl/TileWindow */ \"./client/ts/window/impl/TileWindow.ts\");\n(function () {\n    function main() {\n        let view = new DebugWindow_1.DebugWindow();\n        let window = new TileWindow_1.TileWindow(view);\n        console.log(\"testoid\");\n    }\n    window.addEventListener(\"load\", main);\n    console.log(\"running\");\n})();\n\n\n//# sourceURL=webpack://road-block/./client/ts/index.ts?");

/***/ }),

/***/ "./client/ts/window/impl/MouseDragTracker.ts":
/*!***************************************************!*\
  !*** ./client/ts/window/impl/MouseDragTracker.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.MouseDragTracker = void 0;\n/**\n * Tracks drags originating from `detector`,\n * and moves `root` correspondingly.\n */\nclass MouseDragTracker {\n    constructor(detector, root) {\n        this.detector = detector;\n        this.root = root;\n        this.detector.onpointerdown = this.startDrag.bind(this);\n        this.detector.onpointermove = null;\n        this.detector.onpointerup = this.endDrag.bind(this);\n    }\n    startDrag(ev) {\n        this.lastX = ev.screenX;\n        this.lastY = ev.screenY;\n        console.log(\"start drag: \" + this.lastX + \", \" + this.lastY);\n        this.detector.onpointermove = this.moveDrag.bind(this);\n        this.detector.setPointerCapture(ev.pointerId);\n    }\n    moveDrag(ev) {\n        let delta = [ev.screenX - this.lastX, ev.screenY - this.lastY];\n        let updatePosition = this.root.getWindowPosition();\n        console.log(\"new drag: \");\n        updatePosition[0] += delta[0];\n        updatePosition[1] += delta[1];\n        this.lastX = ev.screenX;\n        this.lastY = ev.screenY;\n        this.root.setWindowPosition(updatePosition);\n    }\n    endDrag(ev) {\n        console.log(\"end drag\");\n        this.detector.releasePointerCapture(ev.pointerId);\n        this.detector.onpointermove = null;\n    }\n}\nexports.MouseDragTracker = MouseDragTracker;\n\n\n//# sourceURL=webpack://road-block/./client/ts/window/impl/MouseDragTracker.ts?");

/***/ }),

/***/ "./client/ts/window/impl/TileWindow.ts":
/*!*********************************************!*\
  !*** ./client/ts/window/impl/TileWindow.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.TileWindow = void 0;\nconst MouseDragTracker_1 = __webpack_require__(/*! ./MouseDragTracker */ \"./client/ts/window/impl/MouseDragTracker.ts\");\nclass TileWindow {\n    constructor(view) {\n        this.windowPosition = [0, 0];\n        this.windowView = view;\n        this.createWindowElements();\n        this.dragTracker = new MouseDragTracker_1.MouseDragTracker(this.header, this);\n    }\n    getWindowPosition() {\n        return [this.windowPosition[0], this.windowPosition[1]];\n    }\n    setWindowPosition(pos) {\n        this.windowPosition[0] = pos[0];\n        this.windowPosition[1] = pos[1];\n        console.log(pos);\n        console.log(this.windowPosition);\n        // might be bad but whatever :3\n        console.log(\"moving: \" + pos);\n        this.windowElem.style.left = pos[0] + \"px\";\n        this.windowElem.style.top = pos[1] + \"px\";\n    }\n    createWindowElements() {\n        // create root element for window\n        // add listener to header elements (window doesn't need to know anything)\n        this.windowElem = this.getElem(\"window\");\n        this.header = this.getElem(\"header\");\n        this.header.appendChild(this.getElem(\"window-close\"));\n        this.header.appendChild(this.getElem(\"bars-left\"));\n        let headerName = this.getElem(\"header-name\");\n        headerName.textContent = this.windowView.getViewName();\n        this.header.appendChild(headerName);\n        this.header.appendChild(this.getElem(\"bars-right\"));\n        this.header.appendChild(this.getElem(\"window-max\"));\n        this.windowElem.appendChild(this.header);\n        let content = this.getElem(\"content\");\n        this.subwindowElem = this.getElem(\"subwindow\");\n        content.appendChild(this.subwindowElem);\n        this.windowElem.appendChild(content);\n        document.body.appendChild(this.windowElem);\n        this.setWindowPosition([0, 0]);\n    }\n    getElem(className) {\n        let elem = document.createElement(\"div\");\n        elem.classList.add(className);\n        return elem;\n    }\n}\nexports.TileWindow = TileWindow;\n\n\n//# sourceURL=webpack://road-block/./client/ts/window/impl/TileWindow.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./client/ts/index.ts");
/******/ 	
/******/ })()
;