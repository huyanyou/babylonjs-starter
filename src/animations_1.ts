import * as BABYLON from '@babylonjs/core';

const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
const engine = new BABYLON.Engine(canvas, true);
export class Playground {
    private _scene: BABYLON.Scene;
    private _camera: BABYLON.ArcRotateCamera;
    private _light1: BABYLON.DirectionalLight;
    private _light2: BABYLON.HemisphericLight;
    private _box: BABYLON.Mesh;
    private xSlide: BABYLON.Animation;
    constructor(engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
        this._scene = new BABYLON.Scene(engine);
        this._camera = new BABYLON.ArcRotateCamera("Camera", - Math.PI / 2, Math.PI / 4, 10, BABYLON.Vector3.Zero());
        this._camera.attachControl(canvas, true);
        this._light1 = new BABYLON.DirectionalLight("DirectionalLight", new BABYLON.Vector3(0, -1, 1), this._scene);
        this._light2 = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), this._scene);
        this._light1.intensity = 0.75;
        this._light2.intensity = 0.5;
        this._box = BABYLON.MeshBuilder.CreateBox("box", {});
        this._box.position.x = 2;
        const frameRate = 10;
        this.xSlide = new BABYLON.Animation("xSlide", "position.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        this.setAnimation(frameRate)
        console.log(this._box.animations);
        engine.runRenderLoop(() => {
            // 渲染
            this._scene.render();
        })
    }

    public setAnimation(frameRate: number) {
        // const frameRate = 10;

        const keyFrames = [];
        keyFrames.push({
            frame: 0,
            value: 2
        });
        keyFrames.push({
            frame: frameRate,
            value: -2
        });
        keyFrames.push({
            frame: 2 * frameRate,
            value: 2
        });
        this.xSlide.setKeys(keyFrames);
        this._box.animations.push(this.xSlide);
        this._scene.beginAnimation(this._box, 0, 2 * frameRate, true);
    }

}

new Playground(engine, canvas);
