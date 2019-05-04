import { Key } from '../Inputs/Keyboard/key';
import { Keys } from '../Inputs/Keyboard/keys';

export class KeybindsConfig {
	constructor(
	) {
		this.up = new Keys(Key.KeyW);
		this.down = new Keys(Key.KeyS);
		this.left = new Keys(Key.KeyA);
		this.right = new Keys(Key.KeyD);
		this.run = new Keys(Key.ShiftLeft);
		this.jump = new Keys(Key.Space);
		this.menu = new Keys(Key.Escape);
	}
};
