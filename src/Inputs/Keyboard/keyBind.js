import { MKeys } from './keys';

const EventEmitter = require('events');

export class KeyBind extends MKeys(EventEmitter) {
	/**
	 * @param {(!VirtualKey|!VirtualKey[]|!MKeys|!MKeys[])} ...keys
	 */
	constructor(...keys) {
		super({vkeys: keys});
		this.preventsDefault = true;

		/**
		 * @type {?HTMLElement}
		 */
		this.element = null;

		this._keydown = this.onKeydown.bind(this);
		this._keyup = this.onKeyup.bind(this);
	}

	/**
	 * @param {!EventEmitter} bus
	 * @returns {!KeyBind}
	 */
	pipe(bus) {
		this.on('keydown', evt => bus.emit('keydown', evt));
		this.on('keyup', evt => bus.emit('keyup', evt));
		return this;
	}

	/**
	 * @param {!boolean} [preventDefault]
	 * @returns {!KeyBind}
	 */
	preventDefault(preventDefault = true) {
		this.preventsDefault = preventDefault;
		return this;
	}

	/**
	 * @param {!HTMLElement} element
	 * @returns {!KeyBind}
	 */
	register(element) {
		element.addEventListener('keydown', this._keydown, false);
		element.addEventListener('keyup', this._keyup, false);
		this.element = element;
		return this;
	}

	/**
	 * @returns {!KeyBind}
	 */
	unregister() {
		if (this.element !== null) {
			this.element.removeEventListener('keydown', this._keydown, false);
			this.element.removeEventListener('keyup', this._keyup, false);
			this.element = null;
		}
		return this;
	}

	/**
	 * @param {!string} eventName
	 * @param {!KeyboardEvent} evt
	 */
	emitKey(eventName, evt) {
		this.emit(eventName, evt);
		if (this.preventsDefault) {
			evt.preventDefault();
		}
	}

	/**
	 * @param {!KeyboardEvent} evt
	 */
	onKeydown(evt) {
		if (this.has(evt.code)) {
			this.emitKey('keydown', evt);
		}
	}

	/**
	 * @param {!KeyboardEvent} evt
	 */
	onKeyup(evt) {
		if (this.has(evt.code)) {
			this.emitKey('keyup', evt);
		}
	}
};
