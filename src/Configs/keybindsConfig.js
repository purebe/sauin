import { KeyCodes } from '../Inputs/Keyboard/keyCodes';

export class KeybindsConfig {
	/**
	 * @param {!number[]} [up]
	 * @param {!number[]} [down]
	 * @param {!number[]} [left]
	 * @param {!number[]} [right]
	 * @param {!number[]} [run]
	 * @param {!number[]} [jump]
	 * @param {!number[]} [menu]
	 */
	constructor(
		up = [KeyCodes.W],
		down = [KeyCodes.S],
		left = [KeyCodes.A],
		right = [KeyCodes.D],
		run = [KeyCodes.Shift],
		jump = [KeyCodes.Space],
		menu = [KeyCodes.Esc]
	) {
		this.up = up;
		this.down = down;
		this.left = left;
		this.right = right;
		this.run = run;
		this.jump = jump;
		this.menu = menu;
	}
};
