import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MyPlugin from './utils'
import fastClick from 'fastclick'
fastClick.attach(document.body);
Vue.config.productionTip = false
Vue.use(MyPlugin)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
