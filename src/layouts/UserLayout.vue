<template>
    <q-layout view="hHh lpR lFr">

        <q-header class="bg-grad-1 text-white" height-hint="98">
            <q-toolbar>
                <q-toolbar-title class="row items-center">
                    <q-avatar>
                        <q-icon size="md" color="purple-1" name="local_activity" />
                    </q-avatar>
                    <a style="text-decoration: none;" id="title-layout" class="text-purple-1 q-pl-xs text-bold">
                        Midnight Tickets
                    </a>
                </q-toolbar-title>

                <q-btn @click="toggleRightDrawer()" style="rounded-borders " size="md" label="menu" glossy
                    icon-right="menu" />
            </q-toolbar>
            <!-- 
            <q-tabs align="center">
                <q-route-tab class="text-purple-1" to="/eu/buscar" label="Eventos" />
                <q-route-tab class="text-purple-1" to="/eu" label="Ingressos" />
            </q-tabs> -->
        </q-header>

        <q-drawer show-if-above v-model="rightDrawerOpen" side="right" class="bg-grad-1">
            <div class="w100 text-center text-grey-3 text-bold q-mt-xl" id="title-menu">
                {{ firstAndLastToUpper(user.nome.trim()) }}
            </div>
            <div class="w100 text-center text-white mid-opacity text-bold">
                {{ user.cpf.toLowerCase() }}
            </div>
            <div class="w100 text-center q-mt-sm">
                <q-btn class="text-bold" color="secondary" flat label="perfil" ></q-btn>
            </div>
            <div class="menu-options q-mt-xl">
                <q-list>
                    <q-item v-for="item in menuOptions.items" :key="item.label" clickable @click="goTo(item)"
                        style="border-radius: 8px;"
                        :class="'q-mt-md q-mx-md text-blue-2  ' + (item.selected ? 'shadow-inset' : 'shadow-2')">
                        <q-item-section avatar>
                            <q-icon :name="item.icon" :color="!item.selected ? 'grey-3' : 'secondary'" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label :class="(!item.selected ? 'text-grey-4' : 'text-secondary') + ' text-bold'">{{
                                item.label }}</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
            <div class="q-px-md absolute-bottom q-mb-lg">
                <q-btn to="/" label="Sair" glossy color="secondary" class="q-mt-xl  w100" />
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

const user = JSON.parse(sessionStorage.getItem('user'))
const rightDrawerOpen = ref(false)
const router = useRouter()
const isMobile = window.innerWidth < 800

const menuOptions = ref({
    items: [
        { label: 'Eventos', icon: 'event', to: '/eu/buscar', selected: true },
        { label: 'Meus Ingressos', icon: 'confirmation_number', to: '/eu', selected: false },
        { label: 'Suporte', icon: 'help', to: '#suporte-usuario', selected: false },
    ]
})

function goTo(item) {
    menuOptions.value.items.forEach(i => i.selected = false)
    item.selected = true
    router.push(item.to)
}

onBeforeUnmount(() => {
    sessionStorage.clear()
})
function firstAndLastToUpper(str) {
    // Dividir a string em palavras
    let words = str.split(' ');

    // Se houver apenas uma palavra, retorna ela em maiúscula
    if (words.length === 1) {
        return words[0].toUpperCase();
    }

    // Obter a primeira e última palavra e convertê-las em maiúsculas
    let firstWord = words[0].toUpperCase();
    let lastWord = words[words.length - 1].toUpperCase();

    // Retornar a primeira e última palavra
    return `${firstWord} ${lastWord}`;
}

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