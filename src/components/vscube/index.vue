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
                                                tileindex
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
                                                        @click="opencolorselect(index)"
                                                            >
                                                            <v-list-item-subtitle class="caption">{{bottomlayer.name}}</v-list-item-subtitle>
                                                    </v-card>
                                                </v-col>
                                            </v-row>
                                        </v-col>


                                        <v-col cols=12 class="preset">
                                            <span >预设</span>
                                            <v-btn @click="saveThemeColors" small color="success">确定</v-btn>
                                            <v-btn @click="resetThemeColors" small color="error">重置</v-btn>
                                        </v-col>

                                        <v-row no-gutters>
                                            <v-col clos=6>
                                                <v-row no-gutters>
                                                    <v-col class="colorset" 
                                                        v-for="(style,index) in stylelist" 
                                                        :key="index" 
                                                        @click="setcolorset($event,style)"
                                                        cols=12>
                                                        <v-row no-gutters>
                                                            <v-col 
                                                            v-for="(face,index) in facelist"
                                                            :key="index"
                                                            cols=2
                                                                >
                                                                <v-card
                                                                    class="pa-2 d-flex facecolor"
                                                                    dark
                                                                    elevation-0
                                                                    tile
                                                                    :color="face.color+style"
                                                                        >
                                                                        <v-list-item-subtitle class="caption">{{face.name}}</v-list-item-subtitle>
                                                                </v-card>
                                                            </v-col>
                                                        </v-row>
                                                    </v-col>
                                                </v-row>
                                            </v-col>

                                            <v-col clos=6>
                                                <v-row no-gutters>
                                                    <v-col class="colorset" 
                                                        v-for="(style,index) in stylelist" 
                                                        :key="index+1231231"
                                                        @click="setcolorset($event,style)"
                                                        cols=12>
                                                        <v-row no-gutters>
                                                            <v-col 
                                                            v-for="(face,index) in facelist2"
                                                            :key="index"
                                                            cols=2
                                                                >
                                                                <v-card
                                                                    class="pa-2 d-flex facecolor"
                                                                    dark
                                                                    elevation-0
                                                                    tile
                                                                    :color="face.color+style"
                                                                        >
                                                                        <v-list-item-subtitle class="caption">{{face.name}}</v-list-item-subtitle>
                                                                </v-card>
                                                            </v-col>
                                                        </v-row>
                                                    </v-col>
                                                </v-row>
                                            </v-col>

                                        </v-row>

                                        

                                        
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



        <v-bottom-sheet 
            dark
            inset
            v-model="colord">
                <v-card flat style="margin: auto; touch-action: none; user-select: none;">
                    <v-container fluid grid-list-md text-xs-center :style="{width:Math.min(size * 8, width) + 'px'}">
                        <v-layout row wrap>
                        <v-flex v-for="item in palette" :key="item" xs2 :style="{padding:size * 0.06 + 'px'}">
                            <v-btn
                            @click="setcolor(item);"
                            :color="item"
                            block
                            depressed
                            style="min-width: 0%; min-height: 0%; margin: 0%; padding: 0%;"
                            :height="size"
                            >
                            </v-btn>
                        </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
        </v-bottom-sheet>
</v-container> 


    
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Prop, Ref, Provide, Watch, Emit} from 'vue-property-decorator'


@Component({name:'Account',components:{}})
export default class Account extends Vue{
    width: number = 0;
    height: number = 0;
    size: number = 0;


    tab:string = ''
    colord: boolean = false
    items =  [
                { tab: 'One', content: '外观' },
                { tab: 'Two', content: '配色' },
                { tab: 'Three', content: '计时' }
            ]
    // 确定点击的是哪一个颜色
    clickcolorindex: number = null
    bottomlist = [
        {name:'蓝',value:'blue',color:'indigo'},
        {name:'绿',value:'green',color:'green'},
        {name:'黄',value:'yellow',color:'yellow'},
        {name:'白',value:'white',color:'grey lighten-1'},
        {name:'橙',value:'orange',color:'orange'},
        {name:'红',value:'red',color:'red'}
        ]
    bottom: string = ''

    facelist = [
        {name:'蓝',value:'blue',color:'indigo'},
        {name:'绿',value:'green',color:'green'},
        {name:'黄',value:'yellow',color:'yellow'},
        {name:'白',value:'white',color:'white'},
        {name:'橙',value:'orange',color:'orange'},
        {name:'红',value:'red',color:'red'}
        ]
    facelist2 = [
        {name:'蓝',value:'blue',color:'blue'},
        {name:'绿',value:'green',color:'light-green'},
        {name:'黄',value:'yellow',color:'amber'},
        {name:'白',value:'white',color:'grey'},
        {name:'橙',value:'orange',color:'orange'},
        {name:'红',value:'red',color:'pink'}
        ]

    stylelist = [
        ' lighten-4',
        ' lighten-3',
        ' lighten-2',
        ' lighten-1',
        ' ',
        ' darken-1',
        ' darken-2',
        ' darken-3',
        ' darken-4',
    ]

    palette: string[] = [
        // YELLOW
        "#FFD600",
        "#FFFF00",
        "#FFFF8D",
        "#FEFE00",
        "#FDD835",
        "#FFC107",
        // ORANGE
        "#FF6D00",
        "#FFA100",
        "#FB8C00",
        "#F57C00",
        "#EF6C00",
        "#E65100",
        // RED
        "#B71C1C",
        "#FF0000",
        "#EE0000",
        "#DD0000",
        "#CC0000",
        "#BF360C",
        // BLUE
        "#0D47A1",
        "#0000FF",
        "#88DDFF",
        "#03A9F4",
        "#1976D2",
        "#1A237E",
        // GREEN
        "#00A020",
        "#00FF00",
        "#76FF03",
        "#00D800",
        "#00A000",
        "#006600",
        // P
        "#FF4081",
        "#EEE8AA",
        "#FF99FF",
        "#A83DD9",
        "#607D8B",
        "#885500",
        // WB
        "#202020",
        "#000000",
        "#606060",
        "#A0A0A0",
        "#D0D0D0",
        "#FFFFFF",
  ];

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

    @Emit('setthemecolor')
    setthemecolor(data){
        return data
    }

    @Emit('resetthemecolors')
    resetThemeColors(){
        this.getlocalstoragecolors()
        this.snackbar = true
        this.message = `重置成功`
        return true
    }

    @Emit('savethemecolors')
    saveThemeColors(){
        this.snackbar = true
        this.message = `设置颜色成功`
        return true
    }


    @Watch('tab')
    onTabChange(){

        // 如果tab有值就将sponsor模块的页面切换到第一页
        // this.setSponsorIndex(0)

        // 不使用sponsor 切换到 示例魔方页面
        this.Switch2CubeSample()
    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.size = Math.ceil(Math.min(this.width / 6, this.height / 12));
        }

    mounted(){
        this.bottom = window.localStorage.getItem('bottomlayer')
        this.resize()
        this.getlocalstoragecolors()

    }
    setbottomlayer(layername){
        window.localStorage.setItem('bottomlayer', layername)
        this.bottom = layername
        this.snackbar = true
        this.message = `将魔方底色设置为${layername}色`
    }

    opencolorselect(index){
        this.colord = true
        this.clickcolorindex = index
    }

    getlocalstoragecolors(){
        let themecolor = JSON.parse(window.localStorage.getItem('cubeconfig:casegroup')).themeconfig.colors        
        this.bottomlist[0].color = themecolor.B
        this.bottomlist[1].color = themecolor.F
        this.bottomlist[2].color = themecolor.U
        this.bottomlist[3].color = themecolor.D
        this.bottomlist[4].color = themecolor.L
        this.bottomlist[5].color = themecolor.R
    }

    setcolor(color){
        // console.log(color)
        console.log(this.clickcolorindex)
        console.log(this.bottomlist)
        this.bottomlist[this.clickcolorindex].color = color
        switch(this.clickcolorindex){
            case 0:
                this.setthemecolor({B:color})
                break
            case 1:
                this.setthemecolor({F:color})
                break
            case 2:
                this.setthemecolor({U:color})
                break
            case 3:
                this.setthemecolor({D:color})
                break
            case 4:
                this.setthemecolor({R:color})
                break
            case 5:
                this.setthemecolor({L:color})
                break
            default:
                break
        }
        this.colord = false
    }

    

    // 选择一种颜色预设
    setcolorset(el,oneset){
        let eles = el.currentTarget.getElementsByClassName('facecolor')
        let colors = []
        for (let ele of eles){
            let color = window.getComputedStyle(ele).backgroundColor
            colors.push(color)
        }

        for(let index in colors){
            this.bottomlist[index].color = colors[index]
        }

        let colorsobj = {
            B: colors[0],
            F: colors[1],
            U: colors[2],
            D: colors[3],
            L: colors[4],
            R: colors[5]
        }   
        this.setthemecolor(colorsobj) 

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
.facecolor{
    text-align: center;
    height: 30px;
    align-items: center;
}
/* .colorset{
} */
.colorset:hover{
    /* border: 2px solid grey; */
    transform: scale(0.9);
}

.preset{
    display: flex;
    justify-content: space-between;
    padding-bottom: 5px;
}


</style>