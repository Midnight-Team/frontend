<template>
    <q-page class="relative column no-wrap items-center animate__animated animate__fadeIn bg-grad-2">
        <div class="w100 row no-wrap justify-between q-px-xs q-py-sm" id="fixed-saldo">
            <div class="row items-center">
                <q-icon name="paid" color=primary size="md" />
                <div class="text-bold text-primary q-px-sm">{{ authStore.getInfoPurpleCoins() }} PurpleCoins</div>
            </div>
            <div class="row items-center">
                <div class="text-bold text-blue q-px-sm">{{ authStore.getInfoSubCoins() }} SubCoins</div>
                <q-icon name="savings" color="blue" size="md" />
            </div>
        </div>
        <div class="wrapper-responsive q-mt-lg q-px-sm">
            <div
                class="w100 row items-center justify-center q-py-md q-mb-md q-mt-xl rounded-borders shadow-4 text-white bg-grad-2">
                <q-icon size="md" color="blue-1" name="currency_exchange" />
                <div class="text-center text-h6 text-bold q-px-md ">Recarregar PurpleCoins</div>
            </div>
            <div
                class="w100 row items-center justify-center q-py-md q-my-md rounded-borders shadow-4 text-primary q-pa-md bg-blue">
                <q-icon size="md" color="blue-1" name="savings" />
                <div class="text-white text-bold q-pl-sm">+</div>
                <q-icon size="sm" class="q-mx-sm" color="white" name="currency_exchange" />
                <div class="q-pr-xs text-bold text-white">=</div>
                <q-icon size="md" color="primary" name="paid" />
                <div class="text-center text-white text-h6 text-bold q-px-md q-pb-sm ">Transforme suas SubCoins em
                    PurpleCoins</div>
                <div class="row q-mt-md q-mx-xl no-wrap text-center">
                    <q-btn label="Trocar 5.000 SubCoins em 1 PurpleCoin" color="primary" class="text-center q-pa-md"
                        icon-right="paid" />
                </div>
            </div>

            <q-card style="border-radius: 16px;border: 2px solid #6D2EDD;border-bottom: 10px solid #6D2EDD;"
                class="bg-blue-1 w100 shadow-3 animate__animated animate__zoomIn animate__delay-1s">
                <q-card-section>
                    <q-item class="q-mb-sm option" style="border-radius: 12px;border: 2px solid #6310E1;"
                        v-for="item in pacotesCoins" :key="item.label" clickable>
                        <q-item-section avatar>
                            <q-icon color="primary" size="md" name="paid" />
                        </q-item-section>
                        <q-item-section class="text-bold text-primary">
                            <q-item-label>{{ item.label }}
                                <div class="text-blue" v-if="item.value == 4">+ 50 subcoins</div>
                                <div class="text-blue" v-if="item.value == 5">+ 150 subcoins</div>
                            </q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-btn class="q-ml-sm"
                                @click="addRecargaPacote(item)"
                                :label="'Recarregar ' + (item.valorAvista ? formatString(item.valorAvista) : formatString(item.preco))"
                                color="primary" icon-right="currency_exchange" />
                        </q-item-section>
                    </q-item>
                </q-card-section>
            </q-card>
        </div>
        <q-dialog class="animate__animated animate__fadeIn " v-model="openPaymentModal" style="backdrop-filter: blur(4px);">
                <div class="item-selecionado bg-grad-4 q-mb-md rounded-borders  text-h6 text-white text-bold text-center" >
                    <q-btn class="" label="Cancelar" flat color="purple-2" @click="openPaymentModal = false" />
                    <div class="q-pa-md">💰 Compra de<br> {{ itemSelected.label }} por {{ formatString(itemSelected.preco) }}</div>
                <RecargaBricksPaymentComponent/>
            </div>
        </q-dialog>
        <div class="w100 q-mt-lg">
            <FooterComponent />
        </div>
    </q-page>
</template>

<script setup>
import { onBeforeUnmount, ref } from "vue";
import FooterComponent from "../components/FooterComponent.vue";
import RecargaBricksPaymentComponent from "../components/RecargaBricksPaymentComponent.vue";
import { useAuthStore } from 'src/stores/authStore';
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
const pacotesCoins = ref(
    [
        { tipo: 'recarga de purplecoins', id: 1,value: 1, label: '1 PurpleCoin', preco: 80, valorAvista: 80 },
        { tipo: 'recarga de purplecoins', id: 2,value: 2, label: '3 PurpleCoins', preco: 300, valorAvista: 300 },
        { tipo: 'recarga de purplecoins', id: 3,value: 3, label: '5 PurpleCoins', preco: 500, valorAvista: 500 },
        { tipo: 'recarga de purplecoins', id: 4,value: 4, label: '12 PurpleCoins', preco: 1000, valorAvista: 1000 },
        { tipo: 'recarga de purplecoins', id: 5,value: 5, label: '25 PurpleCoins', preco: 2000, valorAvista: 2000 },
        { tipo: 'teste 1 real', id: 6,value: 6, label: 'teste PurpleCoins', preco: 1, valorAvista: 1 }
    ]
)

onBeforeUnmount(() => {
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
    min-height: 88vh;
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
    background-color: #4eb2ffbf;
    border-radius: 12px;
}

#fixed-saldo {
    position: fixed !important;
    top: 6rem;
    z-index: 100;
    background-color: rgba(255, 255, 255, 0.718);
    backdrop-filter: blur(8px);
    z-index: 10;
}

@media (min-width: 1000px) {
    #fixed-saldo {
        width: 80%;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
    }
}

</style>