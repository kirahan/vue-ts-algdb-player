import {Cuber} from ".";


export class PreferanceConfigTemplate{
    order?: number
    scale?: number
    perspective?: number
    angle?: number
    gradient?: number
    brightness?: number
    frames?: number
    sensitivity?: number
    mirror?: boolean
    hollow?: boolean
    constructor(){
      this.order = 3
      this.scale= 50
      this.perspective= 50
      this.angle= 63
      this.gradient= 67
      this.brightness= 80
      this.frames= 30
      this.sensitivity= 50
      this.mirror= false
      this.hollow= false
    }
}

export class Playerconfig{
  enable?: boolean
  hide?: boolean
  alg?: string
  scene?: string
  autoplay?: boolean
  loop?: boolean
  hoverplay?: boolean
  speed?: string
  masktype?: string
  constructor(){
    this.enable = true,
    this.hide = false,
    this.alg = '',
    this.scene = '',
    this.autoplay = false,
    this.loop = false,
    this.hoverplay = true,
    this.speed = 'x1',
    this.masktype = ''
  }
}

export interface VCCongfig {
  name?: string,
  model?: string,
  size?: number[],
  lock?: boolean,
  cubeconfig?: PreferanceConfigTemplate,
  playerconfig?: Playerconfig
}

export default class Preferance {
  private storage = window.localStorage;
  cuber: Cuber
  constructor(cuber: Cuber) {
    this.cuber = cuber
  }

  public mode: string;
  data = {
    order: 3,
    scale: 50,
    perspective: 50,
    angle: 63,
    gradient: 67,
    brightness: 80,
    frames: 30,
    sensitivity: 50,
    mirror: false,
    hollow: false
  };

  load(mode: string) {
    this.mode = mode;
    let version = "0.0.4";
    if (this.storage.getItem("version") != version) {
      this.storage.clear();
      this.storage.setItem("version", version);
    }
    let save = this.storage.getItem(mode + "." + "preferance");
    if (save) {
      this.data = JSON.parse(save);
    }
    this.refresh();
  }

  save() {
    this.storage.setItem(this.mode + "." + "preferance", JSON.stringify(this.data));
  }

  refresh() {
    this.order = this.data.order;
    this.scale = this.data.scale;
    this.perspective = this.data.perspective;
    this.angle = this.data.angle;
    this.gradient = this.data.gradient;
    this.brightness = this.data.brightness;
    this.frames = this.data.frames;
    this.mirror = this.data.mirror;
    this.hollow = this.data.hollow;
  }

  get order() {
    return this.data.order;
  }
  set order(value) {
    if (this.data.order != value) {
      this.data.order = value;
      this.refresh();
      this.save();
    }
    this.cuber.world.order = value;
  }

  get scale() {
    return this.data.scale;
  }
  set scale(value) {
    if (this.data.scale != value) {
      this.data.scale = value;
      this.save();
    }
    this.cuber.world.resize();
  }

  get perspective() {
    return this.data.perspective;
  }
  set perspective(value) {
    if (this.data.perspective != value) {
      this.data.perspective = value;
      this.save();
    }
    this.cuber.world.resize();
  }

  get angle() {
    return this.data.angle;
  }
  set angle(value) {
    if (this.data.angle != value) {
      this.data.angle = value;
      this.save();
    }
    this.cuber.world.scene.rotation.y = ((value / 100 - 1) * Math.PI) / 2;
    this.cuber.world.dirty = true;
  }

  get gradient() {
    return this.data.gradient;
  }
  set gradient(value) {
    if (this.data.gradient != value) {
      this.data.gradient = value;
      this.save();
    }
    this.cuber.world.scene.rotation.x = ((1 - value / 100) * Math.PI) / 2;
    this.cuber.world.dirty = true;
  }

  get brightness() {
    return this.data.brightness;
  }
  set brightness(value) {
    if (this.data.brightness != value) {
      this.data.brightness = value;
      this.save();
    }
    let light = value / 100;
    this.cuber.world.ambient.intensity = light;
    let d = light / 2;
    if (d > 1 - light) {
      d = 1 - light;
    }
    this.cuber.world.directional.intensity = d;
    this.cuber.world.dirty = true;
  }

  get frames() {
    return this.data.frames;
  }
  set frames(value) {
    if (this.data.frames != value) {
      this.data.frames = value;
      this.save();
    }
  }

  get sensitivity() {
    return this.data.sensitivity;
  }
  set sensitivity(value) {
    if (this.data.sensitivity != value) {
      this.data.sensitivity = value;
      this.save();
    }
  }

  get mirror() {
    return this.data.mirror;
  }
  set mirror(value) {
    if (this.data.mirror != value) {
      this.data.mirror = value;
      this.save();
    }
    for (let cubelet of this.cuber.world.cube.cubelets) {
      cubelet.mirror = value;
    }
    this.cuber.world.dirty = true;
  }

  get hollow() {
    return this.data.hollow;
  }
  set hollow(value: boolean) {
    if (this.data.hollow != value) {
      this.data.hollow = value;
      this.save();
    }
    for (let cubelet of this.cuber.world.cube.cubelets) {
      cubelet.hollow = value;
    }
    this.cuber.world.dirty = true;
  }
}
