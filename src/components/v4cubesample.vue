<template>
    <v-container fluid style="padding:0px">
        <Render :worldin="world" :cubeconfig="cubeconfig" :cubesize="cubesize" ref='render' ></Render>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop, Ref, Provide, Watch} from 'vue-property-decorator'
import Render from '../plugins/v4/vue/Render/index.vue';
import { CubeCongfig } from '../plugins/v4/cuber/interfaces'
import World from '../plugins/v4/cuber/world';

@Component({name:'CubeSample',components:{Render}})
export default class CubeSample extends Vue{
    constructor(){
    super()
    }

    @Ref('render') render: Render

    world: World = new World()

    cubeconfig: CubeCongfig =  {
            cubename : 'cubesample',
            model: 'casegroup',
            renderconfig:{
                order:  3,
                coverImgNotModel: false
            },
            playerconfig: {
                hoverplay: false,
                autoplay: false,
                breath: true,
                lock:true,
                loop:false,
                autorotate:true
            }
            }
    cubesize: number[] = [400,400]

    mounted(){
      
    }

}
</script>


<style scoped>

</style>