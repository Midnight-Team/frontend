<template>
    <q-layout view="hHh lpR lFr">

        <q-header class="bg-grad-1 text-white" height-hint="98">
            <q-toolbar>
                <q-toolbar-title class="row items-center">
                    <q-avatar>
                        <q-icon size="md" color="purple-1" name="local_activity" />
                    </q-avatar>
                    <a @click="goTo('/eu')" style="text-decoration: none;" id="title-layout"
                        class="text-purple-1 q-pl-xs text-bold">
                        Midnight Tickets
                    </a>
                </q-toolbar-title>

                <q-btn style="rounded-borders " size="md" icon="menu" />
            </q-toolbar>

            <q-tabs align="center">
                <q-route-tab class="text-purple-1" to="#ingressos" label="Meus Ingressos" />
                <q-route-tab class="text-purple-1" to="#buscar-evento" label="Buscar Eventos" />
            </q-tabs>
        </q-header>

        <!-- <q-drawer show-if-above v-model="rightDrawerOpen" side="right" class="bg-grad-1">
        <div  v-if="isAuthenticated" class="text-center text-purple-1 mid-opacity text-bold q-mb-md "><q-btn @click="goTo({to:'/app', selected:false})" label="Perfil" flat ></q-btn></div>

        <div v-if="!isAuthenticated" class="w100 text-white text-bold row items-center justify-center q-mt-xl">
          <div class="text-center q-mb-md q-mx-md">
            Registre-se ou Faça Login para ter acesso aos seus Eventos e Ingressos!!
          </div>
          <q-btn v-if="!isAuthenticated" class="q-mt-lg" to="/" label="Página Inicial" color="primary"
            icon="home" />
        </div>
        <div class="absolute-bottom w100  row no-wrap items-center justify-center q-mt-xl text-primary q-py-sm">
          <div class="row items-center ">
            <q-avatar>
              <q-icon size="md" color="blue-1" name="support_agent" />
            </q-avatar>
            <a href="https://samuelvictorol.github.io/portfolio/contato" target="_blank" style="text-decoration: none;" class="text-blue-1 q-pl-xs text-bold">
              Suporte
            </a>
          </div>
        </div>
      </q-drawer>
   -->
        <q-page-container>
            <router-view />
        </q-page-container>

    </q-layout>
</template>

<script setup>
import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'

const rightDrawerOpen = ref(false)
const router = useRouter()
const isMobile = window.innerWidth < 800

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