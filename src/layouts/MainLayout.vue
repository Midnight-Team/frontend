<template>
  <q-layout view="hHh lpR lFr">

    <q-header class="bg-grad-1 text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title class="row items-center">
          <q-avatar>
            <q-icon size="md" color="white" name="local_activity" />
          </q-avatar>
          <a :href="landingLink" style="text-decoration: none;" class="text-white q-pl-xs text-bold">
            Midnight Tickets
          </a>
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/" label="Buscar" />
        <q-route-tab to="/login" label="Login/Registar-se" />
      </q-tabs>
    </q-header>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right">
      <!-- <div class="w100 flex q-my-lg flex-center">
        <q-avatar style="width:120px;height:120px">
          <img src="https://lh3.googleusercontent.com/p/AF1QipN7ksUb-WdGYoJGLfo_79Mxnf0GNpk1cxsicgm6=s1360-w1360-h1020" alt="">
        </q-avatar>
      </div>
      <div class="text-center text-bold text-primary">Midnight Produções</div> -->
      <!-- <div class="text-center text-primary mid-opacity text-bold q-mb-md ">host</div> -->
      <q-list class="text-bold text-primary">
        <q-item v-for="item in menuOptions.items" :key="item.label" clickable @click="goTo(item.to)">
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.label }}</q-item-label>
          </q-item-section>
        </q-item>
        <div class="w100 row items-center justify-center q-mt-xl">
          <div class="text-center q-mb-md q-mx-md">
            Registre-se ou Faça Login para ter acesso aos seus Eventos e Ingressos!!
          </div>
          <div class="row items-center q-mt-xl">
            <q-avatar>
              <q-icon size="md" color="primary" name="local_activity" />
            </q-avatar>
            Midnight Tickets
          </div>
          <q-btn class="q-mt-lg" @click="loginLayout('/login')" label="Login ou Criar Conta" color="primary"
            icon="login" />
        </div>
        <div id="instagram" class="w100 row no-wrap items-center justify-center q-mt-xl text-primary bg-grey-2 q-py-sm">
          <img src="" alt="">
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const rightDrawerOpen = ref(false)
const saldo = ref('R$ *****,**')
const saldoHandler = ref('R$ 1.200,00')
const router = useRouter()
const landingLink = !window.location.href.includes('localhost') ? 'https://midnightickets.com' : 'http://localhost:9000'

function changeVisibility() {
  if (saldo.value.includes('*')) {
    saldo.value = saldoHandler.value
  } else {
    saldoHandler.value = saldo.value
    saldo.value = 'R$ ****,**'
  }
}

function goTo(to) {
  router.push(to)
}

const menuOptions = ref({
  items: [
    // { label: 'Meu perfil', icon: 'person', to: '/page3' },
    { label: 'Meus Eventos', icon: 'date_range', to: '/evento' },
    // { label: 'Saldo e Vendas', icon: 'payments', to: '/page3' },
    // { label: 'Meus Ingressos', icon: 'local_activity', to: '/page2' },
    { label: 'Recarregar PurpleCoins', icon: 'currency_exchange', to: '/recarregar' },
    // { label: 'Validar Ingresso', icon: 'sensor_occupied', to: '/page3' },
    // { label: 'Test', icon: 'bug_report', to: '/test' }
  ]

})

const loginLayout = (to) => {
  router.push(to)
}

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value
}
</script>