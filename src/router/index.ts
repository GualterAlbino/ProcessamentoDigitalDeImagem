import { createRouter, createWebHistory } from 'vue-router'
import { cROTAS_HOME, cROTAS_DASHBOARD, cROTAS_ERROR } from './ConfigRotas'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // Estrutura do layout
      path: '/layout',
      redirect: '/layout',
      component: () => import('../layouts/Layout.vue'),
      children: [
        {
          path: cROTAS_HOME.home.path,
          name: cROTAS_HOME.home.name,
          component: cROTAS_HOME.home.component
        },
        {
          path: cROTAS_DASHBOARD.dashboard.path,
          name: cROTAS_DASHBOARD.dashboard.name,
          component: cROTAS_DASHBOARD.dashboard.component
        }
      ]
    },

    {
      path: cROTAS_ERROR.error404.path,
      name: cROTAS_ERROR.error404.name,
      component: cROTAS_ERROR.error404.component
    }
  ]
})

export default router
