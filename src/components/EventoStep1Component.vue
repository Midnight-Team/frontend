<template>
    <div class="es1 bg-white q-mx-sm  rounded-borders shadow-4 relative">
        <div class="title-1 w100 text-h6 row items-center text-primary shadow-1 q-py-xs justify-center text-bold">
            <q-icon size="md" color="primary" name="event" class="q-pr-sm" />
            Informações do Evento
        </div>
        <div class="column q-gutter-y-md q-pa-md q-mb-xl">
            <q-input filled class="q-mt-lg" v-model="evento.titulo" label="Título*" />
            <q-input filled type="textarea" v-model="evento.descricao" label="Descrição*" />
            <q-input filled type="textarea" v-model="evento.endereco" label="Endereço*" />
            <q-input filled type="textarea" v-model="evento.contato" label="Contato*" />
            <q-input filled v-model="evento.categoria" label="Categoria*"
                placeholder="ex: Evento Automobilístico, Festas de Fim de Ano..." />
            <div class="q-gutter-y-sm column">
                <div class="row items-center text-h6 text-primary justify-center no-wrap q-gutter-x-sm">
                    <q-icon color="primary" size="md" name="schedule" />
                    <div>
                        Hora e Data do Evento
                    </div>
                    <q-icon color="primary" size="md" name="today" />
                </div>
                <div class="row no-wrap q-mr-md">
                    <q-input label="Hora Início*" class="q-mt-md q-ml-md" style="width: 45%;" outlined
                        v-model="evento.hora_evento" mask="time" :rules="['time']">
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
                    <q-input label="Hora Fim*" class="q-mt-md q-ml-md" style="width: 45%;" outlined
                        v-model="evento.hora_final" mask="time" :rules="['time']">
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
                </div>
                <div class="q-mx-md">
                    <q-date class="w100" v-model="evento.data_evento" mask="DD-MM-YYYY HH:mm" color="primary" />
                </div>
            </div>
            <div class="text-primary saldo row items-center">
                <div class="row items-center q-gutter-x-xs">
                    <div>
                        Meu Saldo:
                    </div>
                    <div class="text-bold text-primary q-px-xs">{{authStore.getInfoPurpleCoins()}}</div>
                    <div class="text-bold mid-opacity text-primary">PurpleCoins</div>
                    <q-icon name="paid" size="md" class="q-pr-sm" color="primary" />
                </div>
                <q-btn label="Recarregar PurpleCoins" icon-right="currency_exchange" to="/app/recarregar" />
            </div>
            <q-select outlined v-model="evento.qtd_ingressos_inicial" label="Quantidade de Ingressos Inicial*"
                :options="evento.qtd_ingressos_inicialOptions" />
            <q-input filled v-model="evento.img_url" label="URL da Imagem do Evento">
                <template v-slot:append>
                    <q-btn flat icon="image" @click="verImg(evento.img_url)" color="primary" />
                </template>
            </q-input>
            <q-input filled v-model="evento.localizacao" label="Localização Google Maps">
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
import { useAuthStore } from 'src/stores/authStore';

const authStore = useAuthStore();
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
    hora_final: '',
    qtd_ingressos_inicial: null,
    qtd_ingressos_inicialOptions: [
        { value: 1, label: '6% de Cada Ingresso - 1000 ingressos', purpleCoins: 0, max_ingressos: 1000, },
        { value: 2, label: '0% de taxa - 100 ingressos por 1 PurpleCoin🟣', purpleCoins: 1, max_ingressos: 100, },
        { value: 3, label: '0% de taxa - 200 ingressos por 2 PurpleCoins🟣', purpleCoins: 2, max_ingressos: 200 },
        { value: 4, label: '0% de taxa - 300 ingressos por 3 PurpleCoins🟣', purpleCoins: 3, max_ingressos: 300 },
        { value: 5, label: '0% de taxa - 2000 ingressos por 10 PurpleCoins🟣', purpleCoins: 10, max_ingressos: 2000 }
    ],
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