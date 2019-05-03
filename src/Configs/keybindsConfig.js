import { Keys } from '../Enums/keys';

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
		up = [Keys.W],
		down = [Keys.S],
		left = [Keys.A],
		right = [Keys.D],
		run = [Keys.Shift],
		jump = [Keys.Space],
		menu = [Keys.Esc]
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
