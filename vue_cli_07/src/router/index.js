import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import List from '@/components/list'
import Show from '@/components/show'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/list',
      component: List
    },
    {
      path: '/show',
      component: Show
    }
  ]
})
