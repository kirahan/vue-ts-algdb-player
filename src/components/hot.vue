<template>
    <v-container fluid style="padding:0px">
        <v-chip-group
          column
        >
        
             <v-chip link
                class="ma-2"
                color="green"
                text-color="white"
                >
                    <v-avatar
                        left
                        class="green darken-4"
                    >3</v-avatar>
                
                F2L
            </v-chip>

            <v-chip link
                class="ma-2"
                color="indigo"
                text-color="white"
                >
                    <v-avatar
                        left
                        class="indigo darken-4"
                    >2</v-avatar>
                
                EG1
            </v-chip>
        </v-chip-group>
       
    </v-container> 

</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop, Ref, Provide} from 'vue-property-decorator'

@Component({name:'Hot',components:{}})
export default class Hot extends Vue{


}
</script>


<style scoped>

</style>