import { Key } from '../Inputs/Keyboard/key';

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
		up = [Key.KeyW],
		down = [Key.KeyS],
		left = [Key.KeyA],
		right = [Key.KeyD],
		run = [Key.ShiftLeft],
		jump = [Key.Space],
		menu = [Key.Escape]
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
