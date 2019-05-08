import { Scene } from '@babylonjs/core/scene';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { Mesh } from '@babylonjs/core/Meshes/mesh';

import { GridMaterial } from '@babylonjs/materials/grid';

import '@babylonjs/core/Physics/physicsEngineComponent';
import '@babylonjs/core/Collisions/collisionCoordinator';

import '@babylonjs/core/Meshes/meshBuilder';

const Ammo = require('../libs/ammo.js');
import { AmmoJSPlugin } from '@babylonjs/core/Physics/Plugins/ammoJSPlugin';

import { PlayerCamera } from '../Cameras/playerCamera';

export class Level {
	/**
	 * @param {!Engine} engine
	 * @param {!HTMLCanvasElement} canvas
	 * @param {!CameraConfig} cameraConfig
	 * @param {!KeybindsConfig} keybindsConfig
	 * @param {!Player} player
	 */
	constructor(engine, canvas, cameraConfig, keybindsConfig, player) {
		this.canvas = canvas;
		this.cameraConfig = cameraConfig;
		this.keybindsConfig = keybindsConfig;
		this.scene = new Scene(engine);
		this.scene.gravity = new Vector3(0, -9.81, 0);
		this.scene.enablePhysics(this.scene.gravity, new AmmoJSPlugin(false, Ammo));
		this.scene.collisionsEnabled = true;
		//this.scene.autoClear = false; // Color buffer
		//this.scene.autoClearDepthAndStencil = false; // Depth and stencil, obviously

		const light = new HemisphericLight('light1', new Vector3(0, 1, 0), this.scene);
		light.intensity = 0.7;

		const material = new GridMaterial('grid', this.scene);
		const sphere = Mesh.CreateSphere('sphere1', 16, 2, this.scene);
		sphere.position.y = 2;
		sphere.material = material;
		sphere.checkCollisions = true;

		const ground = Mesh.CreateGround('ground1', 60, 60, 2, this.scene);
		ground.material = material;
		ground.checkCollisions = true;

		this.addPlayer(player, new Vector3(0, 5, -10), Vector3.Zero());
	}

	/**
	 * @param {!Player} player
	 * @param {!Vector3} position
	 * @param {!Vector3} lookAt
	 */
	addPlayer(player, position, lookAt) {
		const camera = new PlayerCamera(`${player.getName()}-camera`, position, this.scene, this.canvas, this.cameraConfig, this.keybindsConfig);
		camera.setTarget(lookAt);
		player.setCamera(camera);
	}
};
