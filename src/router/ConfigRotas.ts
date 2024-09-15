export const cROTAS_HOME = {
  home: {
    name: 'home',
    path: '/',
    component: () => import('../views/home/Home.vue')
  }
}

export const cROTAS_DASHBOARD = {
  dashboard: {
    name: 'dashboard',
    path: '/dashboard',
    component: () => import('../views/dashboard/Dashboard.vue')
  }
}

export const cROTAS_ERROR = {
  error404: {
    path: '/:pathMatch(.*)*',
    name: 'error404',
    component: () => import('../views/error/Error404Page.vue')
  }
}
