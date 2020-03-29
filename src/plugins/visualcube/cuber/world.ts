import cuber from ".";
import Cube from "./cube";
import Cubelet from "./cubelet";
import { Scene, PerspectiveCamera, AmbientLight, DirectionalLight } from "three";

export default class World {
  public width = 1;
  public height = 1;
  public dirty = false;

  public scene: Scene;
  public camera: PerspectiveCamera;

  public cube: Cube;

  public ambient: AmbientLight;
  public directional: DirectionalLight;

  private cubes: Cube[] = [];
  public callbacks: Function[] = [];

  set order(value: number) {
    this.scene.remove(this.cube);
    this.cube = this.cubes[value];
    this.scene.add(this.cube);
    this.dirty = true;
  }

  get order() {
    return this.cube.order;
  }

  constructor() {
    for (let order = 2; order < 8; order++) {
      this.cubes[order] = new Cube(order, this.callback);
    }
    this.cube = this.cubes[3];
    this.scene = new Scene();
    this.scene.rotation.x = Math.PI / 6;
    this.scene.rotation.y = -Math.PI / 4 + Math.PI / 16;
    this.scene.add(this.cube);

    this.ambient = new AmbientLight(0xffffff, 0.8);
    this.scene.add(this.ambient);
    this.directional = new DirectionalLight(0xffffff, 0.2);
    this.directional.position.set(Cubelet.SIZE, Cubelet.SIZE * 4, Cubelet.SIZE * 2);
    this.scene.add(this.directional);

    this.camera = new PerspectiveCamera(50, 1, 1, Cubelet.SIZE * 32);
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 0;
  }

  callback = () => {
    for (const callback of this.callbacks) {
      callback();
    }
    cuber.twister.update();
  };

  resize() {
    const scale = cuber.preferance.scale / 100 + 0.5;
    const perspective = (100.1 / (cuber.preferance.perspective + 0.01)) * 4 - 3;
    const min = this.height / Math.min(this.width, this.height) / scale / perspective;
    const fov = (2 * Math.atan(min) * 180) / Math.PI;

    this.camera.aspect = this.width / this.height;
    this.camera.fov = fov;
    const distance = Cubelet.SIZE * 3 * perspective;
    this.camera.position.z = distance;
    this.camera.near = distance - Cubelet.SIZE * 3;
    this.camera.far = distance + Cubelet.SIZE * 3;
    this.camera.lookAt(this.scene.position);
    this.camera.updateProjectionMatrix();
    this.dirty = true;
  }
}
