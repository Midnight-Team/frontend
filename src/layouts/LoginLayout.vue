<template>
    <q-layout class="relative animate__animated animate__fadeIn q-pa-md column items-center justify-center">
        <div class="text-white text-h4 w100 q-mb-md row no-wrap justify-center items-center ">
            <q-avatar>
                <q-icon size="xl" color="white" name="local_activity" />
            </q-avatar>
            <div class="q-pl-sm" id="title-menu">
                Midnight Tickets
            </div>
        </div>
        <router-view></router-view>
        <q-card class="q-mt-md column animate__delay-1s bg-primary-3" style="box-shadow: none!important;">
            <q-btn @click="isLoginHost = !isLoginHost"  v-if="isLoginHost" label="voltar" icon-right="keyboard_return" color="primary" class="bg-white text-primary q-mb-xl" flat to="/login"/>
            <q-btn icon="home" label="página inicial" color="white" flat to="/" />
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