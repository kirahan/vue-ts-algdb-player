<template>
  <v-app v-resize="onresize">
     <v-navigation-drawer
      v-model="drawer"
      color="teal"
      dark
      right
      app
      disable-resize-watcher
    >
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>快速访问</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
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
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    
    </v-app-bar>

    <v-breadcrumbs
     divider=">" 
     large :items="Navigation" style="padding-top:80px;padding-bottom:0px">
    </v-breadcrumbs>

    <v-content style="padding:0px"
        app
        fluid>
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
    </v-footer>



  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapState} from 'vuex'
import store from './store'
export default Vue.extend({
  name: 'App',
  store,
  components: {
  },
  data: () => ({
      activeBtn:1,
      drawer: false,
      select:null,
      items:[],
      search:null,
      loading:null,
      config:true,
      usephoneLayout:null,
      windowSize: { x: 0,y:0}
  }),
  methods:{
    gotoMain(){
      this.$router.push('/')
    },
    onresize(){
        this.windowSize =  { x: window.innerWidth, y: window.innerHeight }
        this.usephoneLayout = this.windowSize.x<600 ? true : false
    }
  },
  created(){
    this.windowSize =  { x: window.innerWidth, y: window.innerHeight }
    this.usephoneLayout = this.windowSize.x<600 ? true : false
  },
  computed:{
    ...mapState({
      Navigation : store => store['Navigation']
    })
  }
});
</script>
