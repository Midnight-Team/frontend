<template>
    <q-layout class="relative animate__animated animate__fadeIn q-pa-md bg-grad-7 column items-center justify-center">
        <div class="text-white text-h4 w100 q-mb-md row no-wrap justify-center items-center ">
            <q-avatar>
                <q-icon size="xl" color="white" name="local_activity" />
            </q-avatar>
            <div class="q-pl-sm" id="title-menu">
                Entrar
            </div>
        </div>
        <router-view></router-view>
        <q-card class="q-mt-md column  q-mt-xl animate__delay-1s bg-secondary" style="box-shadow: none!important;">
            <q-btn @click="isLoginHost = !isLoginHost"  v-if="isLoginHost" label="voltar" icon-right="keyboard_return" color="primary" class="bg-white text-primary q-mb-xl" flat to="/login"/>
            <q-btn class="high-opacity" icon="home" label="página inicial" color="grey-1" flat to="/" />
        </q-card>
    </q-layout>
</template>

<script setup>
import { ref } from "vue";
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

.bg-primary-3 {
    background-color: #5507E0;
}

#card-login {
    width: 600px;
    border-radius: 16px;
    transition: .3s;
    cursor: pointer;
    position: relative;
}

@media (max-width: 600px) {
    #card-login {
        width: 90vw;
    }
}

.q-btn {
    border-radius: 6px!important;
}
</style>