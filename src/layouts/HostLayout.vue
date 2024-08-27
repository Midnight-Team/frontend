<template>
  <q-layout view="hHh lpR lFr">

    <q-header class="bg-glass-2 text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title class="row items-center">
          <q-avatar>
            <q-icon size="md" color="purple-1" name="local_activity" />
          </q-avatar>
          <a @click="goTo('/app')" style="text-decoration: none;" id="title-layout"
            class="text-purple-1 q-pl-xs text-bold">
            Midnight Tickets
          </a>
        </q-toolbar-title>

        <q-btn style="rounded-borders " size="md" icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>

      <!-- <q-tabs align="center" v-if="!isMobile">
        <q-route-tab class="text-purple-1" to="/app" label="Perfil" />
        <q-route-tab class="text-purple-1" v-if="isAuthenticated && isHost" to="/evento" label="Eventos" />
      </q-tabs> -->
    </q-header>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" class="bg-grad-1">
      <div v-if="isAuthenticated" class="w100 flex q-mb-md flex-center q-mt-lg">
        <q-avatar style="width:110px;height:110px;" class="shadow-2">
          <img :src="authStore.getInfoImg()" alt="">
        </q-avatar>
      </div>
      <div id="title-menu" v-if="isHost" class="text-center text-bold text-purple-1">
        {{ authStore.getInfoRazao().toUpperCase() }}</div>
      <div v-if="isAuthenticated" class="text-center text-purple-1 mid-opacity text-bold q-mb-md "><q-btn
          @click="goTo({ to: '/app', selected: false })" label="Perfil" flat></q-btn></div>
      <q-list v-if="isAuthenticated" class="text-bold text-white">
        <q-item v-for="item in menuOptions.items" :key="item.label" clickable @click="goTo(item)"
          style="border-radius: 8px;"
          :class="'q-mt-md q-mx-md text-blue-2  ' + (item.selected ? 'shadow-inset' : 'shadow-2')">
          <q-item-section avatar>
            <q-icon :name="item.icon" :color="!item.selected ? 'grey-3' : 'secondary'" />
          </q-item-section>
          <q-item-section>
            <q-item-label :class="!item.selected ? 'text-grey-4' : 'text-secondary'">{{ item.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <div v-if="!isAuthenticated" class="w100 text-white text-bold row items-center justify-center q-mt-xl">
        <div class="text-center q-mb-md q-mx-md">
          Registre-se ou Faça Login para ter acesso aos seus Eventos e Ingressos!!
        </div>
        <q-btn v-if="!isAuthenticated" class="q-mt-lg" to="/" label="Página Inicial" color="primary" icon="home" />
      </div>
      <div class="absolute-bottom w100  row no-wrap items-center justify-center q-mt-xl text-primary q-py-sm">
        <div class="row items-center ">
          <q-avatar>
            <q-icon size="md" color="blue-1" name="support_agent" />
          </q-avatar>
          <a href="https://samuelvictorol.github.io/portfolio/contato" target="_blank" style="text-decoration: none;"
            class="text-blue-1 q-pl-xs text-bold">
            Suporte
          </a>
        </div>
      </div>
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
const isMobile = window.innerWidth < 800

const menuOptions = ref({
  items: [
    // HOST MENUS
    { label: 'Eventos', icon: 'calendar_month', to: '/eventos', role: 'host', selected: true, },
    { label: 'Acessos', icon: 'sensor_occupied', to: '/app/acesso', role: 'host', selected: false, },
    { label: 'Recarregar', icon: 'currency_exchange', to: '/app/recarregar', role: 'host', selected: false, },
    { label: 'Sair', icon: 'logout', to: '/', selected: false }
  ]
})
function goTo(item) {
  menuOptions.value.items.forEach(i => i.selected = false)
  item.selected = true
  router.push(item.to)
}

function cleanSessionStorage() {
  sessionStorage.clear()
}

onBeforeUnmount(() => {
  cleanSessionStorage()
})


const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value
}
</script>
<style scoped>
.bg-purple-2 {
  background-color: #8025e22b !important;
}

.shadow-inset {
  box-shadow: inset 0 0 96px 0 rgba(0, 0, 0, 0.552);
}
</style>