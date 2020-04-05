<template>
  <v-container fluid v-resize="onresize">
      <v-row  class="home">
        <v-col 
        cols=8 
        offset=2
        >
          <v-card elevation=10>
              <v-card-title class="display-1 font-weight-black justify-center align-center">
                  Puzzles
              </v-card-title>
          </v-card>
        </v-col>
        
        <v-col 
        cols=8 
        offset=2>
          <v-row >
        <v-col
        cols=6
        v-for="(puzzle,index) in data" :key="index"
         >
          <v-hover
                            v-slot:default="{ hover }"
                            open-delay=100 >
           <v-card 
            class="mx-auto"
            max-width="300"
            :elevation="hover ? 18 : 5"
            d-inline
            @click="gotopage(puzzle.shortName)"
          >
            <!-- <v-img
              class="white--text align-center"
              contain
              :src="puzzle.imageSrc"
            >
            </v-img> -->

            <VisualCube :cubeconfig="cubeconfig[index]" :cubesize="cubesize"></VisualCube>
            <v-card-title class="display-1 font-weight-black justify-center align-center" >{{puzzle.name}}</v-card-title>
          </v-card>
          </v-hover>
        </v-col>
        </v-row>
       </v-col>
    </v-row>
  </v-container>
  
</template>

<script lang='ts'>
// @ is an alias to /src
import Vue from 'vue'
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
import { Ref,Component } from 'vue-property-decorator'
// import VisualCube from '../plugins/cubestack/vue/Algplayer/index.vue'
import VisualCube from '../plugins/cubestack/vue/CubeImgCover/index.vue'
import { CubeCongfig } from '../plugins/cubestack/cuber/interface';


@Component({
  name : 'HOME',
  components: {
    VisualCube
  }
})
export default class Puzzles extends Vue{
  constructor(){
    super()
  }
  cubesize = []
  cubeconfig: CubeCongfig[] = []
  data = []

  @State Navigation
  @Action setNavigation
  

  async fetch(){
    const res22 = await this.$http.get('algdb/puzzles/222')
    const res33 = await this.$http.get('algdb/puzzles/333')
    this.data = [res22.data,res33.data]
    for(let _cube of this.data){
          this.cubeconfig.push({
            name : _cube.name,
            model: 'playground',
            lock: false,
            renderconfig: {
              cubename: _cube.name,
              size: [300,300],
              template: 'playground',
              coverImgNotModel: false,
              preferance: {
                order : _cube.shortName == '222'? 2: 3
              }
            },
            playerconfig: {
              enable: true,
              hide: true,
              autoplay: false,
              loop: false,
              hoverplay: false
            }
          })
    }

    console.log(this.cubeconfig)
  
  }


  onresize(){
    const width = window.innerWidth
          // let size = []
          if(width<600){
                  this.cubesize = [150,150]
              }else if(width<960){
                  this.cubesize = [170,170]
              }else if(width<1264){
                  this.cubesize = [200,200]
              }else if(width<1904){
                  this.cubesize = [250,250]
              }else{
                  this.cubesize = [300,300]
              }
    }


  gotopage(puzzleshortname: string){
    this.$router.push(`/puzzle/${puzzleshortname}`)
  }
  created(){
    this.fetch()
    const nav: object[] = []
    this.setNavigation(nav)
  }
}



</script>
