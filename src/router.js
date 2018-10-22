import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/user/Home.vue'
import register from './views/registe/register.vue'
import login from './views/registe/login.vue'
import user from './views/user/userPage.vue'
import articleList from './views/user/articleList.vue'
import admin from './views/admin/adminIndex.vue'
import adminInfo from './views/admin/adminInfo.vue'
import adminAddarticle from './views/admin/adminAddarticle.vue'
import adminArticleRevise from './views/admin/adminArticleRevise.vue'
import articleRevisePage from './views/admin/articleRevisePage.vue'
import adminRemoveArticle from './views/admin/adminRemoveArticle.vue'
import adminUserOperate from './views/admin/adminUserOperate.vue'
import adminCategory from './views/admin/adminCategory.vue'
import articleContain from './views/user/articleContain.vue'
import store from './store'


Vue.use(Router)

if(sessionStorage.getItem('username')){
  store.commit('add_login_user',{
    username:sessionStorage.getItem('username'),
    avatar:sessionStorage.getItem('avatar')
  })
}

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },{
      path:'/p/:id',
      name:'article',
      component:articleContain
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
          name:'adminInfo',
          component:adminInfo,
        },{
          path:'addArticle',
          name:'adminAddarticle',
          component:adminAddarticle,
        },{
          path:'ArticleRevise',
          name:'ArticleRevise',
          component:adminArticleRevise,
          children:[
            {
              path:'article/:id',
              name:'articleRevisePage',
              component:articleRevisePage,
            }
          ]
        },{
          path:'adminRemoveArticle',
          name:'adminRemoveArticle',
          component:adminRemoveArticle,
        },{
          path:'adminUserOperate',
          name:'adminUserOperate',
          component:adminUserOperate,
        },{
          path:'adminCategory',
          name:'adminCategory',
          component:adminCategory
        }
      ]
    }
  ]
})
