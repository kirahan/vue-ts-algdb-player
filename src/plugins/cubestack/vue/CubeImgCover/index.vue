<template>
    <v-sheet 
        elevation-10
        color="white lighten-1"
        class="visualcube"
        @mouseenter="hoverin"
        @mouseleave="hoverout"
        >
        <div ref="cubediv" class="cubediv" ></div>
        <div :ref="renderconfig.refname"  class="cubediv" ></div>

        <player 
        v-if="playerconfig.enable" 
        :style="playerhide"  
        :autoplay='playerconfig.autoplay'
        :loop='playerconfig.loop'
        ref="player" 
            ></player>
    </v-sheet >
</template>

<script lang="ts">
    import Vue from 'vue'
    import { Component, Watch, Prop, Ref } from "vue-property-decorator";
    import '../../index.css'

    import Player from "../Player/index.vue";
    import {Cuber} from '../../cuber'
import { RenderConfig, Playerconfig, CubeCongfig } from '../../cuber/interface';
    @Component({
    name:'VisualCubeCoverImg',
    components: {Player}
    })
    export default class VisualCube extends Vue {

    // CubeStageMask = require('./strip.json')
    renderconfig: RenderConfig
    playerconfig: Playerconfig
    cuberef: any
    cubename: string

    cuber: Cuber;
    r_id: number = 0

    @Prop()
    cubeconfig: CubeCongfig

    @Prop()
    cubesize: number[]




    
    

    // 保存魔方实例
    @Ref('player') player!: Player 
    @Ref('cubediv') cubediv: HTMLDivElement

    created(){
        this.renderconfig = this.cubeconfig.renderconfig
        this.playerconfig = this.cubeconfig.playerconfig
        this.cubename = this.renderconfig.cubename
    }
        


    get playerhide(){
        if(this.cubeconfig.playerconfig.hide){
            return 'display:none'
        }else{
            return ''
        }
    }

    constructor() {
        super();
        

    }



    mounted() {
        this.cuberef = this.cubeconfig.renderconfig.refname  ? this.$refs[this.cubeconfig.renderconfig.refname] : this.cubediv
        this.$cuberender.addcube(
            {
            cubename: this.renderconfig.cubename,
            alg: this.renderconfig.alg,
            scene: this.renderconfig.scene,
            masktype: this.renderconfig.masktype,
            refname: this.renderconfig.refname || null,
            el: this.cuberef,
            canvas: this.renderconfig.canvas || null,
            size: this.renderconfig.size || [200,200],
            template:this.renderconfig.template || null,
            coverImgNotModel: this.renderconfig.coverImgNotModel || false,
            preferance: this.renderconfig.preferance || null
        },()=>{

                this.cuber = this.$cuberender.pagecubes[this.cubename].cuber
                // 更新到player中
                this.player.cuber = this.$cuberender.pagecubes[this.cubename].cuber

            // 保存实例
                // console.log(this.player)
                // 保存配置
                // try{
                //     this.viewport.cuber.preferance.load(this.config.model);
                // }catch{
                //     this.viewport.cuber.preferance.load("playground");
                // }
                // // 再载入填入在cubeconfig中的配置参数
                // try{
                //     for( let param in this.config['cubeconfig']){
                //         this.preferance[param] = this.config['cubeconfig'][param]
                //     }
                // }catch{
                //     null
                // }

                // // 设置魔方是否锁定
                this.cuber.controller.lock = this.cubeconfig.lock || false

                // player enable hide autoplay loop都配置在prop中了


                // // 设置player的scene ^表示按照alg逆向打乱
                this.player.scene =  this.renderconfig.scene ||''

                // // 设置alg公式
                this.player.action =  this.renderconfig.alg ||''

                // // 有就加载遮罩
                // try{
                //     const strip: any = this.CubeStageMask[this.renderconfig.masktype].strip
                //     this.cuber.world.cube.strip(strip)
                // }catch{
                //     null
                // }
                // this.$cuberender.unbind(this.cubename)

                // 绑定每一步的执行之后的回调函数，在player的mounted中绑定会出错，在这里绑定比较好
                this.cuber.world.callbacks.push(() => {
                    this.player.callback();
                    });
        }
        )


        


        // 开始刷新
        this.loop();
    }

    @Watch('cubesize')
    onCubesizeChange(){
        let imgElements = document.getElementsByTagName('IMG')
        for(let imgelement of imgElements){
            imgelement["style"]["width"] = this.cubesize[0] + 'px'
        }
        // this.$cuberender.resize(this.cubesize[0],this.cubesize[1]) 
    }

    
    hoverin(){
      
    this.$cuberender.bind({
    cubename: this.cubename
    })
    this.$cuberender.resize(this.cubesize[0],this.cubesize[1])
    if(this.playerconfig.hoverplay){
            const start = Date.now()
            const loop = setInterval(()=>{
                let end = Date.now()
                if((end-start)>500)
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
    // 开始刷新
    this.loop();
     
    }

    hoverout(){
        
        // console.log(this.cuber.world.cube.lock)
        this.cuber.controller.handleUp()
        this.cuber.twister.finish()
        if(this.playerconfig.hoverplay){
            try{
                this.player.playing = false
                this.player.init()
            }catch{
                null
            }
        }
        this.$cuberender.unbind(this.cubename)
        cancelAnimationFrame(this.r_id)
    
    }

    loop() {
        // 刷新
        this.r_id = requestAnimationFrame(this.loop.bind(this));
        // console.log(r_id)
        try{    
            this.$cuberender.draw();
        }catch{
            cancelAnimationFrame(this.r_id)
        }

    }

    }
</script>

<style>
    .visualcube{
        border: 2px solid blue;
        padding: 0px 5px;
        /* text-align: center; */
        width: fit-content;
        display: contents;
    }
    .cubediv{
        text-align: center;
    }
</style>