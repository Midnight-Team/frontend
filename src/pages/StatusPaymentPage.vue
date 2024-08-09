<template>
    <q-page class="q-mt-md column justify-between">
        <div class="w100">
            <q-card class="q-pa-md q-mx-md q-mb-md shadow-1 bg-grad-2 text-white">
                <q-card-section>
                    <div class="text-h5 text-center text-bold">💸 Status Pagamento<br>  #{{ paymentId }}</div>
                </q-card-section>
            </q-card>
        </div>
        <div class="wrapper q-mx-lg q-mb-xl ">
            <div id="statusScreenBrick_container"></div>
            <div v-if="loading" class="row w100 justify-center q-mt-md q-mb-md">
                <q-spinner-ball color="blue" size="xl"/>
                <q-spinner-ball color="blue" size="xl"/>
                <q-spinner-ball color="blue" size="xl"/>
            </div>
            <q-card class="q-mt-md shadow-3" v-if="!loading">
                <q-card-section>
                    <div class="text-h5 text-primary text-bold q-mb-sm">
                        Dados da Compra
                    </div>
                    <div class="q-mb-md" style="font-size:1rem">
                        <q-icon name="payment" color="primary" size="md" />
                        <span class="text-bold text-primary q-pr-sm"> Valor:</span>{{ formatString(recargaPacote.preco) }}
                    </div>
                    <div class="q-mb-md" style="font-size:1rem">
                        <q-icon name="event" color="primary" size="md" />
                        <span class="text-bold text-primary q-pr-sm"> Pacote:</span>{{ recargaPacote.label }}🟣
                    </div>
                    <q-btn
                        class="w100"
                        v-if="!loading"
                        to="/evento"
                        label="Eventos"
                        icon="event"
                        color="primary"
                    />
                </q-card-section>
            </q-card>
            <q-card class="q-pa-md q-mt-md q-mb-xl shadow-2 bg-grad-1">
                <q-btn @click="updateMoneys(true)" style="height:8vh" label="Confirmar Pagamento" icon="paid" icon-right="check" class="w100" color="green"/>
            </q-card>
        </div>
        <FooterComponent />
    </q-page>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
import FooterComponent from "../components/FooterComponent.vue";
import { api } from "src/boot/axios";
import { useRouter } from 'vue-router';

const router = useRouter()
const pctStr = sessionStorage.getItem('recargaPacote');
const recargaPacote = JSON.parse(pctStr);

const loadScript = (src) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
};

function formatString(value) {
    if(typeof value == 'string') {
        value = Number(value)
    }
    return 'R$ ' + (value).toFixed(2).replace('.', ',')
}

async function updateMoneys(isFromBtn) {
    const host = JSON.parse(sessionStorage.getItem('userLogado'));
    await api.post('/update_moneys', {id: host.id})
        .then((res) => {
            sessionStorage.removeItem('userLogado');
            const updateUser = res.data
            updateUser.updatedSessionAt = new Date()
            sessionStorage.setItem('userLogado', JSON.stringify(updateUser));
        })
        .catch((err) => {
            console.log(err)
        })
        if(isFromBtn) {
            router.push('/evento')
        }
}

onBeforeUnmount(async () => {
    await updateMoneys(false)
    sessionStorage.getItem('paymentId') && sessionStorage.removeItem('paymentId')

});

const paymentId = ref()
const loading = ref(true)
onBeforeMount(async () => {
    await loadScript('https://sdk.mercadopago.com/js/v2');
    paymentId.value = sessionStorage.getItem('paymentId')
    const mp = new MercadoPago(process.env.PROD == 'true' ? process.env.PROD_PUBLIC_KEY : process.env.MP_PUBLIC_KEY, { locale: 'pt-BR' });
    const bricksBuilder = mp.bricks();
    const renderStatusScreenBrick = async (bricksBuilder) => {
        const settings = {
            initialization: {
                paymentId: paymentId.value, // Payment identifier, from which the status will be checked
            },
            customization: {
                visual: {
                    hideStatusDetails: false,
                    hideTransactionDate: false,
                    style: {
                        theme: 'flat', // 'default' | 'dark' | 'bootstrap' | 'flat'
                    }
                },
            },
            callbacks: {
                onReady: () => {
                    // Callback called when Brick is ready
                    console.log('status brick is ready')
                    loading.value = false
                },
                onError: (error) => {
                    console.log(error)
                    // Callback called for all Brick error cases
                },
            },
        };
        window.statusScreenBrickController = await bricksBuilder.create('statusScreen', 'statusScreenBrick_container', settings);
    };
    renderStatusScreenBrick(bricksBuilder);
});

</script>

<style scoped>
.q-page {
    min-height: 100vh!important;
}
@media (min-width:1300px) {
    .wrapper{
        margin: 12px 20vw!important;
    }
}

</style>