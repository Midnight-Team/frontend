
const routes = [
  {
    path: '/',
    component: () => import('layouts/LandingLayout.vue'),
  },
  {
    path: '/app',
    component: () => import('src/layouts/HostLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'recarregar', component: () => import('pages/RecarregarPurpleCoinsPage.vue') },
      { path: 'acesso', component: () => import('pages/AcessoPage.vue'),
      },
    ]
  },
  {
    path: '/eventos',
    component: () => import('src/layouts/HostLayout.vue'),
    children: [
      { path: '', component: () => import('pages/evento/MeusEventosPage.vue') },
      { path: 'criar', component: () => import('pages/evento/StepsPage.vue') },
      { path: 'gerenciar', component: () => import('pages/evento/EventoUnicoHostPage.vue') },
    ]
  },
  // {
  //   path: '/status-payment',
  //   component: () => import('src/layouts/HostLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/StatusPaymentPage.vue') },
  //   ]
  // },
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
