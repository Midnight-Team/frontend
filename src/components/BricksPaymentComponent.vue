<template>
    <div class="wrapper">
        <!-- <div id="paymentBrick_container"></div> -->
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { useQuasar } from 'quasar';

const $q = useQuasar()
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
const pixWindow = ref('');
function openPixWindow() {
    $q.notify({
        message: 'Você será redirecionado para o pagamento via PIX',
        color: 'primary',
        position: 'top',
        icon: 'payments',
        timeout: 600000,
        actions: [{ label: 'Abrir Pix', color: 'white', class:'bg-green', handler: () => { window.open(pixWindow.value, '_blank'); } }]
    });
    setTimeout(() => {
        window.open(pixWindow.value, '_blank');
    }, 2000);
}
const isProd = ref(false)
const baseURL = ref('')

onBeforeMount(async () => {
    isProd.value = !window.location.href.includes('localhost');
    baseURL.value = isProd.value ? 'https://midnightickets-api.onrender.com/api' : 'http://localhost:3333/api';
    try {
        await loadScript('https://sdk.mercadopago.com/js/v2');
        const mp = new MercadoPago(process.env.PROD_PUBLIC_KEY, { locale: 'pt-BR' });
        const bricksBuilder = mp.bricks();
        const createPreference = async () => {
            const response = await fetch(baseURL.value + '/create_preference', {
                method: 'POST',
                headers: {  
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    items: [
                        {
                            id: 'item-ID-1234',
                            title: 'Ingresso',
                            quantity: 1,
                            unit_price: 10.00
                        }
                    ],
                    purpose: 'wallet_purchase'
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create preference');
            }

            const data = await response.json();
            return data.id;
        };

        const preferenceId = await createPreference();

        const renderPaymentBrick = async (bricksBuilder) => {
            const settings = {
                initialization: {
                    amount: 10,
                    preferenceId: preferenceId,
                    payer: {
                        firstName: "comprador teste",
                        lastName: "da silva",
                        email: "comprador@gmail.com",
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
                        debitCard: "all",
                        ticket: "all",
                        bankTransfer: "all",
                        atm: "all",
                        onboarding_credits: "all",
                        wallet_purchase: "all",
                        maxInstallments: 10
                    },
                },
                callbacks: {
                    onReady: () => {
                        console.log('Brick is ready');
                    },
                    onSubmit: ({ selectedPaymentMethod, formData }) => {
                        return new Promise((resolve, reject) => {
                            fetch(baseURL.value + '/process_payment', {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(formData),
                            })
                                .then((response) => response.json())
                                .then((response) => {
                                    // console.log('Payment response:', JSON.stringify(response.point_of_interaction.transaction_data));
                                    if(formData.payment_method_id === 'pix') {
                                        pixWindow.value = response.point_of_interaction.transaction_data.ticket_url;
                                        resolve();
                                        openPixWindow();
                                        return;
                                    }
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

<style scoped>
.wrapper {
    padding: 20px;
}
</style>
