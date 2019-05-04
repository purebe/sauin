import { KeyBind } from '../../../src/Inputs/Keyboard/keyBind';
import { Keys } from '../../../src/Inputs/Keyboard/keys';
import { Key } from '../../../src/Inputs/Keyboard/key';

const EventEmitter = require('events');
const { assert } = require('chai');

/**
 * @param {!string} eventName
 * @param {!VirtualKey} key
 * @returns {!KeyboardEvent}
 */
function createEvent(eventName, key) {
	return new KeyboardEvent(eventName, {
		code: key.code,
		keyCode: key.keyCode,
		view: window,
		bubbles: true,
		cancelable: true
	});
}

describe('KeyBind', function() {
	describe('#constructor(null)', function() {
		it('should throw', function() {
			assert.throws(() => { new KeyBind(null); });
		});
	});
	describe('#constructor(50)', function() {
		it('should throw', function() {
			assert.throws(() => { new KeyBind(50); });
		});
	});
	describe('#constructor(Key.KeyW)', function() {
		it('should not throw', function() {
			assert.doesNotThrow(() => { new KeyBind(Key.KeyW); });
		});
	});
	describe('#constructor([Key.KeyW])', function() {
		it('should not throw', function() {
			assert.doesNotThrow(() => { new KeyBind([Key.KeyW]); });
		});
	});
	describe('#constructor(new Keys())', function() {
		it('should not throw', function() {
			assert.doesNotThrow(() => { new KeyBind(new Keys()); });
		});
	});
	describe('#constructor(new Keys())', function() {
		it('should not throw', function() {
			assert.doesNotThrow(() => { new KeyBind([new Keys()]); });
		});
	});
	describe('#constructor([Key.KeyW, Key.KeyS])', function() {
		it('should set the keybinds to `Key.KeyW`, `Key.KeyS`', function() {
			const keyBind = new KeyBind([Key.KeyW, Key.KeyS]);

		});
	});
	describe('events', function() {
		it('should emit a keydown event when it receives a keydown event it is registered to', async function() {
			const kb = new KeyBind(Key.KeyW);
			const canvas = document.createElement('canvas');
			kb.register(canvas);
			const evt = createEvent('keydown', Key.KeyW);
			await new Promise(resolve => {
				kb.on('keydown', resolve);
				canvas.dispatchEvent(evt);
			});
		});
		it('should emit a keyup event when it receives a keyup event it is registered to', async function() {
			const kb = new KeyBind(Key.KeyW);
			const canvas = document.createElement('canvas');
			kb.register(canvas);
			const evt = createEvent('keyup', Key.KeyW);
			await new Promise(resolve => {
				kb.on('keyup', resolve);
				canvas.dispatchEvent(evt);
			});
		});
		it('should emit a keydown event on the given bus when it receives a keydown event it is registered to', async function() {
			const ee = new EventEmitter();
			const kb = new KeyBind(Key.KeyW);
			kb.pipe(ee);
			const canvas = document.createElement('canvas');
			kb.register(canvas);
			const evt = createEvent('keydown', Key.KeyW);
			await new Promise(resolve => {
				ee.on('keydown', resolve);
				canvas.dispatchEvent(evt);
			});
		});
		it('should emit a keyup event on the given bus when it receives a keyup event it is registered to', async function() {
			const ee = new EventEmitter();
			const kb = new KeyBind(Key.KeyW);
			kb.pipe(ee);
			const canvas = document.createElement('canvas');
			kb.register(canvas);
			const evt = createEvent('keyup', Key.KeyW);
			await new Promise(resolve => {
				ee.on('keyup', resolve);
				canvas.dispatchEvent(evt);
			});
		});
	});
});
