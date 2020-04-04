import { Cuber } from '.';
import Toucher from '../common/toucher';
import CubeRenderer from './renderer';

export class PreferanceConfig{
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
    autoplay?: boolean
    loop?: boolean
    hoverplay?: boolean
    speed?: string
    constructor(){
      this.enable = true,
      this.hide = false,
      this.autoplay = false,
      this.loop = false,
      this.hoverplay = true,
      this.speed = 'x1'
    }
}


export interface RenderConfig{
    cubename: string,
    alg?: string
    scene?: string
    masktype?: string,
    refname?: string,
    el?: HTMLDivElement,
    canvas?: HTMLCanvasElement,
    size?: number[],
    template?: string,
    coverImgNotModel?: boolean,
    preferance?: PreferanceConfig
}

export interface Pagecubes {
    [key: string]: {
        cubename: string;
        cuber: Cuber,
        el: HTMLDivElement,
        canvas?: HTMLCanvasElement,
        size: number[],
        coverimg?: HTMLImageElement;
        toucher: Toucher;
        config: RenderConfig;
    }
}

export interface CubeRendererInstance{
    (config: object): CubeRenderer;
    cubename?: string;
    cuber?: Cuber;
    el?: HTMLDivElement;
    canvas?: HTMLCanvasElement;
    pagecubes?: Pagecubes
    addcube(cubeconfig: RenderConfig,callback: Function): void;
    bind(cube: {cubename?:string ,cuber?: Cuber, el?: HTMLDivElement, size?: number[]}): void;
    unbind(cubename:string): void;
    refreshCoverImage(cubename:string): void;
    resize(width: number,height: number): void;
    setoffset(canvas?: HTMLCanvasElement): void;
    draw(): void;
}

export interface CubeCongfig {
    name?: string,
    model?: string,
    renderModelName?: string,
    playerModelName?: string,
    lock?: boolean,
    renderconfig?: RenderConfig,
    playerconfig?: Playerconfig
}