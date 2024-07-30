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
            class=" animate__animated animate__jackInTheBox animate__slower text-bold column bg-grad-2 items-center justify-center text-white q-pa-md text-center q-mt-md shadow-8"
            v-if="!isLoginHost && !isHostUrl">
            <div class="column text-h5 text-white text-bold">LOGIN HOST</div>
            <div>É Produtor de Eventos ou Subhost??</div>
            <q-btn @click="isLoginHost = !isLoginHost" icon-right="admin_panel_settings" label="Faça login Aqui"
            dense class="q-mt-md q-pa-md" color="primary" to="/login/host" />
        </q-card>
        <q-card class="q-mt-md column animate__delay-1s bg-primary-3" style="box-shadow: none!important;">
            <q-btn @click="isLoginHost = !isLoginHost"  v-if="isLoginHost" label="voltar" icon-right="keyboard_return" color="primary" class="bg-white text-primary q-mb-xl" flat to="/login"/>
            <q-btn icon="home" label="página inicial" color="white" flat to="/app" />
        </q-card>
    </q-layout>
</template>

<script setup>
import { ref } from "vue";
const isLoginHost = ref(false);

const isHostUrl = window.location.href.includes('/host')
</script>

<style>
body{
    overflow-x: hidden!important;
}
.q-layout {
    width: 100vw;
    min-height: 100vh;
}

.bg-primary-3 {
    background-color: #5507E0;
}

#card-login {
    width: 600px;
    border-radius: 16px;
    transition: .3s;
    cursor: pointer;
    position: relative;
    border-top: 6px solid #5e1bc2;
    border-bottom: 6px solid #4b149f;
    backdrop-filter: blur(10px);
    filter: drop-shadow(0px 0px 12px #7e06cdb9);
}

@media (max-width: 600px) {
    #card-login {
        width: 90vw;
    }
}

.q-btn {
    border-radius: 16px!important;
}
</style>