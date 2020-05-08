import Vue from 'vue'
import App from './App.vue'
import element from 'element-ui'
import ElmeUI from './index.js'
Vue.use(ElmeUI)
Vue.use(element)
new Vue({
  el: '#app',
  render: h => h(App)
})
