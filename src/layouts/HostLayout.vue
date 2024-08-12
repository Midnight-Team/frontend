<template>
  <q-layout view="hHh lpR lFr">

    <q-header class="bg-grad-2 text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title class="row items-center">
          <q-avatar>
            <q-icon size="md" color="purple-1" name="local_activity" />
          </q-avatar>
          <a :href="landingLink" style="text-decoration: none;" id="title-layout" class="text-purple-1 q-pl-xs text-bold">
            Midnight Tickets
          </a>
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab class="text-purple-1" to="/app" label="Perfil" />
        <q-route-tab class="text-purple-1" v-if="isAuthenticated && isHost" to="/evento" label="Eventos" />
      </q-tabs>
    </q-header>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" class="bg-grad-1">
      <!-- <div class="w100 flex q-my-lg flex-center">
        <q-avatar style="width:120px;height:120px">
          <img src="https://lh3.googleusercontent.com/p/AF1QipN7ksUb-WdGYoJGLfo_79Mxnf0GNpk1cxsicgm6=s1360-w1360-h1020" alt="">
        </q-avatar>
      </div> -->
      <p style="letter-spacing:4px" class="text-h6 text-purple-1 text-bold text-center q-mt-sm">MENU</p>
      <p class="text-h6 text-purple-1 text-bold mid-opacity q-pl-md">Bem Vindo(a)</p>
      <div v-if="isHost" class="text-center text-bold text-purple-1">{{authStore.getInfoRazao()}}</div>
      <div class="text-center text-purple-1 mid-opacity text-bold q-mb-md ">{{ authStore.getInfoRole() }}</div>
      <q-list class="text-bold text-white">
        <q-item v-for="item in menuOptions.items" :key="item.label"
           clickable @click="goTo(item.to)" style="border-radius: 12px;" class="shadow-2 q-mt-md q-mx-md bg-primary">
          <q-item-section>
            <q-item-label class="text-white">{{ item.label }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-icon :name="item.icon" color="secondary" />
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
        <div class="absolute-bottom w100  row no-wrap items-center justify-center q-mt-xl text-primary q-py-sm">
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
import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue'
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

function cleanSessionStorage() {
  sessionStorage.clear()
}

onBeforeUnmount(() => {
  cleanSessionStorage()
})

const menuOptions = ref({
  items: [
    // HOST MENUS
    // { label: 'Vendas', icon: 'payments', to: '/app/#' },
    { label: 'Subhosts', icon: 'sensor_occupied', to: '/evento/steps', role: 'host' },
    { label: 'Recarregar', icon: 'currency_exchange', to: '/app/recarregar', role: 'host' },
    // { label: 'Meus Eventos', icon: 'date_range', to: '/evento', role: 'host'  },
    // { label: 'Ingressos', icon: 'confirmation_number', to: '/app/#' },
    // { label: 'Meus Ingressos', icon: 'local_activity', to: '/page2' },
    { label: 'Suporte', icon: 'contact_support', to: '/app/#' },
    { label: 'Logout', icon: 'logout', to: '/' }
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