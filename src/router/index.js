import Vue from 'vue'
import VueRouter from 'vue-router'
import SlideCard from '../views/slideCard.vue'
import Result from '../views/result.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: SlideCard
  },
  {
    path: '/result',
    name: 'Result',
    component: Result,
    meta: {
      title: '测试结果',
      keepAlive: false
    }
  }
  
]

const router = new VueRouter({
  routes
})

export default router
