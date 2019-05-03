import { Engine } from '@babylonjs/core/Engines/engine';
import { Scene } from '@babylonjs/core/scene';
import { Vector3 } from '@babylonjs/core/Maths/math';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { Mesh } from '@babylonjs/core/Meshes/mesh';

import { GridMaterial } from '@babylonjs/materials/grid';

import { CameraConfig } from './Configs/cameraConfig';
import { KeybindsConfig } from './Configs/keybindsConfig';
import { PlayerCamera } from './Cameras/playerCamera';

import '@babylonjs/core/Meshes/meshBuilder';
import '@babylonjs/core/Physics/physicsEngineComponent';
import '@babylonjs/core/Collisions/collisionCoordinator';

const Ammo = require('./libs/ammo.js');
import { AmmoJSPlugin } from '@babylonjs/core/Physics/Plugins/ammoJSPlugin';

const canvas = document.createElement('canvas');
canvas.id = 'renderCanvas';
canvas.style.touchAction = 'none';
document.body.append(canvas);

const engine = new Engine(canvas, true, {
	deterministicLockstep: true,
	lockstepMaxSteps: 4
});
const scene = new Scene(engine);
scene.gravity = new Vector3(0, -9.81, 0);
scene.enablePhysics(scene.gravity, new AmmoJSPlugin(false, Ammo));

const camera = new PlayerCamera('camera1', new Vector3(0, 5, -10), scene, new CameraConfig(), new KeybindsConfig());
camera.setTarget(Vector3.Zero());
camera.attachControl(canvas, true);
camera.applyGravity = true;
//Set the ellipsoid around the camera (e.g. your player's size)
camera.ellipsoid = new Vector3(1, 1, 1);
// Enable Collisions
scene.collisionsEnabled = true;
camera.checkCollisions = true;

const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
light.intensity = 0.7;

const material = new GridMaterial('grid', scene);
const sphere = Mesh.CreateSphere('sphere1', 16, 2, scene);
sphere.position.y = 2;
sphere.material = material;

const ground = Mesh.CreateGround('ground1', 60, 60, 2, scene);
ground.material = material;
ground.checkCollisions = true;

engine.runRenderLoop(() => {
	scene.render();
});
