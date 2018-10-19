import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username:'',
    avatar:'',
  },
  mutations: {
    init(){
      this.username = '',
      this.avatar = ''
    }
  },
  actions: {

  }
})
