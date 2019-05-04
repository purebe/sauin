import { KeyBind } from '../../../src/Inputs/Keyboard/keyBind';

const EventEmitter = require('events');
const assert = require('assert');

/**
 * @param {!string} eventName
 * @param {!string} key
 * @returns {!KeyboardEvent}
 */
function createEvent(eventName, key) {
	return new KeyboardEvent(eventName, {
		key: key,
		view: window,
		bubbles: true,
		cancelable: true
	});
}

describe('KeyBind', function() {
	describe('#constructor()', function() {
		it('should throw when trying to bind null', function() {
			assert.throws(() => { new KeyBind(null); });
		});
		it('should throw when trying to bind a number', function() {
			assert.throws(() => { new KeyBind(50); });
		});
		it('should not throw when trying to bind a number', function() {
			assert.doesNotThrow(() => { new KeyBind('W'); });
		});
		it('should not throw when trying to bind an array of numbers', function() {
			assert.doesNotThrow(() => { new KeyBind(['W', 'S']); });
		});
		it('should set the keybinds to the given keys', function() {
			const kb = new KeyBind('W');
			assert.strictEqual(kb.keys[0], 'W');
		});
	});
	describe('events', function() {
		it('should emit a keydown event when it receives a keydown event it is registered to', async function() {
			const kb = new KeyBind('W');
			const canvas = document.createElement('canvas');
			kb.register(canvas);
			const evt = createEvent('keydown', 'W');
			await new Promise(resolve => {
				kb.on('keydown', resolve);
				canvas.dispatchEvent(evt);
			});
		});
		it('should emit a keyup event when it receives a keyup event it is registered to', async function() {
			const kb = new KeyBind('W');
			const canvas = document.createElement('canvas');
			kb.register(canvas);
			const evt = createEvent('keyup', 'W');
			await new Promise(resolve => {
				kb.on('keyup', resolve);
				canvas.dispatchEvent(evt);
			});
		});
		it('should emit a keydown event on the given bus when it receives a keydown event it is registered to', async function() {
			const ee = new EventEmitter();
			const kb = new KeyBind('W', ee);
			const canvas = document.createElement('canvas');
			kb.register(canvas);
			const evt = createEvent('keydown', 'W');
			await new Promise(resolve => {
				ee.on('keydown', resolve);
				canvas.dispatchEvent(evt);
			});
		});
		it('should emit a keyup event on the given bus when it receives a keyup event it is registered to', async function() {
			const ee = new EventEmitter();
			const kb = new KeyBind('W', ee);
			const canvas = document.createElement('canvas');
			kb.register(canvas);
			const evt = createEvent('keyup', 'W');
			await new Promise(resolve => {
				ee.on('keyup', resolve);
				canvas.dispatchEvent(evt);
			});
		});
	});
});
