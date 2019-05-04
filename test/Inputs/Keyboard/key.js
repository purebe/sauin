import { Key } from '../../../src/Inputs/Keyboard/key';

const { assert } = require('chai');

describe('Key', function() {
	describe('.isKey(null)', function() {
		it('should return false', function() {
			assert.isFalse(Key.isKey(null));
		});
	});
	describe('.isKey(Key.KeyW)', function() {
		it('should return true', function() {
			assert.isTrue(Key.isKey(Key.KeyW));
		});
	});
	describe('.equals(Key.KeyW, Key.KeyW)', function() {
		it('should return true', function() {
			assert.isTrue(Key.equals(Key.KeyW, Key.KeyW));
		});
	});
	describe('.equals(Key.KeyW, Key.KeyA)', function() {
		it('should return false', function() {
			assert.isFalse(Key.equals(Key.KeyW, Key.KeyA));
		});
	});
});
