import * as BABYLON from '@babylonjs/core';
import { Playground } from './animations_1';


const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
const engine = new BABYLON.Engine(canvas, true);
new Playground(engine, canvas);
export { }