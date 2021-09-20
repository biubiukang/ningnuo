import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MyPlugin from './utils'
import fastClick from 'fastclick'
import animated from 'animate.css' 
Vue.use(animated)

fastClick.attach(document.body);

// 引入全局样式
import '@/assets/css/index.scss'
// 全局引入按需引入UI库 vant
import '@/plugins/vant'
//  IE 兼容
import '@babel/polyfill'
// 移动端适配
import 'lib-flexible/flexible.js'
// 授权
import '@/permission'

import loadingUIRegistry from './components/FullscreenLoading/index'
Vue.use(loadingUIRegistry)

Vue.config.productionTip = false
Vue.use(MyPlugin)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
