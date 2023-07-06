

const routes: any[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue'),
    meta: {
      title: '登录',
      ignoreAuth: true,
      hideInMenu: true
    }
  }
]

export default routes
