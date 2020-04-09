import Toucher from '../common/toucher';
import World from "./world";


export class PreferanceConfig{
    version?: string 
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
        this.version = '0.1'
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
        breath?: boolean
        autorotate?: boolean
        constructor(){
        this.autoplay = false,
        this.loop = false,
        this.hoverplay = true,
        this.lock = false
        this.breath = false
        this.autorotate = false
        }
}


export interface RenderConfig{
    order?: number,
    alg?: string
    scene?: string
    masktype?: string,
    size?: number[],
    coverImgNotModel?: boolean,
}


export interface Colors{
    R?: string
    L?: string,
    U?: string,
    D?: string,
    F?: string,
    B?: string,
    Core?: string,
    High?: string,
    Gray?: string
}

export interface Themeconfig{
    version?: string 
    dark?: boolean
    colors?: Colors
}

export interface CubeCongfig {
    cubename?: string,
    model?: string,
    renderModelName?: string,
    renderconfig?: RenderConfig,
    preferanceModelName?: string,
    preferanceconfig?: PreferanceConfig,
    playerconfig?: Playerconfig,
    themeModelName?: string,
    themeconfig?: Themeconfig
}






