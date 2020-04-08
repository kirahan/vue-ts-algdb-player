<template>
    <v-container fluid style="padding:0px">
        <v-list-group 
            :value="model"
            prepend-icon="account_circle"
            color="yellow"
            >
            <template v-slot:activator>
                    <v-list-item-title>Users</v-list-item-title>
                </template>

            <v-list-item
                v-for="(item, i) in items"
                :key="i"
                link
            >
                

                <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list-group>
    </v-container> 

</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop, Ref, Provide} from 'vue-property-decorator'

@Component({name:'Account',components:{}})
export default class Account extends Vue{

     items= [
        {
          icon: 'mdi-heart',
          text: '我的收藏',
        },
        {
          icon: 'mdi-file-edit',
          text: '个人资料',
        },
        {
          icon: 'mdi-link',
          text: '绑定账号',
        },
      ]
      model:boolean = false
}
</script>


<style scoped>

</style>