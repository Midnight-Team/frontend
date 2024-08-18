<template>
    <div class="w100 bg-white">
        <div id="title-menu" class="bg-blue-1 text-primary w100 text-center">Alterar Ingressos</div>
        <div v-for="eventoTipoIngresso in eventoTiposIngressos" :key="eventoTipoIngresso.id">
                <div class="q-pa-md shadow-1">
                    <div class="row no-wrap w100">
                        <div class="text-h6 row items-center text-primary text-bold">
                            <q-badge rounded color="blue"  class="q-mx-xs"/>
                            {{ eventoTipoIngresso.titulo.toUpperCase() }}</div>
                        </div>
                        <div class="q-mb-md">
                            <strong class="text-green-7">R$ {{ eventoTipoIngresso.valor }}</strong><br>
                            <strong class="text-secondary">Ingressos Vendidos: {{ (eventoTipoIngresso.vendidos ? eventoTipoIngresso.vendidos : 8)}}/{{ eventoTipoIngresso.quantidade }}</strong>
                        </div>
                    <q-btn color="primary" label="Alterar" class="w100" icon-right="sell"></q-btn>
                </div>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";

const eventoTiposIngressos = ref([]);
onBeforeMount(async () => {
    eventoTiposIngressos.value = JSON.parse(sessionStorage.getItem("eventoTiposIngressos"));
});
</script>

<style scoped></style>