<template>
    <q-page class="column bg-grad-3 q-px-md q-pb-md" id="dialog-evento" v-if="pageLoaded">
        <div class="w100 q-mt-md rounded-borders">
            <div id="title-menu" class="text-h5 text-center text-purple-1 rounded-borders bg-grad-1 q-pa-md  text-bold">
                {{ evento.titulo }}
            </div>
        </div>
        <div class="q-px-md q-gutter-y-md q-mt-md bg-glass-1 rounded-borders q-pb-md">
            <div class="text-h6 text-primary text-bold" id="text-menu">
                <q-icon name="nightlife" size="md" class="text-primary" />
                EVENTO
            </div>
            <div class="w100">
                {{ evento.status }}
            </div>
            <q-input type="textarea" label="Descrição" v-model="evento.descricao" outlined color="primary"
                readonly></q-input>
            <q-input label="Data" v-model="evento.data_evento" outlined color="primary" readonly></q-input>
            <div class="row q-gutter-x-md no-wrap">
                <q-input label="Hora" v-model="evento.hora_evento" outlined color="primary" readonly></q-input>
                <q-input v-if="evento.hora_final" label="Hora Fim" v-model="evento.hora_final" outlined color="primary"
                    readonly></q-input>
            </div>
            <q-input label="Endereço" v-model="evento.endereco" outlined color="primary" readonly></q-input>
            <q-input label="Local" v-model="evento.localizacao" outlined color="primary" readonly></q-input>
            <div v-if="evento.localizacao && !evento.localizacao.trim() == ''" class="w100 q-mt-md rounded-borders">
                <iframe :src="evento.localizacao" class="w100 rounded-borders shadow-2" height="120" style="border:0;" allowfullscreen=""
                    loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div class="w100">
                <img id="img-evento" :src="evento.img_url" alt="">
            </div>
        </div>
        <div id="pacote-info" class="bg-glass-1 rounded-borders q-pa-md q-mt-md">
            <div class="text-h6 text-primary text-bold " id="text-menu">
                <q-icon name="local_atm" size="md" class="text-primary" />
                PACOTE
            </div>
            <div class="w100 text-primary text-bold mid-opacity">
                {{ evento.pacote.label }}<br>
                Máximo de Ingressos: {{ evento.pacote.max_ingressos}}<br>
            </div>
        </div>
        <div id="subhost-info" class="bg-glass-1 rounded-borders q-pa-md q-mt-md">
            <div class="text-h6 text-primary text-bold " id="text-menu">
                <q-icon name="groups" size="md" class="text-primary" />
                ACESSO
            </div>
            <div class="w100 text-primary text-bold mid-opacity">
                <!-- faça um v-for no evento.subhosts mostrando o id e o nome -->
                <div class="row no-wrap items-center no-wrap q-py-sm q-mt-md" v-for="subhost in evento.subhosts" :key="subhost.id" style="border-bottom: 4px solid #872DE1;border-top: 4px solid #872DE1">
                    <q-icon name="person" size="xl"></q-icon>
                    <div class="column q-ml-sm">
                        <div>{{ subhost.nome }}</div>
                        <div>{{ subhost.id }}</div>
                    </div>
                </div>
            </div>
        </div>

    </q-page>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { api } from 'src/boot/axios';

const evento = ref({})
const pageLoaded = ref(false)
onBeforeUnmount(() => {
    // sessionStorage.removeItem('eventoHandlerId')
})

onBeforeMount(async () => {
    const host = JSON.parse(sessionStorage.getItem('userLogado'));
    await api.post(`/get_evento_host`, {
        evento: {
            id: sessionStorage.getItem('eventoHandlerId')
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
        }).finally(() => {
            pageLoaded.value = true
        })
})



</script>

<style scoped>
@media (min-width: 1100px) {
    .q-page {
        padding: 16px 200px;
    }
}
#img-evento {
    width: 100%;
    height: 200px;
    border-radius: 10px;
}
</style>