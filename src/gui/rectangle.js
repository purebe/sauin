import { PlaneBuilder } from '@babylonjs/core/Meshes/Builders/planeBuilder';

import { AdvancedDynamicTexture } from '@babylonjs/gui/2D';
import { Vector3 } from '@babylonjs/core/Maths/math';

export class Rectangle {
	/**
	 * @param {!string} name
	 * @param {!Object} options
	 * @param {!number} [options.width]
	 * @param {!number} [options.height]
	 * @param {!number} [options.resX]
	 * @param {!number} [options.resY]
	 * @param {!Scene} scene
	 */
	constructor(name, options = { width: 1, height: 1, resX: 128, resY: 128 }, scene) {
		this.mesh = PlaneBuilder.CreatePlane(name, { width: options.width, height: options.height }, scene);
		this.mesh.position.y = -0.1;
		this.adt = AdvancedDynamicTexture.CreateForMesh(this.mesh, options.resX, options.resY, scene);
	}
};
