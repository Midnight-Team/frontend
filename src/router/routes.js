
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'recarregar', component: () => import('pages/RecarregarPurpleCoinsPage.vue') },
    ]
  },
  {
    path: '/evento',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/evento/MeusEventosPage.vue') },
      { path: 'steps', component: () => import('pages/evento/StepsPage.vue') },
    ]
  },
  {
    path: '/test',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/TestPage.vue') },
    ]
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/login/UsuarioLoginPage.vue') },
      { path: 'host', component: () => import('pages/login/HostLoginPage.vue') },
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
