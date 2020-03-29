<template>

    
  <showSetOrSubSet :hassubset='setisasubset' :shortname="setname" v-if='setisasubset'></showSetOrSubSet>

  <v-container v-else fluid v-resize="onresize">
      <v-row  class="casegroup">
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
                  {{title}}
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
        v-for="(caseGroup,index) in caseGroups" :key="index"
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
            @click="gotopage(caseGroup.shortName)"
          >
            <v-img
              class="white--text align-center"
              contain
              :src="caseGroup.imageSrc"
            >
            </v-img>

            <v-card-title 
            class="justify-center align-center font-weight-black"
            :style="titlestyle"
            >{{caseGroup.name}}</v-card-title>
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
import showSetOrSubSet from './showSetOrSubSet.vue'

@Component({name:'showCaseGroup',components:{showSetOrSubSet}})
export default class Puzzles extends Vue{
  
  
  @Prop()
  puzzle: string
  
  @Prop()
  setname: string 

  @State Navigation
  @Action setNavigation

  title: string 
  setisasubset = false

  caseGroups = {}

  titlestyle = 'font-size:12px'
  windowSize: any = { x: 0,y:0}

  async fetch(){
    // const group = await this.$http.get(`algdb/caseGroup?group=${this.setname}&size=100&page=1`)


    //   algdb/caseGroup?case=vls&page=1&size=20
    const res = await this.$http.get(`algdb/caseGroup?group=${this.setname}&size=100&page=1`)
    console.log(res.data.data.length)
    if(res.data.data.length!=0){
        this.caseGroups = res.data.data
        this.title = res.data.data[0].caseGroupWholeName
    }else{
        const haschildren =await this.$http.get(`algdb/puzzleset?set=${this.setname}&haschildren=true`)
        if(haschildren.data.data.length!=0) {
            this.setisasubset = true
        }
    }
  }

    gotopage(casename: string){
        const puzzle = this.puzzle
        const group = this.caseGroups[0]['groupName']
        this.$router.push(`/${puzzle}/${group}/case/${casename}`)
    }


    created(){
        this.fetch()
        const params = this.$route.path.split('/')
        const nav: object[] = [{
            text:'Home',
            disabled:false,
            to:'/',
        }]
        console.log(params)
        if(params[1]=='333' || params[1]=='222'){
          nav.push({
            text: params[1],
            disabled:false,
            to:`/puzzle/${params[1]}`,
         })
         nav.push({
            text: params[3],
            disabled:true,
            to:``,
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
            to:`/${params[1]}/casegroup/${params[3]}`,
        })

        }
        this.setNavigation(nav)
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
