<template>
    <v-container fluid style="padding:0px">
        <Render :worldin="world" :cubeconfig="cubeconfig" :cubesize="cubesize" ></Render>
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop, Ref, Provide, Watch} from 'vue-property-decorator'
import Render from '../plugins/v3/vue/Render/index.vue';
import { CubeCongfig } from '../plugins/v3/cuber/interfaces'
import World from '../plugins/v3/cuber/world';
import Theme from '../plugins/v3/cuber/theme'

@Component({name:'Sponsor',components:{Render}})
export default class Sponsor extends Vue{
    constructor(){
    super()
    }

    world: World = new World()
    theme: Theme

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
            }}
    cubesize: number[] = [400,400]

    mounted(){
        let def = {
            version : '0.2',
            dark: false,
            colors: {
                R: "#FF0000",
                L: "#FB8C00",
                U: "#FFFFFF",
                D: "#FFFF8D",
                F: "#76FF03",
                B: "#1A237E"
            }
        }
        // this.theme = new Theme(this.world)
        // this.theme.reset()
        // console.log(this.theme.value)

        window.localStorage.setItem('theme',JSON.stringify(def))
    }

}
</script>


<style scoped>

</style>