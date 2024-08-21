<template>
    <q-page class="relative column no-wrap items-center animate__animated animate__fadeIn bg-grad-2">
        <div class="w100 row no-wrap justify-between q-px-xs q-py-md" id="fixed-saldo">
            <div class="row items-center">
                <q-icon name="paid" color=primary size="md" />
                <div class="text-bold text-primary q-px-sm">{{ authStore.getInfoPurpleCoins() }} PurpleCoins</div>
            </div>
            <div class="row items-center">
                <div class="text-bold text-blue q-px-sm">{{ authStore.getInfoSubCoins() }} SubCoins</div>
                <q-icon name="savings" color="blue" size="md" />
            </div>
        </div>

        <div class="wrapper-responsive q-mt-xl  q-px-sm">
            <div
                class="w100 row items-center justify-center q-py-md q-mt-lg q-mb-md  rounded-borders text-white bg-grad-1 shadow-1">
                <q-icon size="md" color="white" name="currency_exchange" />
                <div class="text-center text-h6 text-bold q-px-md ">RECARREGAR MOEDAS</div>
            </div>
            <q-card style="border-radius: 16px;border: 2px solid #6D2EDD;border-bottom: 10px solid #6D2EDD;"
                class="bg-blue-1 w100 shadow-3 animate__animated animate__zoomIn animate__delay-1s">
                <q-card-section>
                    <q-item class="column q-mb-sm option" style="border-radius: 12px;border: 2px solid #6310E1;"
                        v-for="item in pacotesCoins" :key="item.label" clickable>
                        <q-item-section avatar>
                            <q-icon color="secondary" size="sm" name="paid" />
                        </q-item-section>
                        <q-item-section style="font-size:1rem" class="text-bold text-primary q-px-xs q-pb-md q-pt-sm">
                            <q-item-label>{{ item.label }}
                                <div class="text-blue" v-if="item.value == 4">+ 50 subcoins</div>
                                <div class="text-blue" v-if="item.value == 5">+ 150 subcoins</div>
                            </q-item-label>
                        </q-item-section>
                        <div>
                            <q-btn class="text-bold absolute-right" style="border-radius:10px;width:45%" dense
                                @click="addRecargaPacote(item)"
                                :label="(formatString(item.preco))"
                                color="green-6" icon="shopping_cart" />
                        </div>
                    </q-item>
                </q-card-section>
            </q-card>
            <div class="wrapper-responsive q-px-sm">
                <div
                    class="w100 row items-center justify-center q-py-md q-mb-md q-mt-md rounded-borders text-white bg-grad-1 shadow-1">
                    <q-icon size="md" color="white" name="confirmation_number" />
                    <div class="text-center text-h6 text-bold q-pl-sm ">PACOTES DE INGRESSOS</div>
                </div>

                <div id="tabela-pacotes">
                    <q-card style="border-radius: 16px;border: 2px solid #6D2EDD;border-bottom: 10px solid #6D2EDD;"
                        class="bg-blue-1 w100 shadow-3 animate__animated animate__zoomIn animate__delay-1s">
                        <q-card-section>
                            <q-item class="q-mb-sm option" style="border-radius: 12px;border: 2px solid #6310E1;"
                                v-for="item in pacoteOptions" :key="item.label" clickable>
                                <q-item-section class="text-bold text-primary">
                                    <q-item-label>🎫 {{ item.max_ingressos }} Ingressos - {{ item.purpleCoins }}
                                        Moeda(s)🟣</q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-card-section>
                    </q-card>
                </div>
            </div>
            <div
                class="w100 row items-center justify-center q-py-md q-mt-md  q-mb-md rounded-borders shadow-4 text-primary q-pa-md bg-blue">
                <q-icon size="md" color="blue-1" name="savings" />
                <div class="text-white text-bold q-pl-sm">+</div>
                <q-icon size="sm" class="q-mx-sm" color="white" name="currency_exchange" />
                <div class="q-pr-xs text-bold text-white">=</div>
                <q-icon size="md" color="primary" name="paid" />
                <div class="text-center text-white text-h6 text-bold q-px-md q-pb-sm ">Transforme suas SubCoins em
                    PurpleCoins</div>
                <div class="row q-mt-md q-mx-xl no-wrap text-center">
                    <q-btn @click="cashback()" label="Trocar 5.000 SubCoins em 1 PurpleCoin" color="primary"
                        class="text-center q-pa-md" icon-right="paid" />
                </div>
            </div>
        </div>
        <q-dialog class="animate__animated animate__fadeIn" persistent v-model="openPaymentModal"
            style="backdrop-filter: blur(4px);">
            <div style="border-radius: 16px"
                class="item-selecionado bg-primary q-mb-md rounded-borders q-pa-md text-blue-4 text-bold">
                <div class="q-pa-md" id="title">Confirmar Recarga
                </div>
                <div class="text-center text-h5 text-bold text-grey-3 q-my-md">
                    {{ itemSelected.label }} por<br> {{
                        formatString(itemSelected.preco) }} </div>
                <!-- <div style="font-size:.5rem" class=" text-bold text-blue-2">
                        Você será Redirecionado para o Ambiente de Pagamento
                    </div> -->
                <RecargaBricksPaymentComponent />
                <div class="row w100 justify-center">
                    <q-btn class="" label="voltar" flat color="secondary" @click="openPaymentModal = false" />
                </div>
            </div>
        </q-dialog>
        <div class="w100 q-mt-lg">
            <FooterComponent />
        </div>
    </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import FooterComponent from "../components/FooterComponent.vue";
import RecargaBricksPaymentComponent from "../components/RecargaBricksPaymentComponent.vue";
import { useAuthStore } from 'src/stores/authStore';
import { api } from 'src/boot/axios';
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const router = useRouter();
const $q = useQuasar()
const itemSelected = ref('');
const openPaymentModal = ref(false);
const addRecargaPacote = (pacote) => {
    itemSelected.value = pacote;
    openPaymentModal.value = false;
    sessionStorage.getItem('recargaPacote') && sessionStorage.removeItem('recargaPacote');
    sessionStorage.setItem('recargaPacote', JSON.stringify(pacote));
    openPaymentModal.value = true;
}
const authStore = useAuthStore();

async function cashback() {
    const userLogado = JSON.parse(sessionStorage.getItem('userLogado'));
    await api.post('/cashback', userLogado)
        .then((response) => {
            $q.notify({
                color: 'positive',
                position: 'top',
                message: response.data,
                icon: 'paid'
            });
            router.push('/app');
        })
        .catch((error) => {
            $q.notify({
                color: 'negative',
                position: 'top',
                message: error.response.data.error,
                icon: 'attach_money'
            });
        });
}

const pacoteOptions = [
    { value: 1, label: '0% taxa 50 ingressos por 1p🟣', purpleCoins: 1, max_ingressos: 50, },
    { value: 2, label: '0% taxa 100 ingressos por 2p🟣', purpleCoins: 2, max_ingressos: 100, },
    { value: 3, label: '0% taxa 300 ingressos por 3p🟣', purpleCoins: 3, max_ingressos: 300 },
    { value: 4, label: '0% taxa 600 ingressos por 5p🟣', purpleCoins: 5, max_ingressos: 600 },
    { value: 5, label: '0% taxa 2000 ingressos por 10p🟣', purpleCoins: 10, max_ingressos: 2000 },
    { value: 6, label: '0% taxa 5000 ingressos por 20p🟣', purpleCoins: 20, max_ingressos: 5000 }
]

const pacotesCoins = ref(
    [
        { tipo: 'recarga de purplecoins', id: 1, value: 1, label: '1 PurpleCoin', preco: 120, purpleCoinsCredito: 1, subCoinsCredito: 0 },
        { tipo: 'recarga de purplecoins', id: 2, value: 2, label: '3 PurpleCoins', preco: 300, purpleCoinsCredito: 3, subCoinsCredito: 0 },
        { tipo: 'recarga de purplecoins', id: 3, value: 3, label: '5 PurpleCoins', preco: 500, purpleCoinsCredito: 5, subCoinsCredito: 0 },
        { tipo: 'recarga de purplecoins', id: 4, value: 4, label: '12 PurpleCoins', preco: 1000, purpleCoinsCredito: 12, subCoinsCredito: 50 },
        { tipo: 'recarga de purplecoins', id: 5, value: 5, label: '25 PurpleCoins', preco: 2000, purpleCoinsCredito: 25, subCoinsCredito: 150 },
        // { tipo: 'teste 1 real', id: 6, value: 6, label: '10 SubCoins', preco: 1, purpleCoinsCredito: 0, subCoinsCredito: 10 },
    ]
)

onMounted(() => {
    sessionStorage.getItem('recargaPacote') && sessionStorage.removeItem('recargaPacote')
})
function formatString(value) {
    return 'R$ ' + (value).toFixed(2).replace('.', ',')
}

</script>

<style scoped>
.q-page {
    max-width: 100vw;
}

.wrapper-responsive {
    width: 600px;
}

@media (max-width: 600px) {

    .wrapper-responsive {
        width: 100%;
    }
}

.line {
    width: 100%;
    height: 1px;
    background-color: #ccc;
}

.option {
    transition: all 0.2s linear;
}

.option:hover {
    background-color: #57c4ff5d;
    border-radius: 12px;
}

#fixed-saldo {
    position: fixed !important;
    top: 50px;
    z-index: 100;
    background-color: rgba(255, 255, 255, 0.718);
    backdrop-filter: blur(8px);
    z-index: 10;
}

@media (min-width: 1000px) {
    #fixed-saldo {
        width: 60%;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
    }
}

.text-blue-2 {
    color: #71c4f7 !important;
}
</style>