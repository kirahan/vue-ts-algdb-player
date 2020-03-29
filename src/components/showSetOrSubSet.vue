<template>
  <v-container fluid v-resize="onresize">
      <v-row  class="setorsubset">
        <v-col 
        cols=6 
        offset=3
        sm=8
        offset-sm=2
        xs=6
        offset-xs=3
        >
          <v-card elevation=10>

              <v-card-title class="display-1 font-weight-black justify-center align-center">
                  {{shortname}}
              </v-card-title>
          </v-card>
        </v-col>
        
        <v-col 
        cols=9 
        offset=1
        sm=8
        offset-sm=2
        xs=12
        >
          <v-row >
        <v-col
        cols=6
        lg=3
        md=4
        sm=3
        v-for="(puzzleSet,index) in puzzleSets" :key="index"
         >
         <v-hover
                            v-slot:default="{ hover }"
                            open-delay=100
                         >
           <v-card 
            class="mx-auto"
            max-width="200"
            :elevation="hover ? 18 : 5"
            d-inline
            @click="gotopage(puzzleSet.shortName)"
          >
            <v-img
              class="white--text align-center"
              contain
              :src="puzzleSet.imageSrc"
            >
            </v-img>

            <v-card-title 
            class="justify-center align-center font-weight-black"
            :style="titlestyle"
            >{{puzzleSet.name}}</v-card-title>
          </v-card>
         </v-hover>
        </v-col>
        </v-row>
       </v-col>
    </v-row>
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
import {Component, Prop} from 'vue-property-decorator'


@Component({name:'showSetOrSubSet'})
export default class Puzzles extends Vue{
  
  
  @Prop()
  hassubset: boolean

  @Prop()
  shortname: string 

  @State Navigation
  @Action setNavigation

  puzzleSets = {}
  titlestyle = 'font-size:12px'
  windowSize: any = { x: 0,y:0}


  async fetch(){
    if(this.hassubset){
        const res = await this.$http.get(`algdb/puzzlesubset?set=${this.shortname}`)
        this.puzzleSets = res.data.data
    }else{
       const res = await this.$http.get(`algdb/puzzleset?puzzle=${this.shortname}`)
        this.puzzleSets = res.data.data
    }
        const params = this.$route.path.split('/')
        const nav: object[] = [{
            text:'Home',
            disabled:false,
            to:'/',
        }]
        console.log(params)
        if(params[1]=='puzzle'){
           nav.push({
            text: params[2],
            disabled:true,
            to:`/puzzle/${params[2]}`,
          })
        }else{
           nav.push({
            text: '333',
            disabled:false,
            to:`/puzzle/333`,
          })
          nav.push({
            text: params[3],
            disabled:true,
            to:`/333/casegroup/${params[3]}`,
          })
        }
        this.setNavigation(nav)
    
  }

  gotopage(setname: string){
    this.$router.push(`/${this.shortname}/casegroup/${setname}`)
    this.$router.go(0)
    // this.$nextTick(function(){
    //     console.log('in nextTick')
    // })
  }


  created(){
    this.fetch()
  }

    onresize(){
        this.windowSize =  { x: window.innerWidth, y: window.innerHeight }
        this.refreshtitlestyle()
    }

    refreshtitlestyle (): string {
            const width =  this.windowSize.x
            
            let titlestyle =  ''
            if(width<600){
                titlestyle = 'font-size:14px'
            }else if(width<960){
                titlestyle += 'font-size:12px;padding:1px'
            }else if(width<1264){
                titlestyle += 'font-size:18px'
            }else if(width<1904){
                titlestyle += 'font-size:24px'
            }else{
                titlestyle += 'font-size:30px'
            }
            this.titlestyle = titlestyle
            return titlestyle
        }
}



</script>
