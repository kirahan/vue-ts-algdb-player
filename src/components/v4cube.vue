<template>
    <div>
        <Render  :cubeconfig="Configs[1]" ></Render>
    </div>
</template>


<script lang="ts">
import Vue from 'vue'
import { Component, Inject, Provide, Ref, Prop } from "vue-property-decorator";
import { WebGLRenderer } from "three";
import { COLORS } from "../plugins/v4/cuber/define";
import Toucher from "../plugins/v4/common/toucher";
import World from "../plugins/v4/cuber/world";
import Render from '../plugins/v4/vue/Render/index.vue';
import { CubeCongfig , RenderConfig, Playerconfig} from '../plugins/v4/cuber/interfaces';



@Component({name:'cube',components:{Render}})
export default class cube extends Vue{

    @Ref('render')  renderer: Render


    // 当生成很多个魔方的时候不适合用provide
    // @Provide('world')



    world: World = new World()

    Configs: CubeCongfig[] = [
        {
            cubename : "cube1",
            model: 'casegroup',
            renderconfig:{
                order: 3,
                size: [300,300],
                coverImgNotModel: true,
                scene:'^',
                alg: "RUR",
                masktype: ''
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
            model: 'casegroup',
            renderconfig:{
                order: 2,
                coverImgNotModel: true,
                scene:'^',
                alg: '',
            },
            // preferanceconfig:{
            //     hollow: false
            // },
            playerconfig:{
                hoverplay: false,
                lock:false,
                breath:true
                
            }
        }]

    constructor(){
        super()
    }

    resize() {
    }

    mounted(){

        

    }





}

</script>


<style scoped>

</style>