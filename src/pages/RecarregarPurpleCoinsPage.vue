<template>
    <q-page class="relative column no-wrap items-center animate__animated animate__fadeIn">
        <div class="w100 row no-wrap justify-between q-px-xs" id="fixed-saldo">
            <div class="row items-center">
                <q-icon name="paid" color=primary size="md"/>
                <div class="text-bold text-primary q-px-sm">3</div>
            </div>
            <div class="row items-center">
                <div class="text-bold text-orange q-px-sm">3</div>
                <q-icon name="savings" color="orange" size="md" />
            </div>
        </div>
        <div class="wrapper-responsive q-mt-lg">
            <div
                class="w100 row items-center justify-center q-py-md q-my-md rounded-borders shadow-4 text-primary q-a bg-orange-4">
                <q-icon size="md" color="primary" name="currency_exchange" />
                <div class="text-center text-bold q-px-sm ">Trocar SubCoins PurpleCoins</div>
                <q-icon size="md" color="primary" name="paid" />
                <div class="row q-mt-md q-mx-xl no-wrap text-center">
                    <q-btn label="Trocar 5.000 SubCoins em 1 PurpleCoin" color="primary" class="text-center q-pa-md" icon-right="paid"/>
                </div>
            </div>
            <div
                class="w100 row items-center justify-center q-py-md q-my-md rounded-borders shadow-4 text-primary bg-white">
                <q-icon size="md" color="primary" name="currency_exchange" />
                <div class="text-center text-bold q-px-sm ">Recarregar PurpleCoins</div>
                <q-icon size="md" color="primary" name="paid" />
            </div>
            <q-card class="bg-grey-2 w100 shadow-3 animate__animated animate__zoomIn animate__delay-1s">
                <q-card-section>
                    <q-item class="q-mb-sm" style="border-radius: 12px;border: 2px solid #6310E1;" v-for="item in pacotesCoins" :key="item.label" clickable>
                        <q-item-section avatar>
                            <q-icon color="primary" size="md" name="paid" />
                        </q-item-section>
                        <q-item-section class="text-bold text-primary">
                            <q-item-label>{{ item.label }}</q-item-label>
                        </q-item-section>
                        <q-item-section>
                            <q-btn
                                :label="'Recarregar ' + (item.valorAvista ? formatString(item.valorAvista) : formatString(item.preco))"
                                color="primary" icon-right="currency_exchange" />
                        </q-item-section>
                    </q-item>
                </q-card-section>
            </q-card>
        </div>
        <div class="w100 q-mt-lg">
            <FooterComponent/>
        </div>
    </q-page>
</template>

<script setup>
import { ref } from "vue";
import FooterComponent from "../components/FooterComponent.vue";

const pacotesCoins = ref(
    [
        { value: 1, label: '1 PurpleCoin', preco: 120, valorAvista: null },
        { value: 3, label: '5 PurpleCoins', preco: 500, valorAvista: null },
        { value: 4, label: '10 PurpleCoins', preco: 10000, valorAvista: 12000 },
        { value: 5, label: '20 PurpleCoins', preco: 14000, valorAvista: 12000 },
    ]
)

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
    .q-page {
        margin: 0 12px;
    }
    .wrapper-responsive {
        width: 100%;
    }
}
.line {
    width: 100%;
    height: 1px;
    background-color: #ccc;
}
#fixed-saldo {
    position: fixed!important;
    top: 6rem;
    z-index: 100;
    background-color: rgba(255, 255, 255, 0.903);
    backdrop-filter: blur(4px);
    z-index: 10;
}
</style>