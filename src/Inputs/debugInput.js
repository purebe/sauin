const EventEmitter = require('events');

export class DebugController extends EventEmitter {
	/**
	 * @param {!HTMLElement} element
	 * @param {!DebugConfig} debugConfig
	 */
	constructor(element, debugConfig) {
		this.element = element;
		this.debugConfig = debugConfig;

		this.fps = fps;
		this.boundingBoxes = boundingBoxes;
		this.wireframe = wireframe;
		this.noclip = noclip;
		this.element
	}
	//this.canvas.addEventListener('click', enablePointerLock, true);
};
