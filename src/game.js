import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { AdvancedDynamicTexture } from '@babylonjs/gui/2D';

import { CameraConfig } from './Configs/cameraConfig';
import { KeybindsConfig } from './Configs/keybindsConfig';
import { DebugConfig } from './Configs/debugConfig';
import { Level } from './Levels/level';
import { Player } from './Entities/player';

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
		});

		this.cameraConfig = new CameraConfig();
		this.keybindsConfig = new KeybindsConfig();
		this.debugConfig = new DebugConfig(this.engine, this.canvas);

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
		this.uiCamera = new ArcRotateCamera('uicamera', 0, 0.8, 100, Vector3.Zero(), this.uiScene);
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
	 * @returns {!Scene}
	 */
	initializeGui() {
		return AdvancedDynamicTexture.CreateFullscreenUI('UI', this.uiScene);
	}
};
