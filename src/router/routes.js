
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
    ]
  },
  {
    path: '/evento',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'steps', component: () => import('pages/evento/StepsPage.vue') },
    ]
  },
  {
    path: '/pacotes',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/pacotes/HostPacotesPage.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
