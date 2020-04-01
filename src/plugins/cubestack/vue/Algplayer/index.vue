<template>
    <v-sheet 
        elevation-10
        color="white lighten-1"
        class="visualcube"
        :style="VCwidth"
        @mouseenter="hoverin"
        @mouseleave="hoverout"
        >
        <Viewport ref="viewport"></Viewport>
        <player 
        v-if="config.playerconfig.enable" 
        :style="playerhide"  
        :cuber='cuber' 
        :autoplay='config.playerconfig.autoplay'
        :loop='config.playerconfig.loop'
        ref="player" 
            ></player>
    </v-sheet >
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component, Watch, Prop, Ref } from "vue-property-decorator";
    import '../../index.css'

    import Viewport from "../Viewport/index.vue";
    import Player from "../Player/index.vue";
    import Preferance, {PreferanceConfigTemplate,Playerconfig,VCCongfig} from "../../cuber/preferance";
    import {Cuber} from '../../cuber'

    @Component({
    name:'VisualCube',
    components: {Viewport,Player}
    })
    export default class VisualCube extends Vue {

    CubeStageMask = require('./strip.json')
    width = 200
    height = 200
    size = 0;
    preferance: Preferance;
    VCwidth: string = ''
    cuber: Cuber;
    r_id: number = 0

    @Prop()
    config: VCCongfig

    @Prop()
    cubesize: number[]

    // 保存魔方实例
    @Ref('viewport') viewport!: Viewport 
    @Ref('player') player!: Player 


    get playerhide(){
        if(this.config.playerconfig.hide){
            return 'display:none'
        }else{
            return ''
        }
    }

    constructor() {
        super();
    }

    resize(widthandheight: number[]) {
        this.width = widthandheight[0]
        this.height = widthandheight[1]
        this.size = Math.ceil(Math.min(this.width / 6, this.height / 12)) * 0.95;
        this.viewport?.resize(this.width, this.height - this.size * 1.5);
        this.player?.resize(this.size);
        this.viewport?.setoffset(this.$refs.viewport['$el'])
    }

    mounted() {
        // 保存实例
        this.cuber = this.viewport.cuber
        // 保存配置
        this.preferance = this.viewport.cuber.preferance;
        // 先载入localstorage中的模式
        try{
            this.viewport.cuber.preferance.load(this.config.model);
        }catch{
            this.viewport.cuber.preferance.load("playground");
        }
        // 再载入填入在cubeconfig中的配置参数
        try{
            for( let param in this.config['cubeconfig']){
                this.preferance[param] = this.config['cubeconfig'][param]
            }
        }catch{
            null
        }
        
        
        // 计算viewport画布大小
        if(this.resize){
            this.resize(this.cubesize)
        }else if(this.config.size){
            this.resize(this.config.size);
        }else{
            this.resize([200,200])
        }

        // 设置整体宽度
        // this.VCwidth = `width:${this.config.size[1] + 15 +'px' || '100%'}`
        this.VCwidth = `width:auto}`

        // 设置魔方是否锁定
        this.cuber.controller.lock = this.config.lock || false

        // player enable hide autoplay loop都配置在prop中了

        // 设置player的scene ^表示按照alg逆向打乱
        this.player.scene = this.config.playerconfig.scene || ''

        // 设置alg公式
        this.player.action = this.config.playerconfig.alg  || ''

        // 有就加载遮罩
        try{
            const strip: any = this.CubeStageMask[this.config.playerconfig.masktype].strip
            this.viewport.cuber.world.cube.strip(strip)
        }catch{
            null
        }


        // 绑定每一步的执行之后的回调函数，在player的mounted中绑定会出错，在这里绑定比较好
        this.cuber.world.callbacks.push(() => {
            this.player.callback();
            });



        // 等待魔方载入之后重新计算坐标偏移
        setTimeout(() => {
            this.viewport.setoffset(this.$refs.viewport['$el'])
        }, 5000);

        // 开始刷新
        this.loop();
    }


    @Watch('cubesize')
    onCubesizeChange(){
        this.resize(this.cubesize)
    }

    
    hoverin(){
        if(this.config.playerconfig.hoverplay){
                const start = Date.now()
                const loop = setInterval(()=>{
                    let end = Date.now()
                    if((end-start)>1200)
                    {
                        try{
                            this.player.playing = true;
                            this.player.callback();
                            clearInterval(loop)
                        }catch{
                            clearInterval(loop)
                        }
                    
                    }
                },123)
        }
        
    }

     hoverout(){
         if(this.config.playerconfig.hoverplay){
             try{
                 this.player.playing = false
                    setTimeout(() => {
                        this.player.init()
                    }, 500);
             }catch{
               null
             }
         }
        
    }

    loop() {
        // 刷新
        this.r_id = requestAnimationFrame(this.loop.bind(this));
        // console.log(r_id)
        try{    
            this.viewport.draw();
        }catch{
            cancelAnimationFrame(this.r_id)
        }

    }

    complete = false;
    start = 0;
    now = 0;
    completed = false;

    }
</script>

<style>
    .visualcube{
        border: 2px solid blue;
        padding: 0px 5px;
        text-align: center;
    }
</style>