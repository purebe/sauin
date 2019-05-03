import { Engine } from '@babylonjs/core/Engines/engine';

import { CameraConfig } from './Configs/cameraConfig';
import { KeybindsConfig } from './Configs/keybindsConfig';
import { Level } from './Levels/level';

export class Game {
	/**
	 * @param {!HTMLCanvasElement} canvas
	 */
	constructor(canvas) {
		this.canvas = canvas;
		this.cameraConfig = new CameraConfig();
		this.keybindsConfig = new KeybindsConfig();

		this.engine = new Engine(canvas, true, {
			deterministicLockstep: true,
			lockstepMaxSteps: 4
		});

		/**
		 * @type {!Scene[]}
		 */
		this.scenes = [];
	}

	start() {
		this.loadLevel();

		this.engine.runRenderLoop(() => {
			this.scenes.forEach(scene =>
				scene.render()
			);
		});
	}

	/**
	 * @param {!Scene} scene
	 */
	addScene(scene) {
		this.scenes.push(scene);
	}

	/**
	 * @param {!string} name
	 */
	loadLevel(name) {
		const level = new Level(this.engine, this.canvas, this.cameraConfig, this.keybindsConfig);
		this.addScene(level.scene);
	}
};
