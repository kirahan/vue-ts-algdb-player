<template>
    <div ref="cube" class="" style="text-align:center"
        @mouseenter="hoverin"
        @mouseleave="hoverout"
        ></div>
</template>


<script lang="ts">
import Vue from 'vue'
import { Component, Inject,Prop, Ref, Watch } from "vue-property-decorator";
import { WebGLRenderer } from "three";
import { COLORS } from "../../cuber/define";
import Toucher from "../../common/toucher";
import World from "../../cuber/world";
import Preferance from '../../cuber/preferance';
import { CubeCongfig , RenderConfig, Playerconfig} from '../../cuber/interfaces';
const CubeStageMask = require('../../cuber/strip.json')


@Component({name:'Render',components:{}})
export default class Render extends Vue{

    // @Inject('world')
    // 传入的cube
    @Prop()
    worldin: World

    // 配置信息
    @Prop()
    cubeconfig: CubeCongfig


    // 魔方大小
    @Prop()
    cubesize: number[]

    // 画布所在的div
    @Ref('cube')  canvasdiv: HTMLDivElement


    world: World
    // 渲染配置
    renderconfig: RenderConfig
    
    // 动画播放配置
    playerconfig: Playerconfig
    
    // 魔方主要参数
    preferance: Preferance;

    // 魔方名字
    cubename: string

    // 画布
    canvas: HTMLCanvasElement

    // 画布大小
    size: number[]

    //操控控制器
    toucher: Toucher

    //封面是否是图片
    CoverImgOn: boolean
    
    // 封面图片
    coverimg: HTMLImageElement
    
    // 动画action 
    action: string

    // 渲染器
    renderer: WebGLRenderer;

    // loop记录
    loop_id: number


    @Watch('cubesize')
    onSizeChange(){
        this.size = this.cubesize
        if(this.CoverImgOn){
            this.coverimg.style.width = `${this.size[0]}px`
        }else{  
            this.resize(this.size[0],this.size[1])
        }
    }

    constructor(){
        super()
        
        // 生成一个魔方
        this.world = this.worldin ? this.worldin : new World()
        this.renderconfig = this.cubeconfig.renderconfig

        // 保存主要配置
        this.size = this.cubesize ? this.cubesize : (this.renderconfig.size || [200,200])

        this.playerconfig = this.cubeconfig.playerconfig
        this.cubename = this.cubeconfig.cubename
        this.CoverImgOn = this.renderconfig.coverImgNotModel


        this.world.order = this.renderconfig.order || 3
        
        this.preferance = new Preferance(this.world)
        
        // 设置模板
        if(this.renderconfig.template){
            try{
                this.preferance.load(this.renderconfig.template) 
            } catch{
                this.preferance.refresh()
            }
        }
        // 修改细节配置
        if(this.renderconfig.preferance){
            try{
                for(let param in this.renderconfig.preferance){
                    this.preferance[param] = this.renderconfig.preferance[param]
                }
            }catch{}
        }

        // 设置遮罩层
        if(this.world.order==3 && this.renderconfig.masktype){
            const strip = CubeStageMask[this.renderconfig.masktype].strip
            this.world.cube.strip(strip)
        }

        // 设置初始action
        this.action = this.renderconfig.scene == "^" ? "(" + this.renderconfig.alg + ")'" : this.renderconfig.alg

        if(this.action){
            this.world.twister.finish();
            this.world.twister.twist("#");
            this.world.twister.twist(this.action, false, 1, true);
            this.world.cube.history.clear();
        }

        // 魔方是否锁定，用controler 不能用 cube
        this.world.controller.lock = this.playerconfig.lock

    }

    resize(width: number, height: number) {
            this.world.width = width;
            this.world.height = height;
            this.world.resize();
            this.renderer.setSize(width, height, true);
            // let view = this.canvasdiv;
            // if (view instanceof HTMLElement) {
            //     view.style.width = width + "px";
            //     view.style.height = height + "px";
            //     }
            this.world.dirty = true;
    }

    mounted() {
        // 初始化画布
        this.createrender()
        // 封面是否渲染为图片
        if(this.CoverImgOn){
            // 根据渲染模型生成缩略图
            const content = this.renderer.domElement.toDataURL("image/png");
            this.coverimg = document.createElement('img')
            this.coverimg.style.objectFit = 'contain'
            this.coverimg.style.width = this.size[0] + 'px'
            this.coverimg.src = content
            this.canvasdiv.appendChild(this.coverimg)
            this.removerender()
        }
        this.loop()
    }

    // 绘制一帧画面
    draw() {
        if (this.world.dirty || this.world.cube.dirty) {
        this.renderer.clear();
        this.renderer.render(this.world.scene, this.world.camera);
        this.world.dirty = false;
        this.world.cube.dirty = false;
        return true;
        }
        return false;
    }

    //  设置操控偏移
    setoffset(canvas: HTMLCanvasElement = this.canvas){
        this.toucher.setoffset(canvas)
    }


    createrender(){
         // 初始化画布
        this.canvas = document.createElement("canvas")
        this.canvas.style.outline = "none";
         // 初始化touch
        this.toucher = new Toucher();
        this.toucher.init(this.canvas, this.world.controller.touch);

        this.renderer = new WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });

        this.renderer.autoClear = false;
        this.renderer.setClearColor(COLORS.BACKGROUND);
        this.renderer.setPixelRatio(window.devicePixelRatio);

        // 画出canvas
        this.canvasdiv.appendChild(this.renderer.domElement)
        // 调整画布大小
        this.resize(this.size[0],this.size[1])
        // 画一帧
        this.draw()
        // 设置偏移
        this.setoffset()
    }

    removerender(){
        // 销毁和清除renderer
        this.renderer.clear()
        this.renderer.dispose()
        this.renderer = null

        // 删除canvas 添加图片标签
        this.canvasdiv.removeChild(this.canvas)
        this.canvas = null
    }

    hoverin(){
        if(this.CoverImgOn){
            // 生成render和重绘
            this.coverimg.style.display = 'none'
            this.createrender()
            // 清除图片
        }
        if(this.playerconfig.hoverplay){
                // // 添加回调函数
                // if(this.playerconfig.loop){
                //     // console.log('ininiini')
                //     this.world.callbacks.push(() => {
                //         // 魔方复原
                //         this.world.twister.twist("#");
                //         // 回到初始态
                //         this.world.twister.twist(this.action, false, 1, true);
                //         // 清除记录
                //         this.world.cube.history.clear();
                //         return
                //     });
                // }
                this.world.twister.twist(this.renderconfig.alg, false, 1, false);
        }
        this.loop()
    }

    hoverout(){
        // 重回起始状态
        if(this.playerconfig.hoverplay){
            // 快速结束
            this.world.twister.finish();
            // 魔方复原
            this.world.twister.twist("#");
            // 回到初始态
            this.world.twister.twist(this.action, false, 1, true);
            // 清除记录
            this.world.cube.history.clear();
        }

        if(this.CoverImgOn){
            // 绘制
            this.draw()
            // 根据渲染模型生成缩略图
            const content = this.renderer.domElement.toDataURL("image/png");
            // 移除render
            this.removerender()
            // 修改图片属性
            this.coverimg.style.display = ''
            this.coverimg.style.objectFit = 'contain'
            this.coverimg.src = content
        }
        cancelAnimationFrame(this.loop_id)
    }

    loop() {
        // 刷新
        this.loop_id = requestAnimationFrame(this.loop.bind(this));
        try{    
            this.world.cube.dirty = true;
            this.draw();
        }catch{
            cancelAnimationFrame(this.loop_id)
        }
        
    }

}


</script>



<style scoped>

</style>