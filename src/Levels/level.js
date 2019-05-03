import { Scene } from '@babylonjs/core/scene';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { Mesh } from '@babylonjs/core/Meshes/mesh';

import { GridMaterial } from '@babylonjs/materials/grid';

import { Player } from '../Entities/player';

import '@babylonjs/core/Physics/physicsEngineComponent';
import '@babylonjs/core/Collisions/collisionCoordinator';

import '@babylonjs/core/Meshes/meshBuilder';

const Ammo = require('../libs/ammo.js');
import { AmmoJSPlugin } from '@babylonjs/core/Physics/Plugins/ammoJSPlugin';

export class Level {
	/**
	 * @param {!Engine} engine
	 * @param {!HTMLCanvasElement} canvas
	 * @param {!CameraConfig} cameraConfig
	 * @param {!KeybindsConfig} keybindsConfig
	 */
	constructor(engine, canvas, cameraConfig, keybindsConfig) {
		this.scene = new Scene(engine);
		this.scene.gravity = new Vector3(0, -9.81, 0);
		this.scene.enablePhysics(this.scene.gravity, new AmmoJSPlugin(false, Ammo));

		const player = new Player('player1', new Vector3(0, 5, -10), Vector3.Zero(), this.scene, canvas, cameraConfig, keybindsConfig);

		const light = new HemisphericLight('light1', new Vector3(0, 1, 0), this.scene);
		light.intensity = 0.7;

		const material = new GridMaterial('grid', this.scene);
		const sphere = Mesh.CreateSphere('sphere1', 16, 2, this.scene);
		sphere.position.y = 2;
		sphere.material = material;

		const ground = Mesh.CreateGround('ground1', 60, 60, 2, this.scene);
		ground.material = material;
		ground.checkCollisions = true;
	}
};


