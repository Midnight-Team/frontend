<template>
    <div class="es1 bg-white q-mx-sm  rounded-borders shadow-4 relative">
        <div class="title-1 w100 text-h6 row items-center text-primary shadow-1 q-py-xs justify-center text-bold">
            <q-icon size="md" color="primary" name="event" class="q-pr-sm" />
            {{ evento.titulo.trim() != '' ? evento.titulo : 'Informações do Evento' }}
        </div>
        <div class="column q-gutter-y-md q-pa-md q-mb-xl">
            <div class="text-center w100 text-secondary high-opacity text-bold">Preencha as informações para criação do seu
                evento, elas poderão ser editadas posteriormente:</div>
            <q-input maxlength="50" filled class="q-mt-lg" v-model="evento.titulo" label="Título*">
                <template v-slot:append>
                    <q-btn flat icon="nightlife" color="primary" />
                </template>
            </q-input>
            <q-input maxlength="500"  filled type="textarea" v-model="evento.descricao" label="Descrição">
                <template v-slot:append>
                    <q-btn flat icon="info" color="primary" />
                </template>
            </q-input>
            <q-input maxlength="200"  filled type="textarea" v-model="evento.endereco" label="Endereço*">
                <template v-slot:append>
                    <q-btn flat icon="pin_drop" color="primary" />
                </template>
            </q-input>
            <q-input maxlength="100"  filled type="textarea" v-model="evento.contato" label="Contato*">
                <template v-slot:append>
                    <q-btn flat icon="phone" color="primary" />
                </template>
            </q-input>
            <div class="q-gutter-y-sm column">
                <div class="row items-center text-h6 text-primary justify-center no-wrap q-gutter-x-sm">
                    <q-icon color="primary" size="md" name="schedule" />
                    <div>
                        Hora e Data do Evento
                    </div>
                    <q-icon color="primary" size="md" name="today" />
                </div>
                <div class="row no-wrap justify-center items-center q-mr-md">
                    <q-input id="times" label="Início*" class="q-mt-md q-ml-md"  outlined
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
                    <q-input label="Final" class="q-mt-md q-ml-md"  outlined
                        v-model="evento.hora_final" mask="time" :rules="['time']">
                        <template v-slot:append>
                            <q-icon name="access_time" color="primary" class="cursor-pointer">
                                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                    <q-time v-model="evento.hora_final">
                                        <div class="row items-center justify-end">
                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                    </q-time>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                </div>
                <div class="row justify-center">
                    <q-date id="date-picker" class="w100" v-model="evento.data_evento" mask="DD-MM-YYYY HH:mm" color="primary" />
                </div>
            </div>
            <div class="w100 text-bold text-secondary">0% de Taxa sobre a Venda de Ingresso*</div>
            <q-select class="text-bold text-primary" outlined v-model="evento.pacote"
                @update:model-value="checkSaldoToQtdIngressos()" label="Quantidade de Ingressos Inicial*"
                :options="pacoteOptions">
                <template v-slot:prepend>
                    <q-icon name="confirmation_number" color="primary" />
                </template>
            </q-select>
            <div class="text-primary saldo row items-center">
                <div class="row items-center q-gutter-x-xs">
                    <q-icon name="account_balance_wallet" color="primary" size="md"></q-icon>
                    <div class="text-bold text-primary q-px-xs">{{ authStore.getInfoPurpleCoins() }}</div>
                    <div class="text-bold mid-opacity text-primary">PurpleCoins</div>
                    <q-icon name="paid" size="xs" class="q-pr-sm" color="primary" />
                </div>
            </div>
            <q-btn label="Recarregar PurpleCoins" color="primary" glossy  icon-right="currency_exchange" to="/app/recarregar" />

            <q-input maxlength="300" placeholder="Insira a url do banner" filled v-model="evento.img_url"
                label="Link da Imagem do Evento">
                <template v-slot:append>
                    <q-btn flat icon="image" @click="openImgur()" color="primary" />
                </template>
            </q-input>
            <q-input placeholder="Clique no ícone ao lado para ajuda" maxlength="800" filled
                v-model="evento.localizacao" label="Localização Google Maps">
                <template v-slot:append>
                    <q-btn flat icon="map" @click="helpLocGoogle()" color="primary" />
                </template>
            </q-input>
            <div class="w100 hline bg-primary"></div>
            <q-btn :disabled="checkRequiredFields()" label="próximo" color="primary"  @click="goNext()"
                icon-right="skip_next" />
            <q-btn label="meus eventos" flat color="primary" @click="returnEventos()" />
        </div>

    </div>
</template>

<script setup>
import { ref, defineEmits, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from 'src/stores/authStore';
import { useQuasar } from "quasar";

const authStore = useAuthStore();
const router = useRouter()
const emit = defineEmits(['next', 'prev'])
const $q = useQuasar()

const evento = ref({
    titulo: '',
    descricao: '',
    endereco: '',
    contato: '',
    localizacao: '',
    data_evento: '',
    hora_evento: '',
    hora_final: '',
    pacote: null,
    img_url: '',
})

function openImgur() {
    window.open('https://imgur.com/', '_blank')
}

const goNext = () => {
    evento.value.data_evento = evento.value.data_evento.slice(0, 10)
    sessionStorage.setItem('eventoStep1', JSON.stringify(evento.value))
    emit('next')
}

const returnEventos = () => {
    router.push('/eventos')
}

const checkRequiredFields = () => {
    const { titulo, endereco, contato, hora_evento, data_evento, pacote } = evento.value;

    // Verifica se algum campo obrigatório está vazio ou nulo
    if (!titulo || !endereco || !contato || !hora_evento || !data_evento || !pacote) {
        return true;
    }
    console.log(data_evento)
    // Converte a data do formato DD-MM-YYYY para um objeto Date no fuso horário local
    const [day, month, year] = data_evento.slice(0, -6).split('-');
    const dataEventoDate = new Date(year, month - 1, day); // Mês é zero-indexado
    

    // Verifica se a data do evento é anterior ou igual à data de hoje
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0); // Zera as horas para comparar apenas as datas

    if (dataEventoDate < hoje) {
        $q.notify({
            message: 'A data do evento não pode ser anterior à data de hoje',
            color: 'orange-8',
            position: 'top',
            icon: 'event_busy'
        })
        return true;
    }

    return false;
}


const pacoteOptions = [
    { value: 1, label: '50 ingressos por 1 moeda🟣', purpleCoins: 1, max_ingressos: 50, },
    { value: 2, label: '100 ingressos por 2 moedas🟣', purpleCoins: 2, max_ingressos: 100, },
    { value: 3, label: '300 ingressos por 3 moedas🟣', purpleCoins: 3, max_ingressos: 300 },
    { value: 4, label: '600 ingressos por 5 moedas🟣', purpleCoins: 5, max_ingressos: 600 },
    { value: 5, label: '2000 ingressos por 10 moedas🟣', purpleCoins: 10, max_ingressos: 2000 },
    { value: 6, label: '5000 ingressos por 20 moedas🟣', purpleCoins: 20, max_ingressos: 5000 }
]


function verImg(url) {
    window.open(url, '_blank')
}

const helpLocGoogle = () => {
    $q.notify({
        message: 'Para buscar a localização do seu evento acesse o Google Maps, pesquise o local do seu evento, clique em "Compartilhar" e depois em "Incorporar um mapa". Copie e cole o html(iframe) no campo localização.',
        color: 'blue-8',
        position: 'top',
        icon: 'pin_drop',
        timeout: 10000
    })
}

const checkSaldoToQtdIngressos = () => {

    if (authStore.getInfoPurpleCoins() < evento.value.pacote.purpleCoins) {
        $q.notify({
            message: 'Você não tem saldo suficiente para essa quantidade de ingressos',
            color: 'negative',
            position: 'top',
            icon: 'savings'
        })
        evento.value.pacote = null
    }
}

onMounted(() => {
    const es1Storage = sessionStorage.getItem('eventoStep1')
    const es1 = JSON.parse(es1Storage)
    if (es1) {
        evento.value = es1
    }
    window.scrollTo(0, 0);
})

</script>


<style scoped>
.title-1 {
    position: sticky;
    top: 90px;
    background: #efefef4d;
    backdrop-filter: blur(2px);
    z-index: 1;
}

#date-picker {
    width: 30%;
}

</style>