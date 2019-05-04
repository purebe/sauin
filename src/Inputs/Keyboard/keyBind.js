const EventEmitter = require('events');

export class KeyBind extends EventEmitter {
	/**
	 * @param {(!string|!string[])} keys
	 * @param {!EventEmitter} [bus]
	 * @param {!boolean} [preventDefault]
	 */
	constructor(keys = [], bus = null, preventDefault = true) {
		super();
		this.keys = keys;
		if (bus !== null) {
			this.on('keydown', evt => bus.emit('keydown', evt));
			this.on('keyup', evt => bus.emit('keyup', evt));
		}
		this.preventDefault = preventDefault;

		/**
		 * @type {?HTMLCanvasElement}
		 */
		this.canvas = null;

		this._keydown = this.onKeydown.bind(this);
		this._keyup = this.onKeyup.bind(this);
	}

	/**
	 * @param {(!string|!string[])} keys
	 */
	set keys(keys) {
		this._keys = [];
		this.add(keys);
	}

	/**
	 * @returns {!string[]}
	 */
	get keys() {
		return this._keys;
	}

	/**
	 * @param {(!number|!number[])} keys
	 */
	add(keys) {
		if (keys === null) {
			throw new Error(`Keys cannot be null!`);
		}
		if (!Array.isArray(keys)) {
			keys = [keys];
		}
		const validStrings = keys.every(key => typeof key === 'string');
		if (!validStrings) {
			throw new Error(`Each key must be a string!`);
		}
		keys.forEach(key => this._keys.push(key));
	}

	/**
	 * @param {!HTMLCanvasElement} canvas
	 */
	register(canvas) {
		canvas.addEventListener('keydown', this._keydown, false);
		canvas.addEventListener('keyup', this._keyup, false);
		this.canvas = canvas;
	}

	unregister() {
		if (this.canvas !== null) {
			this.canvas.removeEventListener('keydown', this._keydown, false);
			this.canvas.removeEventListener('keyup', this._keyup, false);
			this.canvas = null;
		}
	}

	/**
	 * @param {!string} eventName
	 * @param {!KeyboardEvent} evt
	 */
	emitKey(eventName, evt) {
		this.emit(eventName, evt);
		if (this.preventDefault) {
			evt.preventDefault();
		}
	}

	/**
	 * @param {!string} key
	 * @returns {!boolean}
	 */
	matches(key) {
		key = key.toLowerCase();
		return this._keys.some(key => key === key);
	}

	/**
	 * @param {!KeyboardEvent} evt
	 */
	onKeydown(evt) {
		if (this.matches(evt.key)) {
			this.emitKey('keydown', evt);
		}
	}

	/**
	 * @param {!KeyboardEvent} evt
	 */
	onKeyup(evt) {
		if (this.matches(evt.key)) {
			this.emitKey('keyup', evt);
		}
	}
};
