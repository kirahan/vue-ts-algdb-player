<template>
    <div>
        <Render :worldin="world" :cubeconfig="Configs[0]" ref="render"></Render>
        <Render  :cubeconfig="Configs[1]" ></Render>
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
import { Component, Inject, Provide, Ref, Prop } from "vue-property-decorator";
import { WebGLRenderer } from "three";
import { COLORS } from "../plugins/v3/cuber/define";
import Toucher from "../plugins/v3/common/toucher";
import World from "../plugins/v3/cuber/world";
import Render from '../plugins/v3/vue/Render/index.vue';
import { CubeCongfig , RenderConfig, Playerconfig} from '../plugins/v3/cuber/interfaces';



@Component({name:'cube',components:{Render}})
export default class cube extends Vue{

    @Ref('render')  renderer: Render


    // 当生成很多个魔方的时候不适合用provide
    // @Provide('world')



    world: World = new World()

    Configs: CubeCongfig[] = [{
            cubename : "cube1",
            model: 'xxx',
            renderconfig:{
                order: 3,
                size: [300,300],
                template: 'playground',
                coverImgNotModel: true,
                scene:'^',
                alg: "RUR",
                masktype: '',
                preferance: {
                }
            },
            playerconfig: {
                autoplay: false,
                loop: true,
                hoverplay: true,
                lock: false
            }
        },
        {
            cubename : "cube2",
            model: 'xxx',
            renderconfig:{
                order: 3,
                size: [300,300],
                template: 'playground',
                coverImgNotModel: false,
                scene:'^',
                alg: "RUR",
                masktype: '',
                preferance: {
                }
            },
            playerconfig: {
                autoplay: false,
                loop: true,
                hoverplay: false,
                lock: true
            }
        }]

    constructor(){
        super()
    }

    resize() {
    }

    mounted(){
        // this.canvasref = this.cube1
        // console.log(this.world)
        // console.log(this.canvasref)
    }





}

</script>


<style scoped>

</style>