import { Game } from './game';

const canvas = document.createElement('canvas');
canvas.id = 'renderCanvas';
canvas.style.touchAction = 'none';
document.body.append(canvas);

const game = new Game(canvas);
game.start();
