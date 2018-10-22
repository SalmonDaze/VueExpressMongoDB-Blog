import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username:'',
    avatar:'',
    isLogin:false,
  },
  mutations: {
    init(){
      this.username = '',
      this.avatar = '',
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('avatar')
      sessionStorage.removeItem('isLogin')
      this.isLogin = false
    },
    add_login_user(){
      sessionStorage.setItem('username',this.username)
      sessionStorage.setItem('avatar',this.avatar)
      sessionStorage.setItem('isLogin',true)
    },
  },
  actions: {

  }
})
