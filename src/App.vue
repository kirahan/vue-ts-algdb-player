<template>
  <v-app v-resize="onresize">
     <v-navigation-drawer
      v-model="drawer"
      color="teal"
      dark
      app
      :clipped='config'
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
      clipped-left
      color="purple"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
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
    </v-app-bar>

    <v-breadcrumbs
     divider=">" 
     v-if="!usephoneLayout"
     large :items="routehistorys" style="padding-top:80px">
    </v-breadcrumbs>

    <v-content style="padding:10px 0px" 
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

export default Vue.extend({
  name: 'App',

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
      routehistorys: [
        {
          text: 'Dashboard',
          disabled: false,
          href: '/',
        },
        {
          text: 'Link 1',
          disabled: false,
          href: 'breadcrumbs_link_1',
        },
        {
          text: 'Link 2',
          disabled: true,
          href: 'breadcrumbs_link_2',
        },
      ],
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

  }


  
});
</script>


// methods : {
//         titleclass(){}
//     }
