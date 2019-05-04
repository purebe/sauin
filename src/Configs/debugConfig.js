import { Key } from '../Inputs/Keyboard/key';

const EventEmitter = require('events');

export class DebugConfig extends EventEmitter {
	/**
	 * @param {!number[]} [fps]
	 * @param {!number[]} [boundingBoxes]
	 * @param {!number[]} [wireframe]
	 * @param {!number[]} [noclip]
	 */
	constructor(fps = [Key.F1], boundingBoxes = [Key.F2], wireframe = [Key.F3], noclip = [Key.F4]) {
		this._fps = fps;
		this._boundingBoxes = boundingBoxes;
		this._wireframe = wireframe;
		this._noclip = noclip;
	}

	/**
	 * @param {?Object} [value]
	 * @returns {!boolean}
	 */
	static isNumber(value) {
		return typeof value === 'number' && !Number.isNaN(value);
	}

	/**
	 * @param {!number[]} [keys]
	 * @returns {!number[]}
	 */
	_validate(keys) {
		if (keys == null) {
			throw new Error(`Keys cannot be null or undefined!`);
		}
		if (!Array.isArray(keys)) {
			if (typeof keys === 'number' && !Number.isNaN(keys)) {
				return [keys];
			}
			throw new Error(`Keys must be a number!`);
		}
	}

	/**
	 * @param {!number[]} [fps]
	 */
	set fps(fps = []) {
	}

	/**
	 * @returns {!number[]}
	 */
	get fps() {
		return this.fps;
	}
};
