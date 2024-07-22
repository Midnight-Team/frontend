<template>
    <q-layout class="relative animate__animated animate__fadeIn q-pa-md column items-center justify-center">
        <div class="text-white text-h4 w100 row no-wrap justify-center items-center ">
            <q-avatar>
                <q-icon size="md" color="white" name="local_activity" />
            </q-avatar>
            <div class="text-h6">
                Midnight Tickets
            </div>
        </div>
        <router-view></router-view>
        <q-card id="card-login"
            class="text-bold column items-center justify-center text-primary q-pa-md text-center q-mt-md shadow-8"
            v-if="!isLoginHost">
            <div class="column text-h5 text-primary">LOGIN HOST</div>
            <div>É Produtor de Eventos ou Subhost??</div>
            <q-btn @click="isLoginHost = !isLoginHost" icon-right="admin_panel_settings" label="Faça login Aqui"
            dense class="q-mt-md" color="primary" to="/login/host" />
        </q-card>
        <q-card id="card-login"
            class="w100 column items-center justify-center text-bold text-primary q-pa-md text-center q-mt-md shadow-8"
            v-if="isLoginHost">
            <div class="text-h5 text-primary">LOGIN USUÁRIO</div>
            <div>Deseja Comprar Ingressos e Buscar Eventos??</div>
            <q-btn dense @click="isLoginHost = !isLoginHost" icon-right="person" label="Faça login Aqui" class="q-mt-md"
                color="primary" to="/login" />
        </q-card>
        <q-card class="q-mt-md">
            <q-btn icon="home" label="página inicial" color="primary" flat to="../" />
        </q-card>
    </q-layout>
</template>

<script setup>
import { ref } from "vue";
import FooterComponent from "../components/FooterComponent.vue";
const isLoginHost = ref(false);


</script>

<style>
body{
    overflow-x: hidden!important;
}
.q-layout {
    width: 100vw;
    min-height: 100vh;
}

#card-login {
    width: 600px;
}

@media (max-width: 600px) {
    #card-login {
        width: 90vw;
    }
}
</style>