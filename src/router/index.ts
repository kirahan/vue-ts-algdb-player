import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import showSetOrSubSet  from '../components/showSetOrSubSet.vue'
import showCaseGroup  from '../components/showCaseGroup.vue'
import showCase from '../components/showCase.vue';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path:'/puzzle/:shortname',
    name:'puzzle',
    component: showSetOrSubSet,
    props:true,
  },
  {
    path:'/:puzzle/casegroup/:setname',
    name:'casegroup',
    component: showCaseGroup,
    props:true,
  },
  {
    path:'/:puzzle/:group/case/:casename',
    name:'case',
    component: showCase,
    props:true,
  }

]

const router = new VueRouter({
  routes
})

export default router
