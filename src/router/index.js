import Vue from 'vue'
import Router from 'vue-router'
import MainView from '@/components/MainView'
import StatisticsView from '@/components/StatisticsView'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Router)
Vue.use(BootstrapVue)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainView',
      component: MainView
    },
    {
      path: '/statistics',
      name: 'StatisticsView',
      component: StatisticsView
    }
  ]
})
