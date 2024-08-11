<template>
    <div class="column bg-grey-2 q-px-md q-pb-md q-gutter-y-md">
        <q-input label="Titulo" v-model="evento.titulo" outlined color="primary" readonly></q-input>
        <q-input label="Descrição" v-model="evento.descricao" outlined color="primary" readonly></q-input>
        <q-input label="Data" v-model="evento.data_evento" outlined color="primary" readonly></q-input>
        <div class="row q-gutter-x-md no-wrap">
            <q-input label="Hora" v-model="evento.hora_evento" outlined color="primary" readonly></q-input>
            <q-input v-if="evento.hora_final" label="Hora Fim" v-model="evento.hora_final" outlined color="primary" readonly></q-input>
        </div>
        <q-input label="Local" v-model="evento.local" outlined color="primary" readonly></q-input>

    </div>
</template>

<script setup>
import { defineEmits, defineProps, onBeforeMount, ref } from 'vue'
import { api } from 'src/boot/axios';

const emit = defineEmits(['getEventos'])
const props = defineProps({
    eventoHandlerId: {
        type: String,
        required: true
    }
})

const evento = ref({})

onBeforeMount(async () => {
    const host = JSON.parse(sessionStorage.getItem('userLogado'));
    await api.post(`/get_evento_host`, {
        evento: {
            id: props.eventoHandlerId
        },
        host: {
            id: host.id,
            senha: host.senha
        }
    })
    .then(response => {
        evento.value = response.data
    })
    .catch(error => {
        console.log(error)
    })
})



</script>

<style scoped></style>