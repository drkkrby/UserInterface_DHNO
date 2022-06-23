import { createRouter, createWebHistory } from 'vue-router'
import NoSelectedRoleView from '@/views/NoSelectedRole.vue'
import ElectricityTraderView from '@/views/ElectricityTrader.vue'
import GridOperatorView from '@/views/GridOperator.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'NoRoleSelected',
      component: NoSelectedRoleView,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/grid-operator',
      name: 'GridOperator',
      component: GridOperatorView,
      meta: {
        title: 'Grid Operator'
      }
    },
    {
      path: '/electricity-trader',
      name: 'ElectricityTrader',
      component: ElectricityTraderView,
      meta: {
        title: 'Electricity Trader'
      }
    }
  ]
})

export default router
