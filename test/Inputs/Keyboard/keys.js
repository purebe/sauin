import { Keys } from '../../../src/Inputs/Keyboard/keys';
import { Key } from '../../../src/Inputs/Keyboard/key';

const { assert } = require('chai');

describe('Keys', function() {
	describe('#constructor(null)', function() {
		it('should throw a `TypeError`', function() {
			assert.throws(() => { new Keys(null); });
		});
	});
	describe('#constructor()', function() {
		it('should not throw', function() {
			assert.doesNotThrow(() => { new Keys(); });
		});
	});
	describe('#constructor(Key.KeyW)', function() {
		it('should not throw', function() {
			assert.doesNotThrow(() => { new Keys(Key.KeyW); });
		});
	});
	describe('#constructor(new Keys())', function() {
		it('should not throw', function() {
			assert.doesNotThrow(() => { new Keys(new Keys()); });
		});
	});
	describe('#list()', function() {
		it('should return a flat array', function() {
			const keys = new Keys([Key.KeyA], [Key.KeyB]);
			assert.isTrue(
				keys
					.list()
					.every(key => !Array.isArray(key))
			);
		});
		it('should return an array of `VirtualKey`s', function() {
			const keys = new Keys(Key.KeyA, Key.KeyB);
			assert.isTrue(
				new Keys(keys)
					.list()
					.every(key => key === Key[key.code])
			);
		});
	});
	describe('new Keys(Key.KeyW)', function() {
		describe('#has(Key.KeyW)', function() {
			it('should return true', function() {
				const keys = new Keys(Key.KeyW);
				const [ key ] = keys.list();
				assert.strictEqual(key, Key.KeyW);
			});
		});
	});
	describe('#add(Key.KeyW)', function() {
		it('should contain `Key.KeyW` after', function() {
			const keys = new Keys();
			keys.add(Key.KeyW);
			assert.isTrue(keys.has(Key.KeyW));
		});
	});
	describe('#remove(Key.KeyW)', function() {
		it('should not contain Key.KeyW after', function() {
			const keys = new Keys(Key.KeyW);
			keys.remove(Key.KeyW);
			assert.isFalse(keys.has(Key.KeyW));
		});
	});
	describe('#clear()', function() {
		it('should not contain any keys after', function() {
			const keys = new Keys(Key.KeyW);
			keys.clear();
			assert.lengthOf(keys.list(), 0);
		});
	});
});
