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

      <q-tabs align="center">
        <q-route-tab v-if="isAuthenticated && isHost" to="/evento" label="Meus Eventos" />
        <q-route-tab to="/app" label="Buscar" />
        <q-route-tab v-if="!isAuthenticated" to="/login" label="Login/Registar-se" />
      </q-tabs>
    </q-header>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" class="bg-grey-3" style="border-left: 4px solid #6310E1">
      <!-- <div class="w100 flex q-my-lg flex-center">
        <q-avatar style="width:120px;height:120px">
          <img src="https://lh3.googleusercontent.com/p/AF1QipN7ksUb-WdGYoJGLfo_79Mxnf0GNpk1cxsicgm6=s1360-w1360-h1020" alt="">
        </q-avatar>
      </div> -->
      <p class="text-h6 text-primary text-bold mid-opacity q-pl-md q-mt-sm">Bem Vindo(a)</p>
      <div v-if="isHost" class="text-center text-bold text-primary">{{authStore.getInfoRazao()}}</div>
      <div class="text-center text-primary mid-opacity text-bold q-mb-md ">{{ authStore.getInfoRole() }}</div>
      <q-list class="text-bold text-primary">
        <q-item v-for="item in menuOptions.items" :key="item.label"
           clickable @click="goTo(item.to)" style="border-radius: 12px;border-right: 3px solid;border-top: 3px solid;" class="q-mt-md q-mx-md bg-purple-2">
          <q-item-section>
            <q-item-label>{{ item.label }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
        </q-item>
        <div v-if="!isAuthenticated" class="w100 row items-center justify-center q-mt-xl">
          <div class="text-center q-mb-md q-mx-md">
            Registre-se ou Faça Login para ter acesso aos seus Eventos e Ingressos!!
          </div>
          <div class="row items-center q-mt-xl">
            <q-avatar>
              <q-icon size="md" color="primary" name="local_activity" />
            </q-avatar>
            Midnight Tickets
          </div>
          <q-btn v-if="!isAuthenticated" class="q-mt-lg" @click="loginLayout('/login')" label="Login ou Criar Conta" color="primary"
            icon="login" />
        </div>
        <div class="absolute-bottom w100  row no-wrap items-center justify-center q-mt-xl text-primary bg-primary q-py-sm">
          <div class="row items-center ">
            <q-avatar>
              <q-icon size="md" color="white" name="local_activity" />
            </q-avatar>
            <a href="/app" style="text-decoration: none;" class="text-white q-pl-xs text-bold">
              Midnight Tickets
            </a>
          </div>
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/authStore';

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
const rightDrawerOpen = ref(false)
const isHost = computed(() => authStore.getInfoRole() == 'host')
const router = useRouter()
const landingLink = !window.location.href.includes('localhost') ? 'https://midnightickets.com' : 'http://localhost:9000'

function goTo(to) {
  router.push(to)
}

const menuOptions = ref({
  items: [
    // HOST MENUS
    { label: 'Novo Evento', icon: 'add_box', to: '/evento/steps', role: 'host' },
    { label: 'Meus Eventos', icon: 'date_range', to: '/evento', role: 'host'  },
    { label: 'Recarregar PurpleCoins', icon: 'currency_exchange', to: '/app/recarregar', role: 'host' },
    // { label: 'Meu perfil', icon: 'person', to: '/page3' },
    // { label: 'Saldo e Vendas', icon: 'payments', to: '/page3' },
    // { label: 'Meus Ingressos', icon: 'local_activity', to: '/page2' },
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
<style scoped>
.bg-purple-2{
    background-color: #8025e22b!important;
}
</style>