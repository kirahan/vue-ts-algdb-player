import Toucher from '../common/toucher';
import World from "./world";

export class PreferanceConfig{
    scale?: number
    perspective?: number
    angle?: number
    gradient?: number
    frames?: number
    sensitivity?: number
    mirror?: boolean
    hollow?: boolean
    shadow?: boolean

    constructor(){
        this.scale= 50
        this.perspective= 50
        this.angle= 63
        this.gradient= 67
        this.frames= 30
        this.sensitivity= 3
        this.mirror= false
        this.hollow= false
        this.shadow= true
    }
}

export class Playerconfig{
        autoplay?: boolean
        loop?: boolean
        hoverplay?: boolean
        lock?: boolean
        constructor(){
        this.autoplay = false,
        this.loop = false,
        this.hoverplay = true,
        this.lock = false
        }
}


export interface RenderConfig{
    order?: number,
    alg?: string
    scene?: string
    masktype?: string,
    size?: number[],
    template?: string,
    coverImgNotModel?: boolean,
    preferance?: PreferanceConfig
}

export interface CubeCongfig {
    cubename?: string,
    model?: string,
    renderModelName?: string,
    renderconfig?: RenderConfig,
    playerconfig?: Playerconfig
}






