<template>
  <v-container fluid>
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
           <v-card 
            class="mx-auto"
            max-width="300"
            elevation=10
            d-inline
            @click="gotopage(puzzle.shortName)"
          >
            <v-img
              class="white--text align-center"
              contain
              :src="puzzle.imageSrc"
            >
            </v-img>

            <v-card-title class="display-1 font-weight-black justify-center align-center" >{{puzzle.name}}</v-card-title>
          </v-card>
        </v-col>
        </v-row>
       </v-col>
    </v-row>
  </v-container>
  
</template>

<script lang='ts'>
// @ is an alias to /src
import Vue from 'vue'
import Component from 'vue-class-component'
// import ddddd from '../index'


@Component({})
export default class Puzzles extends Vue{
  data = {}
  async fetch(){
    const res22 = await this.$http.get('algdb/puzzles/222')
    const res33 = await this.$http.get('algdb/puzzles/333')
    this.data = [res22.data,res33.data]
  }

  gotopage(puzzleshortname: string){
    this.$router.push(`/puzzle/${puzzleshortname}`)
  }
  created(){
    this.fetch()
  }
}



</script>
