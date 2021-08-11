import Vue from 'vue'
import VueRouter from 'vue-router'
import Router from 'vue-router'
// import Dept from '../components/Dept.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: ()=> import("../pages/home.vue"),
      children:[
        {
          path:'/information',
          name:'information',
          component: () => import ("../pages/information.vue")
        },
        {
          path:'/addInfor',
          name:'addInfor',
          component: () => import ("../pages/addInfor.vue")
        },
      ]
    },
  ]
    
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
