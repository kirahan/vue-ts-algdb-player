<template>
  <v-app v-resize="onresize">
     <v-navigation-drawer
      v-model="drawer"
      class="teal lighten-1"
      width=500
      dark
      right
      app
      disable-resize-watcher
    >
      <v-list nav
        class="py-2">

          <v-list-item>
              <v-list-item-avatar>
                <img src="https://randomuser.me/api/portraits/men/81.jpg">
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="title">
                  KiraHan
                  <v-btn color="purple" right absolute small >退出</v-btn>
                </v-list-item-title>
              </v-list-item-content>
          </v-list-item>


          <v-divider></v-divider>
          
          <Cubesample v-if="showcubesample" ref="cubesample"></Cubesample>
          <div v-else>
            <v-subheader  >赞助商</v-subheader>
            <Sponsor :model="sponsorindex"></Sponsor>
          </div>
          
          <v-divider></v-divider>
          <v-subheader>虚拟魔方</v-subheader>
          <Vscube ref="vscube" 
          @setthemecolor="setThemeColors"
          @resetthemecolors="resetThemeColors"
          @savethemecolors="saveThemeColors"
          @switch2cubesample="showcubesample=true"></Vscube>

          <v-divider></v-divider>
          <v-subheader>账号</v-subheader>
          <Account></Account>

          <v-divider></v-divider>
          <v-subheader>热门</v-subheader>
          <Hot></Hot>

          <v-divider></v-divider>
          <v-subheader>统计</v-subheader>
          <Statistic ref="stats"></Statistic>
      
      </v-list>
    </v-navigation-drawer>


    <v-app-bar
        app
        clipped
        color="purple"
        dark
      >
        <v-toolbar-title style="cursor:pointer"  @click="gotoMain()">AlgDb.Player</v-toolbar-title>
        <v-autocomplete
            v-model="select"
            :loading="loading"
            :items="items"
            :search-input.sync="search"
            clearable
            cache-items
            class="mx-4"
            flat
            hide-no-data
            hide-details
            label="search a case"
            solo-inverted
          ></v-autocomplete>
        

        
        <v-btn icon color=""><v-icon>mdi-fullscreen</v-icon></v-btn>
        <v-btn icon color="">
          <v-badge
            overlap
            color="red"
            content="6"
            >
              <v-icon>mdi-bell</v-icon>
            </v-badge>
          
        </v-btn>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      
    </v-app-bar>

    

    <v-content
        app
        
        fluid>
        <v-breadcrumbs
        v-if="!usephoneLayout"
        divider=">" 
        large :items="Navigation" >
        </v-breadcrumbs>
                <router-view ></router-view>

    </v-content>



    <v-bottom-navigation
      :value="activeBtn"
      grow
      app
      color="teal"
      v-if="usephoneLayout"
      >
        <v-btn>
          <span>Recents</span>
          <v-icon>mdi-history</v-icon>
        </v-btn>

        <v-btn>
          <span>Favorites</span>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn>
          <span>Nearby</span>
          <v-icon>mdi-map-marker</v-icon>
        </v-btn>
      </v-bottom-navigation>

    <v-footer app v-if="!usephoneLayout" >
      <span>&copy; 2020</span>
      <v-btn right text absolute :href="githuburl" target="_blank">
        <v-icon>mdi-github</v-icon>
      </v-btn >
    </v-footer>



  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Ref, Provide, Watch} from 'vue-property-decorator'
import {
  State,
  Getter,
  Action,
  Mutation,
  namespace
} from 'vuex-class'
// import { CubeCongfig } from './plugins/v3/cuber/interfaces';
import { CubeCongfig } from './plugins/v4/cuber/interfaces';
import './plugins/icon.css'
import Statistic from './components/statistic.vue'
import Sponsor from './components/sponsor.vue'
import Hot from './components/hot.vue'
import Account from './components/account/index.vue'
import Vscube from './components/vscube/index.vue'
import Cubesample from './components/v4cubesample.vue'



@Component({name:'App',components:{Account,Cubesample,Hot,Vscube,Sponsor,Statistic}})
export default class App extends Vue{
  constructor(){
    super()
  }

  @State Navigation
  @Action setNavigation


  @Ref('stats') statistic: Statistic  
  @Ref('vscube') vscube: Vscube  
  @Ref('cubesample') cubesample: Cubesample

  // -1 means cycle model
  sponsorindex: number = -1
  showcubesample: boolean = false


  activeBtn: number = 1
  drawer:boolean = false
  select:boolean = null
  items = []
  search = null
  loading:boolean = null
  config:boolean =  true
  show2dOr3d:boolean = false
  usephoneLayout: boolean = false
  windowSize = { x: 0,y:0}
  githuburl:string = 'https://github.com/kirahan/vue-ts-algdb-player'
  

  @Watch('drawer')
  onDrawerChange(newvalue){
    if(newvalue){
      this.statistic.gsapdata()
      this.showcubesample = false
    }else{
      // 折叠vscode的设置面板
      this.vscube.tab = ''
    }
  }

  //设置sponsor页面的index
  setSponsorIndex(command){
        this.sponsorindex = command.data
    }

  gotoMain(){
      this.$router.push('/')
    }
  onresize(){
      this.windowSize =  { x: window.innerWidth, y: window.innerHeight }
      this.usephoneLayout = this.windowSize.x <600 ? true : false
  }
  created(){
    this.windowSize =  { x: window.innerWidth, y: window.innerHeight }
    this.usephoneLayout = this.windowSize.x <600 ? true : false
    const nav: object[] = []
    this.setNavigation(nav)
    this.$vuetify.theme.dark = false
  }

  setlocalstorage(){
     let temp: CubeCongfig = {
            model: 'casegroup',
            renderModelName: 'casegroup',
            renderconfig:{
                order: 3,
                size: [300,300],
                coverImgNotModel: true,
                scene:'',
                alg: "",
                masktype: ''
            },
            preferanceModelName: 'casegroup',
            preferanceconfig: {
                    version: "0.1",
                    scale: 50,
                    perspective: 50,
                    angle: 60,
                    gradient: 65,
                    frames: 20,
                    sensitivity: 3,
                    mirror: false,
                    hollow: false,
                    shadow: true,
                },
            playerconfig: {
                autoplay: false,
                loop: false,
                hoverplay: true,
                lock: true,
                breath: false,
                autorotate:false
            },
            themeModelName : 'casegroup',
            themeconfig:{
              version: "0.2",
              dark: false,
              colors: {
                    L: "#B71C1C",
                    R: "#FF6D00",
                    D: "#FFFFFF",
                    U: "#FFD600",
                    F: "#00A020",
                    B: "#0D47A1",
                    Core: "#202020",
                    High: "#FF4081",
                    Gray: "#606060"
              }
            }
            
        }

      let ren = JSON.stringify(temp.renderconfig)
      let pre = JSON.stringify(temp.preferanceconfig)
      let the = JSON.stringify(temp.themeconfig)
      let caseg = JSON.stringify(temp)
      window.localStorage.setItem('theme:casegroup', the)
      window.localStorage.setItem('render:casegroup', ren)
      window.localStorage.setItem('preferance:casegroup', pre)
      window.localStorage.setItem('cubeconfig:casegroup', caseg)
  }

  mounted(){
   

      // setTimeout(() => {
      //   this.sponsorindex = 2
      //   console.log(this.sponsorindex)
      // }, 3000);
  }


  setThemeColors(config){
      this.cubesample.render.setThemeColors(config)
  }

  resetThemeColors(){
      this.cubesample.render.resetThemeColors()
  }

  saveThemeColors(){
    this.cubesample.render.saveThemeColors()
  }

}

</script>
