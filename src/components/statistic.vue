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
                        <div class="headline">1592</div>
                        <span class="cpation">Cases</span>
                </v-sheet>
            </v-col>
            <v-col cols=6>
                <v-sheet
                    tile
                    elevation-10
                    color="indigo"
                    class="pa-3"
                    >
                        <div class="headline">1000</div>
                        <span class="cpation">Users</span>
                </v-sheet>
            </v-col>

            <v-col cols=6>
                <v-sheet
                    tile
                    elevation-10
                    color="purple"
                    class="pa-3"
                    >
                        <div class="headline">6056</div>
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
                        <div class="headline">200</div>
                        <span class="caption">MAU</span>
                </v-sheet>
            </v-col>
        </v-row>
        
        
    </v-container> 

</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop, Ref, Provide} from 'vue-property-decorator'

@Component({name:'Statistic',components:{}})
export default class Statistic extends Vue{


}
</script>


<style scoped>

</style>