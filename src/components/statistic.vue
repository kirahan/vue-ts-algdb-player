<template>
    <v-container fluid style="padding:0px">
        <v-row  class="text-center">
            <v-col  cols=6>
                <v-sheet
                    tile
                    elevation-10
                    color="red"
                    class="pa-3"
                    >
                        <div class="headline">{{gcase}}</div>
                        <span class="caption">Cases</span>
                </v-sheet>
            </v-col>
            <v-col cols=6>
                <v-sheet
                    tile
                    elevation-10
                    color="indigo"
                    class="pa-3"
                    >
                        <div class="headline">{{guser}}</div>
                        <span class="caption">Users</span>
                </v-sheet>
            </v-col>

            <v-col cols=6>
                <v-sheet
                    tile
                    elevation-10
                    color="purple"
                    class="pa-3"
                    >
                        <div class="headline">{{galg}}</div>
                        <span class="caption">Algs</span>
                </v-sheet>
            </v-col>

            <v-col cols=6>
                <v-sheet
                    tile
                    elevation-10
                    color="orange"
                    class="pa-3"
                    >
                        <div class="headline">{{gmau}}</div>
                        <span class="caption">MAU</span>
                </v-sheet>
            </v-col>
            <v-col cols=12>
                <span class="caption grey--text text--lighten-3" >更新于: {{updateAt}}</span>
            </v-col>
        </v-row>
    </v-container> 

</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop, Ref, Provide, Watch} from 'vue-property-decorator'
import gsap  from 'gsap'
import { settings } from 'cluster'


@Component({name:'Statistic',components:{}})
export default class Statistic extends Vue{
    constructor(){
        super()
    }

    updateAt: string = ''

    algstats: any = {}

    casesnumber: number = 0
    usersnumber: number = 0
    algsnumber: number = 0
    maunumber: number = 0


    get gcase(){
        return this.casesnumber.toFixed(0)
    }

    get guser(){
        return this.usersnumber.toFixed(0)
    }

    get galg(){
        return this.algsnumber.toFixed(0)
    }

    get gmau(){
        return this.maunumber.toFixed(0)
    }



    mounted(){

    }

    gsapdata(){
         gsap.fromTo(this.$data,{
                duration:1.5, 
                casesnumber : 0,
                usersnumber : 0,
                algsnumber : 0,
                maunumber : 0
            },{
                duration:2.5, 
                casesnumber : this.algstats.cases,
                usersnumber : this.algstats.users,
                algsnumber : this.algstats.algs,
                maunumber : 500
            })
    }


    created(){
        this.fetch()
    }

    async fetch(){
        const res = await this.$http.get(`algdb/stats`)
        this.algstats = res.data[0]
        this.updateAt = this.algstats.updatedAt
    }

    @Watch('algstats')
    onCasesnumberChange(){
        this.gsapdata()
    }
}
</script>


<style scoped>

</style>