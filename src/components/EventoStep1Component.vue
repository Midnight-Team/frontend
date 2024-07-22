<template>
    <div class="es1 bg-white q-mx-sm  rounded-borders shadow-4 relative">
        <div class="title-1 w100 text-h6 row items-center text-primary shadow-1 q-py-xs justify-center text-bold">
            <q-icon size="md" color="primary" name="event" class="q-pr-sm" />
            Informações do Evento
        </div>
        <div class="column q-gutter-y-md q-pa-md q-mb-xl">
            <q-input outlined class="q-mt-lg" v-model="evento.titulo" label="Título*" />
            <q-input outlined type="textarea" v-model="evento.descricao" label="Descrição*" />
            <q-input outlined type="textarea" v-model="evento.endereco" label="Endereço*" />
            <q-input outlined type="textarea" v-model="evento.contato" label="Contato*" />
            <q-input outlined v-model="evento.categoria" label="Categoria*"
                placeholder="ex: Evento Automobilístico, Festas de Fim de Ano..." />
            <div class="q-gutter-y-sm column">
                <div class="text-h6 text-primary">Data e Hora do Evento</div>
                <q-input label="Hora*" class="q-ml-md" style="width: 45%;" outlined v-model="evento.hora_evento" mask="time"
                    :rules="['time']">
                    <template v-slot:append>
                        <q-icon name="access_time" color="primary" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-time v-model="evento.hora_evento">
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                </q-time>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
                <div class="q-mx-md">
                    <q-date class="w100" v-model="evento.data_evento" mask="DD-MM-YYYY HH:mm" color="primary" />
                </div>
            </div>
            <q-input outlined v-model="qtd_ingressos_inicial" label="Quantidade de Ingressos* (limite)" mask="#####"
                maxlength="6" />
            <q-input outlined v-model="evento.localizacao" label="Localização Google Maps">
                <template v-slot:append>
                    <q-btn flat icon="pin_drop" @click="window.open(evento.localizacao)" color="primary" />
                </template>
            </q-input>
            <div class="w100 hline bg-primary"></div>
            <q-btn label="próximo" color="primary" @click="goNext()" icon-right="skip_next" />
            <q-btn label="meus eventos" flat color="primary" @click="returnEventos()" />
        </div>

    </div>
</template>

<script setup>
import { ref, defineEmits, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter()
const emit = defineEmits(['next', 'prev'])

const goNext = () => {
    emit('next')
}

const returnEventos = () => {
    router.push('/evento')
}

const evento = ref({
    titulo: '',
    descricao: '',
    endereco: '',
    categoria: '',
    contato: '',
    localizacao: '',
    data_evento: '',
    hora_evento: '',
    qtd_ingressos_inicial: 0,
    img_url: '',
    tipos_ingressos: [],
    ingressos: [],
})

onMounted(() => {
    window.scrollTo(0, 0);
})
</script>

<style scoped>
.title-1 {
    position: sticky;
    top: 138px;
    background: #efefef4d;
    backdrop-filter: blur(2px);
    z-index: 1;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}
</style>