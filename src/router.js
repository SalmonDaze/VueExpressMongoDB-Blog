import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/user/Home.vue'
import register from './views/registe/register.vue'
import login from './views/registe/login.vue'
import user from './views/user/userPage.vue'
import articleList from './views/user/articleList.vue'
import admin from './views/admin/adminIndex.vue'
import admin_info from './views/admin/admin_info.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'/register',
      name:'register',
      component: register
    },{
      path:'/login',
      name:'login',
      component:login
    },{
      path:'/user/:id',
      name:'userPage',
      component:user
    },{
      path:'/addArticle',
      name:'addArticle',
      component:articleList
    },{
      path:'/admin',
      name:'admin',
      component:admin,
      children:[
        {
          path:'info',
          name:'admin_info',
          component:admin_info,
        }
      ]
    }
  ]
})
