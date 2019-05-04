import { Control } from '@babylonjs/gui/2D/controls/control';
import { Rectangle } from '@babylonjs/gui/2D/controls/rectangle';
import { TextBlock } from '@babylonjs/gui/2D/controls/textBlock';

import { Key } from '../Inputs/Keyboard/key';
import { KeyBind } from '../Inputs/Keyboard/keyBind';

export class DebugConfig {
	/**
	 * @param {!Engine} engine
	 * @param {!HTMLElement} element
	 */
	constructor(engine, element) {
		this.engine = engine;

		this.rect = new Rectangle();
		this.rect.adaptWidthToChildren = true;
		this.rect.height = "100px";
		this.rect.cornerRadius = 4;
		this.rect.color = 'orange';
		this.rect.background = '#00F1001A'; 
		this.rect.thickness = 1;
		this.rect.shadowColor = '#000';
		this.rect.shadowBlur = 2;
		this.rect.shadowOffsetX = 2;
		this.rect.shadowOffsetY = 2;
		this.rect.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
		this.rect.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
		this.rect.paddingRight = '30px';
		this.rect.paddingTop = '30px';

		this.fps = new KeyBind(Key.F6);
		this.fps.register(element);
		this.enableFps = false;
		this.fpsText = new TextBlock();
		this.fpsText.color = '#fff';
		this.fpsText.fontSize = 18;
		this.fpsText.width = '130px';
		this.fpsText.margin = '20px';

		this.boundingBoxes = new KeyBind(Key.F7);
		this.boundingBoxes.register(element);
		this.enableBoundingBoxes = false;

		this.wireframe = new KeyBind(Key.F8);
		this.wireframe.register(element);
		this.enableWireframe = false;

		this.noclip = new KeyBind(Key.F9);
		this.noclip.register(element);
		this.enableNoclip = false;

		/**
		 * @type {?AdvancedDynamicTexture}
		 */
		this.ui = null;

		this._update = this.update.bind(this);
	}

	update() {
		if (this.ui === null) {
			return;
		}

		if (this.fps.toggled && !this.enableFps) {
			this.enableFps = true;
			this.ui.addControl(this.rect);
			this.rect.addControl(this.fpsText);
		}
		if (!this.fps.toggled && this.enableFps) {
			this.enableFps = false;
			this.rect.removeControl(this.fpsText);
			this.ui.removeControl(this.rect);
		}
		if (this.fps.toggled) {
			this.fpsText.text = `${this.engine.getFps().toPrecision(4)} fps`;
		}

		if (this.boundingBoxes.pressed && !this.enableBoundingBoxes) {
			this.enableBoundingBoxes = true;
		}
		if (!this.boundingBoxes.pressed && this.enableBoundingBoxes) {
			this.enableBoundingBoxes = false;
		}

		if (this.wireframe.pressed && !this.enableWireframe) {
			this.enableWireframe = true;
		}
		if (!this.wireframe.pressed && this.enableWireframe) {
			this.enableWireframe = false;
		}

		if (this.noclip.pressed && !this.enableNoclip) {
			this.enableNoclip = true;
		}
		if (!this.noclip.pressed && this.enableNoclip) {
			this.enableNoclip = false;
		}
	}

	/**
	 * @param {!Scene} scene
	 * @param {!AdvancedDynamicTexture} ui
	 * @returns {!DebugConfig}
	 */
	enable(scene, ui) {
		this.ui = ui;
		scene.registerBeforeRender(this._update);
		return this;
	}
};
