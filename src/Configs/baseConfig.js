const EventEmitter = require('events');

export class BaseConfig extends EventEmitter {
	constructor() {
		super();
		this.map = new Map();
	}

	/**
	 */
	addHotkey(key) {
	}
};
