<template>
    <div class="wrapper">
        <div id="paymentBrick_container">
        </div>
        <div v-if="loading" class="row w100 justify-center q-mt-md q-pb-xl">
            <q-spinner-ball color="blue" size="xl"/>
            <q-spinner-ball color="purple-3" size="xl"/>
            <q-spinner-ball color="blue" size="xl"/>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount, ref } from "vue";
import { useQuasar } from 'quasar';
import { useAuthStore } from 'src/stores/authStore';
import { api } from "src/boot/axios";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const $q = useQuasar()
const pixWindow = ref('');
const valorPagar = ref()
const preferenceId = ref('')
const router = useRouter()
const loading = ref(true)

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
function openPixWindow() {
    $q.notify({
        message: 'Você será redirecionado para o pagamento via PIX',
        color: 'primary',
        position: 'top',
        icon: 'payments',
        timeout: 6000,
        actions: [{ label: 'Abrir Pix', color: 'white', class: 'bg-green', handler: () => { window.open(pixWindow.value, '_blank'); } }]
    });
    setTimeout(() => {
        window.open(pixWindow.value, '_blank');
    }, 2000);
}

onBeforeUnmount(async () => {
    const host = JSON.parse(sessionStorage.getItem('userLogado'));
    await api.post('/update_moneys', {id: host.id})
        .then((res) => {
            sessionStorage.removeItem('userLogado');
            sessionStorage.setItem('userLogado', JSON.stringify(res.data));
        })
})

onBeforeMount(async () => {
    try {
        const pctStr = sessionStorage.getItem('recargaPacote');
        const recargaPacote = JSON.parse(pctStr);
        await loadScript('https://sdk.mercadopago.com/js/v2');
        const mp = new MercadoPago(process.env.PROD == 'true' ? process.env.PROD_PUBLIC_KEY : process.env.MP_PUBLIC_KEY, { locale: 'pt-BR' });
        const bricksBuilder = mp.bricks();
        const createPreference = async () => {
            await api.post('/create_preference', {
                items: [
                    {
                        id: recargaPacote.id,
                        title: 'Compra de ' + recargaPacote.label,
                        quantity: 1,
                        unit_price: recargaPacote.preco,
                        tipo: recargaPacote.tipo,
                    }
                ],
                purpose: 'wallet_purchase'
            }).then(response => {
                valorPagar.value = recargaPacote.preco;
                preferenceId.value = response.data.id;
            }).catch(error => {
                $q.notify({
                    message: 'Erro ao criar preferência de pagamento',
                    color: 'negative',
                    position: 'top',
                    icon: 'error',
                    timeout: 3000
                });
            });
        }
        await createPreference();

        const renderPaymentBrick = async (bricksBuilder) => {
            const settings = {
                initialization: {
                    amount: recargaPacote.preco,
                    payer: {
                        firstName: authStore.getInfoNome(),
                        lastName: authStore.getInfoRazao(),
                        email: authStore.getInfoEmail(),
                    },
                },
                customization: {
                    visual: {
                        style: {
                            theme: "flat",
                        },
                    },
                    paymentMethods: {
                        creditCard: "all",
                        bankTransfer: "all",
                        atm: "all",
                        onboarding_credits: "all",
                        wallet_purchase: "all",
                        maxInstallments: 10
                    }
                    },
                callbacks: {
                    onReady: () => {
                        loading.value = false;
                        console.log('Brick is ready');
                    },
                    onSubmit: ({ selectedPaymentMethod, formData }) => {
                        formData.notification_url = process.env.PROD == 'true' ? process.env.PROD_NOTIFICATION_URL : process.env.DEV_NOTIFICATION_URL;
                        return new Promise((resolve, reject) => {
                            api.post('/process_payment', formData)
                                .then((response) => {
                                    const host = JSON.parse(sessionStorage.getItem('userLogado'));
                                    // console.log(JSON.stringify(formData))
                                    sessionStorage.setItem('paymentId', JSON.stringify(response.data.id))
                                    api.post('/save_recarga_payment', {
                                        payment_id: response.data.id,
                                        specs: {
                                            host_name: host.nome_razao,
                                            transactionData: response.data.point_of_interaction.transaction_data || response.data,
                                            paymentMethod: selectedPaymentMethod,
                                            valorPagar: valorPagar.value
                                        },
                                        host: authStore.getInfoId()
                                    }).then(()=> resolve())
                                    // console.log('Payment response:', JSON.stringify(response.point_of_interaction.transaction_data));
                                    if (formData.payment_method_id === 'pix') {
                                        pixWindow.value = response.data.point_of_interaction.transaction_data.ticket_url;
                                        openPixWindow();
                                    }
                                    // console.log(JSON.stringify(response.data));
                                    router.push('/status-payment')
                                    resolve();
                                })
                                .catch((error) => {
                                    console.error('Payment error:', error);
                                    reject();
                                });
                        });
                    },
                    onError: (error) => {
                        console.error('Brick error:', error);
                    },
                },
            };

            window.paymentBrickController = await bricksBuilder.create(
                "payment",
                "paymentBrick_container",
                settings
            );
        };
        renderPaymentBrick(bricksBuilder);
    } catch (error) {
        console.error(error);
    }
});
</script>

<style scoped></style>
