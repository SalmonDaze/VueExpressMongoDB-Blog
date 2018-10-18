import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import  VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VueDraggableResizable from 'vue-draggable-resizable'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.use(VueQuillEditor)
Vue.component('vue-draggable-resizable',VueDraggableResizable)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
