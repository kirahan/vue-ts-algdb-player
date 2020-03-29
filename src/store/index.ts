import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    'Navigation': [{
      text: 'Home',
      disabled: false,
      to: '/'
    }]
  },
  mutations: {
    setNavigation(state,data){
      state.Navigation = data
    }
  },
  actions: {
    setNavigation(content,data){
      content.commit("setNavigation",data)
    }
  },
  modules: {
  }
})
