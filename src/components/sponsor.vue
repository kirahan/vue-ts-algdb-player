<template>
    <v-container fluid style="padding:0px">
       <v-carousel
                height="200"
                :cycle="model==-1"
                hide-delimiter-background
                :show-arrows='false'
                hide-delimiters
                v-model="modelindex"
            >
            <v-carousel-item key='0'>
                <Render :worldin="world" :cubeconfig="cubeconfig" :cubesize="cubesize" ref='cubesample'></Render>
            </v-carousel-item>


                <v-carousel-item
                    v-for="(slide, i) in slides"
                    :key="i+1"
                    >
                    <v-sheet
                        :color="colors[i]"
                        height="100%"
                    >
                        <v-row
                        class="fill-height"
                        align="center"
                        justify="center"
                        >
                        <div class="display-3">{{ slide }} Slide</div>
                        </v-row>
                    </v-sheet>
                </v-carousel-item>
        </v-carousel>
    </v-container> 

</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop, Ref, Provide, Watch} from 'vue-property-decorator'
import Render from '../plugins/v3/vue/Render/index.vue';
import { CubeCongfig } from '../plugins/v3/cuber/interfaces'
import World from '../plugins/v3/cuber/world';


@Component({name:'Sponsor',components:{Render}})
export default class Sponsor extends Vue{
    constructor(){
    super()
    }

    @Ref('cubesample') cubesample: Render

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
            }}
    cubesize: number[] = [200,200]

    @Prop()
    model: number

    modelindex: number = 0

    colors: string[] = [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
        ]
    slides: string[] =[
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
    ]

    @Watch('model')
    onModelChange(){
        if(this.model==-1){
            null
        }else{
            this.modelindex = this.model
        }
    }

}
</script>


<style scoped>

</style>