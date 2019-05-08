import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { UniversalCamera } from '@babylonjs/core/Cameras/universalCamera';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { AdvancedDynamicTexture } from '@babylonjs/gui/2D';

import { CameraConfig } from './Configs/cameraConfig';
import { KeybindsConfig } from './Configs/keybindsConfig';
import { DebugConfig } from './Configs/debugConfig';
import { Level } from './Levels/level';
import { Player } from './Entities/player';
import { Rectangle } from './gui/rectangle';

function enablePointerLock() {
	this.requestPointerLock();
}

export class Game {
	/**
	 * @param {!HTMLCanvasElement} canvas
	 */
	constructor(canvas) {
		this.canvas = canvas;

		this.engine = new Engine(this.canvas, true, {
			deterministicLockstep: true,
			lockstepMaxSteps: 4
		}, false);

		//this.uiScale = 1024 / 1920;
		this.uiScale = 1;
		this.cameraConfig = new CameraConfig();
		this.keybindsConfig = new KeybindsConfig();
		this.debugConfig = new DebugConfig(this.engine, this.canvas, this.uiScale);

		/**
		 * @type {!Entities[]}
		 */
		this.entities = [];

		const player = new Player('player1', new Vector3(0.6, 2, 0.6));
		this.entities.push(player);

		/**
		 * @type {!Scene[]}
		 */
		this.scenes = [];

		this.uiScene = new Scene(this.engine);
		this.uiScene.autoClear = false;
		this.uiCamera = new UniversalCamera('uicamera', new Vector3(0, 0, -1), this.uiScene);
		this.uiCamera.setTarget(Vector3.Zero());
		this.ui = this.initializeGui();
		this.debugConfig.enable(this.uiScene, this.ui);
		this.updateConfig();
	}

	updateConfig() {
		if (this.cameraConfig.pointerLock) {
			this.canvas.addEventListener('click', enablePointerLock, true);
		} else {
			this.canvas.removeEventListener('click', enablePointerLock, true);
		}
	}


	start() {
		this.loadLevel();

		this.engine.runRenderLoop(() => {
			this.scenes.forEach(scene =>
				scene.render()
			);
			this.uiScene.render();
		});
	}

	/**
	 * @param {!Scene} scene
	 */
	addScene(scene) {
		this.scenes.push(scene);
	}

	/**
	 * @returns {?Player}
	 */
	getPlayer() {
		const player = this.entities.filter(e => e instanceof Player);
		return player.length > 0 ? player[0] : null;
	}

	/**
	 * @param {!string} name
	 */
	loadLevel(name) {
		const player = this.getPlayer();
		const level = new Level(this.engine, this.canvas, this.cameraConfig, this.keybindsConfig, player);
		this.addScene(level.scene);
	}

	/**
	 * @returns {!AdvancedDynamicTexture}
	 */
	initializeGui() {
		// TODO: Don't create a fullscreen ui, instead create small GUI textures for each part of the HUD
		//       and add them to the uiScene individually
		//const ui = AdvancedDynamicTexture.CreateFullscreenUI('UI', this.uiScene);
		const ui = new Rectangle('ui', {}, this.uiScene);
		//ui.idealWidth = 1920 * this.uiScale;
		//ui.renderAtIdealSize = true;
		return ui.adt;
	}
};
