<template>
  <v-container class="puzzlecase" fluid v-resize="onresize">
      <v-row   >
        <v-col 
                cols=12
                xl=10
                lg=10
                md=10
                sm=10
                offset-lg=1
                offset-md=1
                offset-sm=1
                offset-sl=1
                no-gutters
                justify-space-between
                align-center
                >
             
                 <v-card v-if="usephoneLayout" class="phonepannel" color="#385F73" dark elevation=5>
                     
                    <div class="d-flex flex-no-wrap justify-space-between">
                        
                        
                        <div class="phonelayout">
                            <div class="phonelayout-img">
                                 <v-avatar
                                    size="90"
                                    tile
                                    >
                                    <v-img :src="`${Cases.imageSrc}&bg=t`"></v-img>
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



                        <!-- <v-row>
                        <v-col cols=3 >
                             <v-avatar
                                size="auto"
                                tile
                                width="100%"
                                >
                                <v-img :src="`${Cases.imageSrc}&bg=t`"></v-img>
                            </v-avatar>
                            <v-card-actions  class="flex-column justify-center">
                                <v-btn class="subtitle-1" text>Play</v-btn>
                            </v-card-actions>
                        </v-col>
                        
                        <v-col cols=9  class="d-flex flex-column-reverse">
                            <p class='body-1 text-center font-weight-black'>{{Cases.name}}</p>
                             <v-card-title :class="textConfig.ScreenTitle">
                                {{ScreenCardTitle}}
                            </v-card-title>
                        </v-col>

                        </v-row>
                         
                       -->
                    </div> 
                  
                </v-card>

                <v-card v-else color="#385F73" class="webpannel" dark elevation=5>
                    <div class="d-flex flex-no-wrap justify-space-between">
                          <v-avatar
                        class="ma-3"
                        :size="textConfig.imagesize"
                        tile
                        >
                        <v-img :src="`${Cases.imageSrc}&bg=t`"></v-img>
                        </v-avatar>
                        <v-card-title :class="textConfig.ScreenTitle">
                           {{ScreenCardTitle}}
                        </v-card-title>

                         <v-card-actions  class="flex-column justify-center">
                             <p class='subtitle-1 font-weight-black'>{{Cases.name}}</p>
                            <v-btn class="subtitle-1" text>Play</v-btn>
                        </v-card-actions>
                    </div>
                  
                </v-card>
        </v-col>
        
        <div v-if="usephoneLayout" style="padding-top:200px"></div>

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
                    <td v-if="!textConfig.hidedateanddes" :class="textConfig.date">{{ alg.createDate }}</td>
                    <td v-if="!textConfig.hidedateanddes"  :class="textConfig.des">
                    </td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
       </v-col>
    </v-row>
  </v-container>
  
</template>

<script lang='ts'>
import Vue from 'vue'
import {Component, Prop} from 'vue-property-decorator'
/* eslint-disable @typescript-eslint/no-inferrable-types */
@Component({name:'showCase',components:{}})
export default class Puzzles extends Vue{
  
  

  @Prop()
  casename: string 


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

  Cases: object = {}

  usephoneLayout: boolean = false 
  titlestyle: string = 'font-size:12px'
  windowSize: any = { x: 0,y:0}

  async fetch(){


    const res = await this.$http.get(`algdb/case?case=${this.casename}&size=20&page=1`)
    this.Cases = res.data.data[0]
    
  }


    created(){
        this.fetch()
    }

    onresize(){
        this.windowSize =  { x: window.innerWidth, y: window.innerHeight }
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
        this.ScreenCardTitle = moves.replace(/(^\s*)|(\s*$)/g, "").replace(/\s+/g, " ")
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
                console.log(this.ScreenCardTitle.length)
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