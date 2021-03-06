import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import showSetOrSubSet  from '../components/showSetOrSubSet.vue'
import showSetOrSubSet  from '../components/v4showSetOrSubSet.vue'
// import showCaseGroup  from '../components/v3showCaseGroup.vue'
import showCaseGroup  from '../components/v4showCaseGroup.vue'
// import showCase from '../components/v3showCase.vue';
import showCase from '../components/v4showCase.vue';
import test from '../components/test.vue';
import v3  from '../components/v3cube.vue'
import v4  from '../components/v4cube.vue'
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
  },
  {
    path:'/test',
    name:'test',
    component:test
  },
  {
    path:'/v3',
    name:'v3',
    component:v3
  },
  {
    path:'/v4',
    name:'v4',
    component:v4
  }


]

const router = new VueRouter({
  mode:'hash',
  routes,
})

export default router
