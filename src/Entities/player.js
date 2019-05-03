import { Vector3 } from '@babylonjs/core/Maths/math';
import { PlayerCamera } from '../Cameras/playerCamera';

export class Player {
	/**
	 * @param {!string} name
	 * @param {!Vector3} position
	 * @param {!Vector3} lookAt
	 * @param {!Scene} scene
	 * @param {!HTMLCanvasElement} canvas
	 * @param {!CameraConfig} cameraConfig
	 * @param {!KeybindsConfig} keybindsConfig
	 */
	constructor(name, position, lookAt, scene, canvas, cameraConfig, keybindsConfig) {
		const camera = new PlayerCamera(`${name}-camera`, position, scene, canvas, cameraConfig, keybindsConfig);
		camera.setTarget(lookAt);
		camera.applyGravity = true;

		//Set the ellipsoid around the camera (e.g. your player's size)
		camera.ellipsoid = new Vector3(1, 1, 1);
		// Enable Collisions
		scene.collisionsEnabled = true;
		camera.checkCollisions = true;
	}
};
