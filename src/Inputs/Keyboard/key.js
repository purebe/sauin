class VirtualKey {
	/**
	 * @param {!string} code -> KeyboardEvent.code
	 * @param {!number} keyCode -> KeyboardEvent.keyCode
	 */
	constructor(code, keyCode) {
		this.code = code;
		this.keyCode = keyCode;
	}
}

// From https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
const keys = [
	new VirtualKey('Digit1', 49),
	new VirtualKey('Digit2', 50),
	new VirtualKey('Digit3', 51),
	new VirtualKey('Digit4', 52),
	new VirtualKey('Digit5', 53),
	new VirtualKey('Digit6', 54),
	new VirtualKey('Digit7', 55),
	new VirtualKey('Digit8', 56),
	new VirtualKey('Digit9', 57),
	new VirtualKey('Digit0', 48),

	new VirtualKey('KeyA', 65),
	new VirtualKey('KeyB', 66),
	new VirtualKey('KeyC', 67),
	new VirtualKey('KeyD', 68),
	new VirtualKey('KeyE', 69),
	new VirtualKey('KeyF', 70),
	new VirtualKey('KeyG', 71),
	new VirtualKey('KeyH', 72),
	new VirtualKey('KeyI', 73),
	new VirtualKey('KeyJ', 74),
	new VirtualKey('KeyK', 75),
	new VirtualKey('KeyL', 76),
	new VirtualKey('KeyM', 77),
	new VirtualKey('KeyN', 78),
	new VirtualKey('KeyO', 79),
	new VirtualKey('KeyP', 80),
	new VirtualKey('KeyQ', 81),
	new VirtualKey('KeyR', 82),
	new VirtualKey('KeyS', 83),
	new VirtualKey('KeyT', 84),
	new VirtualKey('KeyU', 85),
	new VirtualKey('KeyV', 86),
	new VirtualKey('KeyW', 87),
	new VirtualKey('KeyX', 88),
	new VirtualKey('KeyY', 89),
	new VirtualKey('KeyZ', 90),

	new VirtualKey('Comma', 188),
	new VirtualKey('Period', 190),
	new VirtualKey('Semicolon', 186),
	new VirtualKey('Quote', 222),
	new VirtualKey('BracketLeft', 219),
	new VirtualKey('BracketRight', 221),
	new VirtualKey('Backquote', 192),
	new VirtualKey('Backslash', 220),
	new VirtualKey('Minus', 189),
	new VirtualKey('Equal', 187),
	new VirtualKey('IntlRo', 193),
	new VirtualKey('IntlYen', 255),

	new VirtualKey('AltLeft', 18),
	new VirtualKey('AltRight', 18),
	new VirtualKey('CapsLock', 20),
	new VirtualKey('ControlLeft', 17),
	new VirtualKey('ControlRight', 17),
	new VirtualKey('OSLeft', 91),
	new VirtualKey('OSRight', 92),
	new VirtualKey('ShiftLeft', 16),
	new VirtualKey('ShiftRight', 16),

	new VirtualKey('ContextMenu', 93),
	new VirtualKey('Enter', 13),
	new VirtualKey('Space', 32),
	new VirtualKey('Tab', 9),
	new VirtualKey('Delete', 46),
	new VirtualKey('End', 35),
	new VirtualKey('Home', 36),
	new VirtualKey('Insert', 45),
	new VirtualKey('PageDown', 34),
	new VirtualKey('PageUp', 33),
	new VirtualKey('ArrowDown', 40),
	new VirtualKey('ArrowLeft', 37),
	new VirtualKey('ArrowRight', 39),
	new VirtualKey('ArrowUp', 38),
	new VirtualKey('Escape', 27),
	new VirtualKey('PrintScreen', 44),
	new VirtualKey('ScrollLock', 145),
	new VirtualKey('Pause', 19),

	new VirtualKey('F1', 112),
	new VirtualKey('F2', 113),
	new VirtualKey('F3', 114),
	new VirtualKey('F4', 115),
	new VirtualKey('F5', 116),
	new VirtualKey('F6', 117),
	new VirtualKey('F7', 118),
	new VirtualKey('F8', 119),
	new VirtualKey('F9', 120),
	new VirtualKey('F10', 121),
	new VirtualKey('F11', 122),
	new VirtualKey('F12', 123),
	new VirtualKey('F13', 124),
	new VirtualKey('F14', 125),
	new VirtualKey('F15', 126),
	new VirtualKey('F16', 127),
	new VirtualKey('F17', 128),
	new VirtualKey('F18', 129),
	new VirtualKey('F19', 130),
	new VirtualKey('F20', 131),
	new VirtualKey('F21', 132),
	new VirtualKey('F22', 133),
	new VirtualKey('F23', 134),
	new VirtualKey('F24', 135),

	new VirtualKey('NumLock', 144),
	new VirtualKey('Numpad0', 96),
	new VirtualKey('Numpad1', 97),
	new VirtualKey('Numpad2', 98),
	new VirtualKey('Numpad3', 99),
	new VirtualKey('Numpad4', 100),
	new VirtualKey('Numpad5', 101),
	new VirtualKey('Numpad6', 102),
	new VirtualKey('Numpad7', 103),
	new VirtualKey('Numpad8', 104),
	new VirtualKey('Numpad9', 105),
	new VirtualKey('NumpadAdd', 107),
	new VirtualKey('NumpadComma', 194),
	new VirtualKey('NumpadDecimal', 110),
	new VirtualKey('NumpadDivide', 111),
	new VirtualKey('NumpadEnter', 13),
	new VirtualKey('NumpadEqual', 12),
	new VirtualKey('NumpadMultiply', 106),
	new VirtualKey('NumpadSubtract', 109)
];

export const Key = {};
keys.forEach(key => { Key[key.code] = key; });

/**
 * @param {?Object} key
 * @returns {!boolean}
 */
Key.isKey = key => {
	if (key == null) {
		return false;
	}
	return typeof key.code === 'string' && typeof key.keyCode === 'number';
};

/**
 * @param {!VirtualKey} a
 * @param {!VirtualKey} b
 * @returns {!boolean}
 */
Key.equals = (a, b) => {
	return a.code === b.code && a.keyCode === b.keyCode;
};
