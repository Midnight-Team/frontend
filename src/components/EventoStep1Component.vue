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
                <div class="row items-center text-h6 text-primary justify-center no-wrap q-gutter-x-sm">
                    <q-icon color="primary" size="md" name="schedule" />
                    <div>
                        Hora e Data do Evento
                    </div>
                    <q-icon color="primary" size="md" name="today" />
                </div>
                <q-input label="Hora*" class="q-mt-md q-ml-md" style="width: 45%;" outlined v-model="evento.hora_evento"
                    mask="time" :rules="['time']">
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
            <div class="text-primary saldo row items-center">
                <div class="row items-center q-gutter-x-xs">
                    <div>
                        Meu Saldo:
                    </div>
                    <div class="text-bold text-primary q-px-xs">3</div>
                    <div class="text-bold mid-opacity text-primary">PurpleCoins</div>
                    <q-icon name="paid" size="md" class="q-pr-sm" color="primary" />
                </div>
                <q-btn label="Recarregar PurpleCoins" icon-right="currency_exchange" to="/" />
            </div>
            <q-select outlined v-model="evento.qtd_ingressos_inicial" label="Quantidade de Ingressos Inicial*"
                :options="evento.qtd_ingressos_inicialOptions" />
            <q-input outlined v-model="evento.img_url" label="URL da Imagem do Evento">
                <template v-slot:append>
                    <q-btn flat icon="image" @click="verImg(evento.img_url)" color="primary" />
                </template>
            </q-input>
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
    qtd_ingressos_inicial: null,
    qtd_ingressos_inicialOptions: ['50 ingressos por 1 PurpleCoin🟣', '100 ingressos por 2 PurpleCoins🟣', '300 ingressos por 3 PurpleCoins🟣', '500 ingressos por 4 PurpleCoins🟣', '750 ingressos por 5 PurpleCoins🟣', '1.000  ingressos por 8 PurpleCoins🟣', '10.000  ingressos por 12 PurpleCoins🟣', '20.000 ingressos por 25 PurpleCoins🟣'],
    img_url: '',
    tipos_ingressos: [],
    ingressos: [],
})

function verImg(url) {
    window.open(url, '_blank')
}

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