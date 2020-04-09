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
               
                    <v-row >
                        <v-expansion-panels accordion>
                            <v-expansion-panel
                            >
                                <v-expansion-panel-header color="cyan darken-2 white--text">魔方底色:{{bottom}}</v-expansion-panel-header>
                                <v-expansion-panel-content
                                    >
                                    <v-row no-gutters dark>
                                        <v-col 
                                        v-for="(bottomlayer,index) in bottomlist"
                                        :key="index"
                                        cols=2
                                            >
                                            <v-card
                                                class="pa-2 d-flex bottomlayercolor"
                                                dark
                                                elevation-0
                                                tile
                                                :color="bottomlayer.color"
                                                @click="setbottomlayer(bottomlayer.name)"
                                                    >
                                                    <v-list-item-title class="caption">{{bottomlayer.name}}</v-list-item-title>
                                            </v-card>
                                        </v-col>
                                    </v-row>
                                   
                                </v-expansion-panel-content>
                            </v-expansion-panel>

                            <v-expansion-panel
                            >
                                <v-expansion-panel-header color="purple darken-2 white--text">配色模板</v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <v-row no-gutters >
                                        <v-col cols=2>
                                            <p class="title " style="line-height:100px">自定义</p>
                                        </v-col>
                                        <v-col cols=10>
                                            <v-row no-gutters>
                                                <v-col 
                                                v-for="(bottomlayer,index) in bottomlist"
                                                :key="index"
                                                cols=2
                                                    >
                                                    <v-card
                                                        class="pa-2 d-flex bottomlayercolor"
                                                        dark
                                                        elevation-0
                                                        tile
                                                        :color="bottomlayer.color"
                                                        @click="setcolor(bottomlayer.name)"
                                                            >
                                                            <v-list-item-subtitle class="caption">{{bottomlayer.name}}</v-list-item-subtitle>
                                                    </v-card>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                        
                                    </v-row>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </v-row>

                
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

    <v-snackbar
      v-model="snackbar"
      :timeout='timeout'
      color="success"
      left
      bottom
    >
      {{ message }}
      <v-btn
        color="white"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
    </v-container> 

</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop, Ref, Provide, Watch, Emit} from 'vue-property-decorator'

@Component({name:'Account',components:{}})
export default class Account extends Vue{
    tab:string = ''
    items =  [
                { tab: 'One', content: '外观' },
                { tab: 'Two', content: '配色' },
                { tab: 'Three', content: '计时' }
            ]
    bottomlist = [
        {name:'蓝',value:'blue',color:'indigo'},
        {name:'绿',value:'green',color:'green'},
        {name:'黄',value:'yellow',color:'yellow'},
        {name:'白',value:'white',color:'grey lighten-1'},
        {name:'橙',value:'orange',color:'orange'},
        {name:'红',value:'red',color:'red'}
        ]
    bottom: string = ''
    snackbar: boolean = false
    message: string = ''
    timeout = 2000

    @Emit('setsponsorindex')
    setSponsorIndex(value){
        return {
            data : value
        }
    }

    @Emit('switch2cubesample')
    Switch2CubeSample(){
        return true
    }


    @Watch('tab')
    onTabChange(){

        // 如果tab有值就将sponsor模块的页面切换到第一页
        // this.setSponsorIndex(0)

        // 不使用sponsor 切换到 示例魔方页面
        this.Switch2CubeSample()
        

    }

    mounted(){
        this.bottom = window.localStorage.getItem('bottomlayer')
    }
    setbottomlayer(layername){
        window.localStorage.setItem('bottomlayer', layername)
        this.bottom = layername
        this.snackbar = true
        this.message = `将魔方底色设置为${layername}色`
    }

}

</script>


<style scoped>
.bottomlayercolor{
    text-align: center;
    height: 100px;
    align-items: center;
}
.bottomlayercolor:hover{
    text-align: center;
    height: 100px;
    transform: scale(0.9);
}


</style>