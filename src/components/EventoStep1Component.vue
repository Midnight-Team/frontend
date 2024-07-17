<template>
  <div class="es1 bg-white q-ma-sm  rounded-borders shadow-4 relative">
    <div class="title-1 w100 text-h6 row items-center text-primary shadow-1 q-py-xs justify-center">
        <q-icon size="md" color="primary" name="event" class="q-pr-sm" />
        Informações do Evento
    </div>
    <div class="column q-gutter-y-md q-pa-md q-mb-xl">
        <q-input outlined class="q-mt-lg" v-model="evento.titulo" label="Título*" />
        <q-input outlined type="textarea" v-model="evento.descricao" label="Descrição*" />
        <q-input outlined type="textarea" v-model="evento.endereco" label="Endereço*" />
        <q-input outlined v-model="evento.categoria" label="Categoria*" />
        <q-input outlined v-model="evento.localizacao" label="Localização Google Maps">
            <template v-slot:append>
                <q-btn flat icon="pin_drop" @click="window.open(evento.localizacao)" color="primary" />
            </template>
        </q-input>
        <q-input outlined type="date" v-model="evento.data_evento" label="Data do Evento*" />
        <q-btn label="próximo" color="primary" icon-right="skip_next"/>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";


const evento = ref({
    titulo: '',
    descricao: '',
    endereco: '',
    categoria: '',
    localizacao: '',
    data_evento: '',
    qtd_ingressos_inicial: 0,
    img_url: '',
    tipos_ingressos: [],
    ingressos: [],
})


</script>

<style scoped>
.title-1{
    position: sticky;
    top: 143px;
    background: #efefef4d;
    backdrop-filter: blur(2px);
    z-index: 1;
}
</style>