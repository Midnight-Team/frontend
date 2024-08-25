
const routes = [
  {
    path: '/',
    component: () => import('layouts/LandingLayout.vue'),
  },
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/login/UsuarioLoginPage.vue') },
      { path: 'host', component: () => import('pages/login/HostLoginPage.vue') },
    ]
  },
  {
    path: '/app',
    component: () => import('src/layouts/HostLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/host/IndexPage.vue') },
      { path: 'recarregar', component: () => import('pages/host/RecarregarPurpleCoinsPage.vue') },
      { path: 'acesso', component: () => import('pages/host/AcessoPage.vue')},
      { path: 'suporte', component: () => import('pages/suporte/SuporteHostPage.vue')},
    ]
  },
  {
    path: '/eventos',
    component: () => import('src/layouts/HostLayout.vue'),
    children: [
      { path: '', component: () => import('pages/host/evento/MeusEventosPage.vue') },
      { path: 'criar', component: () => import('pages/host/evento/StepsPage.vue') },
      { path: 'gerenciar', component: () => import('pages/host/evento/EventoUnicoHostPage.vue') },
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
    path: '/eu',
    component: () => import('src/layouts/UserLayout.vue'),
    children: [
      { path: '', component: () => import('pages/usuario/IndexPage.vue') },
      { path: 'buscar', component: () => import('pages/usuario/BuscarEventoPage.vue') },
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
