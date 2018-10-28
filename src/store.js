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
    init(state){
      state.username = '',
      state.avatar = '',
      sessionStorage.removeItem('username')
      sessionStorage.removeItem('avatar')
      sessionStorage.removeItem('isLogin')
      state.isLogin = false
    },
    add_login_user(state,payload){
      state.username = payload.username
      state.avatar =  payload.avatar
      sessionStorage.setItem('username',payload.username)
      sessionStorage.setItem('avatar',payload.avatar)
      state.isLogin = sessionStorage.setItem('isLogin',true)
    },
  },
  actions: {

  }
})
