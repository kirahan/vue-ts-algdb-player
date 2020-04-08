<template>
    <v-container class="puzzlecase" fluid v-resize="onresize">
    
            <div v-if="usephoneLayout">
                <v-col
                    cols=12
                    no-gutters
                    justify-space-between
                    align-center
                    >
                        <v-card class="phonepannel" color="#385F73" dark elevation=5>
                                    
                                <div class="d-flex flex-no-wrap justify-space-between">
                                    
                                    
                                    <div class="phonelayout">
                                        <div class="phonelayout-img">
                                                <v-avatar
                                                size="90"
                                                tile
                                                >
                                                <v-img :src="Cases.imageSrc"></v-img>
                                            </v-avatar>
                                        </div>

                                        <div class="phonelayout-title">
                                            <v-card-title :class="textConfig.ScreenTitle">
                                                {{ScreenCardTitle}}
                                            </v-card-title>
                                        </div>

                                        <div class="phonelayout-name">
                                            <p class='body-1 text-center font-weight-black'>{{Cases.name}}</p>
                                        </div>

                                        <div class="phonelayout-play">
                                            <v-card-actions  class="flex-column justify-center">
                                                <v-btn class="subtitle-1" text>Play</v-btn>
                                            </v-card-actions>
                                        </div>
                                    </div>
                                </div> 
                                
                        </v-card>

                </v-col>
                

                <v-col
                                cols=10 
                                offset=1
                                xs=12
                                >
                                <v-simple-table  height="600px">
                                    <template v-slot:default>
                                    <thead >
                                        <tr>
                                        <th :class="textConfig.header">Algorithm</th>
                                        <th :class="textConfig.header">Votes</th>
                                        <th v-if="!textConfig.hidedateanddes" :class="textConfig.header">Date Added</th>
                                        <th v-if="!textConfig.hidedateanddes" :class="textConfig.header">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        <tr v-for="alg in Cases.caseAlgs" @click="algOnScreen(alg.moves)" :key="alg.id">
                                        <td :class="textConfig.alg">{{ alg.moves }}</td>
                                        <td :class="textConfig.vote"><v-chip :color="getColor(alg.votes)">{{ alg.votes }}</v-chip></td>
                                        </tr>
                                    </tbody>
                                    </template>
                                </v-simple-table>
                </v-col>


            </div>


            <div v-else>
                <v-row>
                    <v-col ref="Screen"
                        cols=10
                        offset=1
                        no-gutters
                        justify-space-between
                        align-center
                        >
                        <v-hover
                            v-slot:default="{ hover }"
                            open-delay=100
                         >
                                
                            <v-card color="#385F73" class="webpannel" dark :elevation="hover ? 16 : 2">
                                <div class="d-flex flex-no-wrap justify-space-between">
                                        <v-avatar
                                    class="ma-3"
                                    :size="textConfig.imagesize"
                                    tile
                                    >
                                    <v-img :src="Cases.imageSrc"></v-img>
                                    </v-avatar>
                                    <v-card-title :class="textConfig.ScreenTitle">
                                        {{ScreenCardTitle}}
                                    </v-card-title>

                                        <v-card-actions  class="flex-column justify-center">
                                            <p class='subtitle-1 font-weight-black'>{{Cases.name}}</p>
                                        <v-btn class="subtitle-1" @click="toggle"  text>Play</v-btn>
                                    </v-card-actions>
                                </div>
                            
                            </v-card>
                        </v-hover>
                        
                    </v-col>
                    <v-col 
                            cols=10 
                            offset=1
                            xs=12
                            class="algspannel"
                            >

                            <div ref='AlgsTable' style="width:100%">
                                <v-simple-table max-height="600px">
                                    <template v-slot:default>
                                    <thead >
                                        <tr>
                                        <th :class="textConfig.header">Algorithm</th>
                                        <th :class="textConfig.header">Votes</th>
                                        <th v-if="!textConfig.hidedateanddes" :class="textConfig.header">Date Added</th>
                                        <th v-if="!textConfig.hidedateanddes" :class="textConfig.header">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        <tr v-for="alg in Cases.caseAlgs" @click="algOnScreen(alg.moves)" :key="alg.id">
                                        <td :class="textConfig.alg">{{ alg.moves }}</td>
                                        <td :class="textConfig.vote"><v-chip :color="getColor(alg.votes)">{{ alg.votes }}</v-chip></td>
                                        <td v-if="!textConfig.hidedateanddes" :class="textConfig.date">{{ alg.createDate }}</td>
                                        <td v-if="!textConfig.hidedateanddes"  :class="textConfig.des">
                                        </td>
                                        </tr>
                                    </tbody>
                                    </template>
                                </v-simple-table>
                            </div>
                            <div>
                                <Render :worldin="world" :cubeconfig="cubeconfig" :cubesize="cubesize"></Render>
                                <Playbar ref="playbar"></Playbar>
                            </div>
                            


                    </v-col>
                </v-row>
            </div>

    </v-container>
</template>

<script lang='ts'>
import Vue from 'vue'
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
import {Component, Prop, Ref, Provide} from 'vue-property-decorator'
import Render from '../plugins/v3/vue/Render/index.vue';
import Playbar from '../plugins/v3/vue/Playbar/index.vue';
import { CubeCongfig } from '../plugins/v3/cuber/interfaces'
import World from '../plugins/v3/cuber/world';
/* eslint-disable @typescript-eslint/no-inferrable-types */

interface algdbcase {
    class?: string
    puzzle?: string
    groupName?: string
    caseName?: string
    name?: string
    shortName?: string
    caseGroupWholeName?: string
    genAlgs?: string
    imageSrc?: string
    updatedAt?: string
    caseAlgs?: object[]
}

@Component({name:'showCase',components:{Render,Playbar}})
export default class Puzzles extends Vue{

    constructor() {
        super();
    }

    @Prop()
    casename: string 

    @Prop()
    group: string

    @Prop()
    puzzle: string

    @Ref('playbar') playbar: Playbar

    @State Navigation
    @Action setNavigation

    @Provide()
    world: World = new World()

    cubeconfig: CubeCongfig = {}
    cubesize: number[] = []
    


    ScreenCardTitle: string = ''

    textConfig: object = {
        ScreenTitle: 'display-2 font-weight-black justify-center align-center',
        header : 'headline text-left',
        bodydefault : 'title text-left',
        alg : 'headline text-left font-weight-bold',
        vote : 'headline text-center',
        date : 'body-1 text-left',
        des : 'body-1 text-left',
        hidedateanddes : false,
        imagesize:125
    }

    Cases: algdbcase = {}

    usephoneLayout: boolean = false 
    titlestyle: string = 'font-size:12px'
    windowSize: any = { x: 0,y:0}

    async fetch(){
        if(this.puzzle!='222'&& this.puzzle!='333'){
            this.puzzle = '333'
        }
        const res = await this.$http.get(`algdb/case?puzzle=${this.puzzle}&case=${this.casename}&group=${this.group}&size=20&page=1`)
        this.Cases = res.data.data[0]
        this.ScreenCardTitle = this.Cases['caseAlgs'][0]['moves']

        
        this.cubeconfig = {
            cubename : this.Cases.name,
            model: 'case',
            renderconfig:{
                order: this.Cases.puzzle == '222'? 2: 3,
                scene:'^',
                alg: this.Cases.genAlgs,
                masktype: this.Cases.groupName,
                coverImgNotModel: false
            },
            playerconfig: {
                hoverplay: false,
                autoplay: false,
                breath: true,
                lock:false,
                loop:false
            }
        }

        this.playbar.scene = '^'
        this.playbar.action = this.Cases['caseAlgs'][0]['moves']
    }

    mounted(){
        this.world.dirty = true
    }

    created(){
        this.fetch()
        this.calVisualCubeSize()
        const params = this.$route.path.split('/')
        const nav: object[] = [{
            text:'Home',
            disabled:false,
            to:'/',
        }]
        nav.push({
            text: params[1],
            disabled:false,
            to:`/puzzle/${params[1]}`,
        })
        nav.push({
            text: params[2],
            disabled:false,
            to:`/${params[1]}/casegroup/${params[2]}`,
        })
        nav.push({
            text: params[4],
            disabled:true,
            to:`/case/${params[4]}`,
        })
        this.setNavigation(nav)
    }

    onresize(){
        this.windowSize =  { x: window.innerWidth, y: window.innerHeight }
        this.calVisualCubeSize()
        this.refreshtitlestyle()
    }

    getColor (calories) {
        if (calories > 300) return 'red lighten-2'
        else if (calories > 200) return 'orange lighten-2'
        else if (calories > 100)return 'green lighten-2'
        else if (calories > 50)return 'teal lighten-2'
        else if (calories > 20)return 'purple lighten-4'
        else return 'grey lighten-2'
    }



    algOnScreen(moves){
        this.ScreenCardTitle = moves
        this.playbar.scene = '^'
        this.playbar.action = moves
    }

    toggle(){
        this.playbar.toggle()
    }

    calVisualCubeSize(){
        if(this.usephoneLayout){
            const height = window.innerHeight*0.6
            const width = window.innerWidth*0.9
            this.cubesize = [width,height]
        }else{
            
            const width = window.innerWidth
           
            // let size = []
            if(width<600){
                this.cubesize = [250,250]
            }else if(width<960){
                this.cubesize = [300,300]
            }else if(width<1264){
                this.cubesize = [400,400]
            }else if(width<1904){
                this.cubesize = [450,450]
            }else{
                this.cubesize = [500,500]
            }
            this.playbar?.resize(50)
        }
        
        
    }

    refreshtitlestyle (): string {
            const width =  this.windowSize.x
            const defaultconfig: any = {
                                ScreenTitle: 'font-weight-black justify-center align-center',
                                header : 'text-left',
                                bodydefault : 'text-left',
                                alg : 'text-left font-weight-bold',
                                vote : 'text-center',
                                date : 'text-left',
                                des : 'text-left',
                                hidedateanddes : false,
                                imagesize:125
                            }



            if(width<600){
               defaultconfig.ScreenTitle +=(this.ScreenCardTitle.length>0 && this.ScreenCardTitle.length<20) ? ' display-1' : ' headline'
                defaultconfig.header += ' title'
                defaultconfig.bodydefault += ' title'
                defaultconfig.alg += ' body-1'
                defaultconfig.vote += ' body-1'
                defaultconfig.date += ' body-1'
                defaultconfig.des += ' body-1'
                defaultconfig.hidedateanddes = true
                defaultconfig.imagesize = 80
                this.usephoneLayout = true
                
            }else if(width<960){
               defaultconfig.ScreenTitle +=(this.ScreenCardTitle.length>0 && this.ScreenCardTitle.length<20) ? ' display-2' : ' display-1'
                defaultconfig.header += ' title'
                defaultconfig.bodydefault += ' title'
                defaultconfig.alg += ' title'
                defaultconfig.vote += ' title'
                defaultconfig.date += ' body-1'
                defaultconfig.des += ' body-1'
                defaultconfig.hidedateanddes = true
                this.usephoneLayout = false
            }else if(width<1264){
                defaultconfig.ScreenTitle +=(this.ScreenCardTitle.length>0 && this.ScreenCardTitle.length<20) ? ' display-2' :  ' display-1'
                defaultconfig.header += ' title'
                defaultconfig.bodydefault += ' title'
                defaultconfig.alg += ' title'
                defaultconfig.vote += ' title'
                defaultconfig.date += ' body-1'
                defaultconfig.des += ' body-1'
                this.usephoneLayout = false
            }else if(width<1400){
                defaultconfig.ScreenTitle +=(this.ScreenCardTitle.length>0 && this.ScreenCardTitle.length<20) ? ' display-2' : ' display-1'
                defaultconfig.header += ' headline'
                defaultconfig.bodydefault += ' title'
                defaultconfig.alg += ' headline'
                defaultconfig.vote += ' headline'
                defaultconfig.date += ' body-1'
                defaultconfig.des += ' body-1'
            }else{
                defaultconfig.ScreenTitle += (this.ScreenCardTitle.length>0 && this.ScreenCardTitle.length<20) ? ' display-3' : ' display-2'
                defaultconfig.header += ' headline'
                defaultconfig.bodydefault += ' title'
                defaultconfig.alg += ' headline'
                defaultconfig.vote += ' headline'
                defaultconfig.date += ' body-1'
                defaultconfig.des += ' body-1'
            }
            this.textConfig = defaultconfig
            return defaultconfig
        }
}

</script>


<style lang="css" scoped>
.puzzlecase{
    padding-bottom: 0%;
    padding-top: 0%;
}

.phonepannel{
    position: fixed;
    top: 8%;
    left: 1%;
    right: 1%;
    z-index: 9999;
}
.algspannel{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
}
.phonecube{
    padding-top: 600px;
}

.phonelayout {
    width: 100%;
    display: grid;
    grid-template-columns: 4fr 6fr 6fr;
    grid-template-rows: minmax(50px,1fr)  1fr 1fr;
    justify-items:stretch;
    align-items: stretch;
}
.phonelayout-img {
    /* background-color: #ef342a; */
    grid-column-start: 1;
    grid-column-end: 2; 
    grid-row-start: 1;
    grid-row-end: 4;
    display: flex;
    justify-content: center;
    align-items: center;
}
.phonelayout-title {
    /* background-color: #14a17e; */
    grid-column-start: 2;
    grid-column-end: 4; 
    grid-row-start: 1;
    grid-row-end: 3;
    display: flex;
    justify-content: center;
    align-items: center;
}
.phonelayout-name {
    /* background-color: #9514a1; */
    grid-column-start: 2;
    grid-column-end: 3; 
    grid-row-start: 3;
    grid-row-end: 4;
    display: flex;
    justify-content: center;
    align-items: center;
}
.phonelayout-name p{
    margin: 0%;
}

.phonelayout-play {
    /* background-color: #ce5d1c; */
    grid-column-start: 3;
    grid-column-end: 4; 
    grid-row-start: 3;
    grid-row-end: 4;
}



</style>