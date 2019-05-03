import { UniversalCamera } from '@babylonjs/core/Cameras/universalCamera';

export class PlayerCamera extends UniversalCamera {
	/**
	* @param {!string} name
	* @param {!Vector3} position
	* @param {!Scene} scene
	* @param {!HTMLCanvasElement} canvas
	* @param {!CameraConfig} cameraConfig
	* @param {!KeybindsConfig} keybindsConfig
	*/
	constructor(name, position, scene, canvas, cameraConfig, keybindsConfig) {
		super(name, position, scene);

		this.inputs.attached.keyboard.keysUp = keybindsConfig.up;
		this.inputs.attached.keyboard.keysDown = keybindsConfig.down;
		this.inputs.attached.keyboard.keysLeft = keybindsConfig.left;
		this.inputs.attached.keyboard.keysRight = keybindsConfig.right;

		this.speed = cameraConfig.speed;
		this.fov = cameraConfig.fov;
		this.inertia = cameraConfig.interia;
		this.angularSensibility = cameraConfig.angularSens;

		this.attachControl(canvas, true);
	}
};
