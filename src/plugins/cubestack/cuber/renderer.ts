
import {Cuber} from '.'
import { WebGLRenderer } from 'three';
import Toucher from "../common/toucher";
import { COLORS } from '../cuber/define';
import Cube from './cube';
import { Pagecubes, RenderConfig } from './interface';
const CubeStageMask = require('./strip.json')
export default class CubeRenderer{
    public renderer: WebGLRenderer;
    public toucher: Toucher;
    cubename: string;
    cuber?: Cuber;
    el?: HTMLDivElement;
    canvas?: HTMLCanvasElement;
    coverimg?: HTMLImageElement;
    size?: number[];
    action?: string
    pagecubes?: Pagecubes = {};

    constructor(){
    }

    // 实例化一个魔方，生成缩略图
    addcube(renderconfig: RenderConfig,callback: Function){

        this.cubename = renderconfig.cubename
        this.cuber = new Cuber()
        this.el = renderconfig.el
        if(renderconfig.canvas){
            this.canvas = renderconfig.canvas
        }else{
            this.canvas =  document.createElement('canvas')
        }
        // 设置模板
        if(renderconfig.template){
            try{
                this.cuber.preferance.load(renderconfig.template) 
            } catch{
                this.cuber.preferance.load('playground') 
            }
        }
        // 修改细节配置
        if(renderconfig.preferance){
            try{
                for(let param in renderconfig.preferance){
                    this.cuber.preferance[param] = renderconfig.preferance[param]
                }
            }catch{

            }
        }

        // 创建renderer 和 toucher
        this.canvas.style.outline = 'none'
        this.renderer = new WebGLRenderer({
            canvas : this.canvas,
            antialias : true
        })
        this.renderer.autoClear = false
        this.renderer.setClearColor(COLORS.BACKGROUND)
        this.renderer.setPixelRatio(window.devicePixelRatio)

        this.toucher = new Toucher()
        this.toucher.init(this.canvas,this.cuber.controller.touch)
        this.el.appendChild(this.renderer.domElement);
        this.size = renderconfig.size ? renderconfig.size : [200,200]
        this.resize(this.size[0],this.size[1])

        if(this.cuber.preferance.order==3 && renderconfig.masktype){
            const strip = CubeStageMask[renderconfig.masktype].strip
            this.cuber.world.cube.strip(strip)
        }

        if(renderconfig.coverImgNotModel && renderconfig.alg){
            this.cuber.twister.finish();
            this.cuber.twister.twist("#");
            this.action = renderconfig.scene == "^" ? "(" + renderconfig.alg + ")'" : renderconfig.alg
            this.cuber.twister.twist(this.action, false, 1, true);
            this.cuber.history.clear();
        }
        
        // 绘制第一帧
        this.draw()
        // 根据渲染模型生成缩略图
        const content = this.renderer.domElement.toDataURL("image/png");


        if(renderconfig.coverImgNotModel){
            // 销毁和清除renderer
            this.renderer.dispose()
            this.renderer = null
             // 删除canvas 添加图片标签
            this.el.removeChild(this.canvas)
            this.canvas = null
            // this.canvas.style.display = 'none'
            this.coverimg = document.createElement('img')
            this.coverimg.style.objectFit = 'contain'
            this.coverimg.style.width = this.size[0] + 'px'
            this.coverimg.src = content
            this.el.appendChild(this.coverimg)
        }else{
            this.setoffset()
        }

        // 保存cube实例数据
        this.pagecubes[renderconfig.cubename] = {
            cubename: renderconfig.cubename,
            cuber: this.cuber,
            el: this.el,
            canvas: this.canvas,
            size: this.size,
            coverimg: this.coverimg,
            toucher: this.toucher,
            config: renderconfig
        }

        callback()
    }

    // 没有传参，表示直接用上文中的renderer，有传参就装载
    refreshCoverImage(cubename?: string){
        this.bind({cubename : cubename})
        this.unbind(cubename)
    }

    // 绑定并激活魔方，如果封面是图片就改为canvas，最后修正偏移
    bind(cube: {cubename?:string ,cuber?: Cuber, el?: HTMLDivElement, size?: number[]}){
        if(this.pagecubes[cube.cubename]){
            this.cubename = cube.cubename
            this.cuber = this.pagecubes[cube.cubename].cuber
            this.el = this.pagecubes[cube.cubename].el
            this.canvas = this.pagecubes[cube.cubename].canvas
            this.size = this.pagecubes[cube.cubename].size
            this.coverimg = this.pagecubes[cube.cubename].coverimg
            this.toucher = this.pagecubes[cube.cubename].toucher
        }else{
            null
            // 扩展给新建的实例对象
        }

        if(this.canvas){
            this.renderer = new WebGLRenderer({
                canvas : this.canvas,
                antialias : true
            })
            this.renderer.autoClear = false
            this.renderer.setClearColor(COLORS.BACKGROUND)
            this.renderer.setPixelRatio(window.devicePixelRatio)
            this.renderer.setPixelRatio(window.devicePixelRatio)
        }else{
            this.canvas =  document.createElement('canvas')
            this.canvas.style.outline = 'none'
            this.coverimg.style.display = 'none'
            this.renderer = new WebGLRenderer({
                canvas : this.canvas,
                antialias : true
            })
            this.renderer.autoClear = false
            this.renderer.setClearColor(COLORS.BACKGROUND)
            this.renderer.setPixelRatio(window.devicePixelRatio)
            this.renderer.setPixelRatio(window.devicePixelRatio)
            this.el.appendChild(this.renderer.domElement);
            // 保存canvas信息
            this.pagecubes[cube.cubename].canvas = this.canvas
            this.resize(this.size[0],this.size[1])
            this.toucher = new Toucher()
            this.toucher.init(this.canvas,this.cuber.controller.touch)
        }
        this.draw()
        this.setoffset(this.canvas)
        
    }

    // 解绑魔方
    unbind(cubename?:string ){
        // 只有首屏图片模式需要unbind
        if(this.pagecubes[cubename] && this.pagecubes[cubename].config.coverImgNotModel){

            // 因为刚从bind进入，所有各种资源都还没有释放
            this.draw()
            // 根据渲染模型生成缩略图
            const content = this.renderer.domElement.toDataURL("image/png");

            // 销毁和清除renderer
            this.renderer.dispose()
            this.renderer = null

            // 删除canvas 添加图片标签
            this.el.removeChild(this.canvas)
            this.canvas = null
            // 修改图片属性
            this.coverimg.style.display = ''
            this.coverimg.style.objectFit = 'contain'
            this.coverimg.src = content
            
            // 更新 cube实例信息
            this.pagecubes[cubename].canvas = null
            this.pagecubes[cubename].coverimg = this.coverimg
        }

    }

    resize(width: number, height: number) {
        this.cuber.world.width = width;
        this.cuber.world.height = height;
        this.cuber.world.resize();
        this.renderer.setSize(width, height, true);
        this.cuber.world.dirty = true;
    }

    setoffset(canvas: HTMLCanvasElement = this.canvas){
        this.toucher.setoffset(canvas)
    }

    draw() {
        if (this.cuber.world.dirty || this.cuber.world.cube.dirty) {
            this.renderer.clear();
            this.renderer.render(this.cuber.world.scene, this.cuber.world.camera);
            this.cuber.world.dirty = false;
            this.cuber.world.cube.dirty = false;
            return true;
        }
            return false;
        
    }
}



