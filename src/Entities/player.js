export class Player {
	/**
	 * @param {!string} name
	 * @param {!Vector3} size
	 */
	constructor(name, size) {
		this.name = name;
		this.size = size;
		this.camera = null;
		this.hasGravity = true;
	}

	/**
	 * @returns {!string}
	 */
	getName() { return this.name; }

	/**
	 * @param {!PlayerCamera} camera
	 */
	setCamera(camera) {
		this.camera = camera;
		this.camera.ellipsoid = this.size;
		this.camera.checkCollisions = true;
		this.setGravity();
	}

	setGravity() {
		if (this.camera !== null) {
			this.camera.applyGravity = this.hasGravity;
		}
	}

	enableFlight() {
		this.hasGravity = false;
	}

	disableFlight() {
		this.hasGravity = true;
	}
};
