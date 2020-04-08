<template>
    <v-container fluid style="padding:0px">
       <v-carousel
                cycle
                height="200"
                hide-delimiter-background
                :show-arrows='false'
                hide-delimiters
            >
                <v-carousel-item
                v-for="(slide, i) in slides"
                :key="i"
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
import {Component, Prop, Ref, Provide} from 'vue-property-decorator'

@Component({name:'Sponsor',components:{}})
export default class Sponsor extends Vue{
    constructor(){
    super()
    }
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

}
</script>


<style scoped>

</style>