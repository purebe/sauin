import { Key } from './key';

export const MKeys = Base => class extends Base {
	/**
	 * @param {?Object[]} ...args
	 * @param {(!VirtualKey|!VirtualKey[]|!MKeys|!MKeys[])} [args.vkeys]
	 */
	constructor(...args) {
		super(...args);
		this.keys = [];
		args
			.flatMap(arg => arg.vkeys)
			.filter(vkeys => vkeys !== undefined)
			.forEach(vkeys => this.add(vkeys));
	}

	/**
	 * @param {(!VirtualKey|!VirtualKey[]|!MKeys|!MKeys[])} ...keys
	 * @returns {!VirtualKey[]}
	 */
	flatten(...keys) {
		keys = keys
			.flat()
			.flatMap(key => typeof key.list === 'function' ? key.list() : key);
		if (keys.some(key => !(Key.isKey(key)))) {
			throw new TypeError(`Invalid key, missing code or keyCode!`);
		}
		return keys;
	}
	
	/**
	 * @returns {!VirtualKey[]}
	 */
	list() {
		return this.keys;
	}

	/**
	 * @param {(!VirtualKey|!string|!number)} key
	 * @returns {!boolean}
	 */
	has(key) {
		if (typeof key === 'string') {
			return this.keys.some(k => k.code === key);
		}
		if (typeof key === 'number') {
			return this.keys.some(k => k.keyCode === key);
		}
		return this.keys.some(k => Key.equals(k, key));
	}

	/**
	 * @param {(!VirtualKey|!VirtualKey[]|!MKeys|!MKeys[])} ...keys
	 */
	add(...keys) {
		this.flatten(...keys)
			.filter(key => !this.has(key))
			.forEach(key => this.keys.push(key));
	}

	/**
	 * @param {(!VirtualKey|!VirtualKey[]|!MKeys|!MKeys[])} ...keys
	 */
	remove(...keys) {
		keys = this.flatten(keys);
		this.keys = this.keys.filter(key =>
			keys.every(k => !Key.equals(k, key))
		);
	}

	clear() {
		this.keys = [];
	}
};

export class Keys extends MKeys(class {}) {
	/**
	 * @param {(!VirtualKey|!VirtualKey[]|!MKeys|!MKeys[])} ...keys
	 */
	constructor(...keys) {
		super({vkeys: keys});
	}
};
