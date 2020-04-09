import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'
// import moduleName from './plugins/visualcube/Player/index';
import CubeRenderer from './plugins/cubestack/cuber/renderer'

Vue.config.productionTip = false
Vue.prototype.$cuberender = new CubeRenderer()
Vue.prototype.vuetify = vuetify

Vue.prototype.$http = axios.create({
  // baseURL : 'http://localhost:3000'
  baseURL : 'https://solarsunrise.cn/api/cubenode/'
  // baseURL : 'http://192.168.1.6:3000'
})


let vm = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
export default vm;