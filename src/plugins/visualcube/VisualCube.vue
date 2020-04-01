<template>
    <v-sheet 
        elevation-10
        color="grey lighten-4"
        class="visualcube"
        >
        
        <Viewport ref="viewport"></Viewport>
        <player ref="player"></player>
    </v-sheet >
</template>

<script lang="ts">
    import Vue from "vue";
    import { Component, Watch, Prop, Ref } from "vue-property-decorator";
    import '../../plugins/icon.css'

    import Viewport from "./Viewport/index.vue";
    import Player from "./Player/index.vue";
    import cuber from "./cuber";
    import Preferance from "./cuber/preferance";


    class AlgClass {
        puzzle: string
        alg: string
        masktype: string
        refresh: number
        
        constructor(){
            this.puzzle = '333'
            this.alg = ''
            this.masktype = ''
            this.refresh = Math.random()
        }
    }

    @Component({
    name:'VisualCube',
    components: {Viewport,Player}
    })
    export default class VisualCube extends Vue {

    CubeStageMask = require('./Player/strip.json')
    width = 0
    height = 0
    size = 0;
    viewport: Viewport;
    player: Player;
    preferance: Preferance;


    constructor() {
        super();
        this.preferance = cuber.preferance;
        this.preferance.order = 3;
    }

    resize(widthandheight: number[]) {
        this.width = widthandheight[0]
        this.height = widthandheight[1]
        this.size = Math.ceil(Math.min(this.width / 6, this.height / 12)) * 0.95;
        this.viewport?.resize(this.width, this.height - this.size * 1.5);
        this.player?.resize(this.size);
        if(this.viewport instanceof Viewport){
                    this.viewport.setoffset(this.$refs['viewport']['$el'])
        }
    }

    mounted() {
        // 设定模式为plyground
        cuber.preferance.load("playground");


        // 保存魔方实例
        let view = this.$refs.viewport;
        if (view instanceof Viewport) {
        this.viewport = view;
        }

        // 保存 进度条实例
        view = this.$refs.player;
        if (view instanceof Player) {
        this.player = view;
        }

        // 计算viewport画布大小
        this.resize([this.width,this.height]);

        // 等待魔方载入之后重新计算坐标偏移
        setTimeout(() => {
            this.viewport.setoffset(this.$refs['viewport']['$el'])
        }, 5000);

        // 开始刷新
        this.loop();
    }

    
    loop() {
        // 刷新
        requestAnimationFrame(this.loop.bind(this));
        this.viewport.draw();
    }




    complete = false;
    start = 0;
    now = 0;
    completed = false;



    ALG: AlgClass = new AlgClass
    ACTION = ''

    setALG(alg: AlgClass){
        this.ALG = alg
    }

    

    @Watch('ALG')
    onALGChange(){
        const order = this.ALG.puzzle == '222'? 2 : 3

        if(this.preferance.order!=order){
            this.preferance.order = order;
            this.preferance.frames = 30;
            this.preferance.mirror = false;
            this.preferance.hollow = false;
        }


        // 有就加载遮罩
        try{
            const strip: any = this.CubeStageMask[this.ALG.masktype].strip
            cuber.world.cube.strip(strip)
        }catch{
            null
        }
        
        
        this.ACTION = this.ALG.alg
        // 设置为逆向模式
        this.player.scene = "^"
        this.player.action = this.ACTION;
    }

    @Watch('ACTION')
    onACTIONChange(){
        this.player.action = this.ACTION;
    }

    }
</script>

<style>
    .visualcube{
        border: 2px solid blue;
        padding: 0px 5px;
    }
</style>