<template>
    <v-container fluid style="padding:0px">
        <v-tabs
            centered
            optional
            grow
            background-color="teal lighten-1"
            v-model="tab"
        >
            <v-tab
                v-for="item in items"
                :key="item.tab"
            >
                {{ item.content }}
            </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item
                key="One"
            >
                <v-card 
                    tile
                    dark 
                    elevation=0
                    color="teal lighten-1">
                    <v-card-title>1</v-card-title>
                </v-card>
            </v-tab-item>

            <v-tab-item
                key="Two"
            >
                <v-card 
                    tile
                    dark 
                    elevation=0
                    color="teal lighten-1">
                    <v-card-title>2</v-card-title>
                </v-card>
            </v-tab-item>

             <v-tab-item
                key="Three"
            >
                <v-card 
                    tile
                    dark 
                    elevation=0
                    color="teal lighten-1">
                    <v-card-title>3</v-card-title>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </v-container> 

</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop, Ref, Provide} from 'vue-property-decorator'

@Component({name:'Account',components:{}})
export default class Account extends Vue{
    tab:string = ''
    items =  [
                { tab: 'One', content: '外观' },
                { tab: 'Two', content: '配色' },
                { tab: 'Three', content: '计时' }
            ]
}
</script>


<style scoped>

</style>