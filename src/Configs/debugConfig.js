import { KeyCodes } from '../Inputs/Keyboard/keyCodes';

const EventEmitter = require('events');

export class DebugConfig extends EventEmitter {
	/**
	 * @param {!number[]} [fps]
	 * @param {!number[]} [boundingBoxes]
	 * @param {!number[]} [wireframe]
	 * @param {!number[]} [noclip]
	 */
	constructor(fps = [KeyCodes.F1], boundingBoxes = [KeyCodes.F2], wireframe = [KeyCodes.F3], noclip = [KeyCodes.F4]) {
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
