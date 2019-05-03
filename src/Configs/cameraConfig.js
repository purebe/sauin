export class CameraConfig {
	/**
	* @param {!number} [speed]
	* @param {!number} [fov] In degrees
	* @param {!number} [angularSens] Higher is lower sens
	* @param {!number} [interia] Non-zero values add camera smoothing
	* @param {!boolean} [pointerLock]
	*/
	constructor(speed = 4, fov = 75, angularSens = 400, interia = 0, pointerLock = true) {
		this.speed = speed;
		this.fov = fov * Math.PI / 180;
		this.interia = interia;
		this.angularSens = angularSens;
		this.pointerLock = pointerLock;
	}
};
