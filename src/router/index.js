import Vue from 'vue'
import VueRouter from 'vue-router'

//apiTest相关组件
import apiTest from '../views/apiTest.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/apiTest'
  },
  {
    path: '/apiTest',
    component: apiTest,
    children:[
    ]

  },
]

const router = new VueRouter({
  routes
})

export default router
