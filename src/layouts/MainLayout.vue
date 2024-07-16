<template>
  <q-layout view="hHh lpR lFr">

    <q-header class="bg-grad-1 text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <q-icon size="md" color="white" name="local_activity"/>
          </q-avatar>
          Midnight Tickets
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/" label="Buscar" />
        <q-route-tab to="/page3" label="Meus Eventos" />
      </q-tabs>
    </q-header>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right">
      <div class="w100 flex q-my-lg flex-center">
        <q-avatar style="width:120px;height:120px">
          <img src="https://lh3.googleusercontent.com/p/AF1QipN7ksUb-WdGYoJGLfo_79Mxnf0GNpk1cxsicgm6=s1360-w1360-h1020" alt="">
        </q-avatar>
      </div>
      <div class="text-center text-black text-bold">Externa Produções</div>
      <div class="text-center text-black q-mb-md ">host</div>
      <div class="w100 text-black q-mb-md text-center">
        {{ saldo }}
        <q-icon name="visibility" @click="changeVisibility()" color="grey-6" class="q-pl-sm" size="sm"/> 
      </div>
      <q-list class="text-bold text-primary">
        <q-item v-for="item in menuOptions.items" :key="item.label" clickable>
          <q-item-section avatar>
            <q-icon :name="item.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.label }}</q-item-label>
          </q-item-section>
        </q-item>
        <div class="w100 absolute-bottom flex justify-center q-mb-md">
          <q-btn label="Login ou Criar Conta" color="primary" icon="login"/>
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

const rightDrawerOpen = ref(false)
const saldo = ref('R$ *****,**')
const saldoHandler = ref('R$ 1.200,00')

function changeVisibility() {
  if(saldo.value.includes('*')) {
    saldo.value = saldoHandler.value
  } else {
    saldoHandler.value = saldo.value
    saldo.value = 'R$ ****,**'
  }
}

const menuOptions = ref({
  items: [
    { label: 'Meu perfil', icon: 'person', to: '/page3' },
    { label: 'Meus Eventos', icon: 'date_range', to: '/page3' },
    { label: 'Ver vendas', icon: 'payments', to: '/page3' },
    { label: 'Meus Ingressos', icon: 'local_activity', to: '/page2' },
    { label: 'Planos e Pacotes', icon: 'currency_exchange', to: '/page3' },
    { label: 'Validar Ingresso', icon: 'sensor_occupied', to: '/page3' },
    { label: 'Sair', icon: 'exit_to_app', to: '/page3' }
  ]

})

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value
}
</script>