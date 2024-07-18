<template>
    <div class="wrapper">
        <div id="paymentBrick_container"></div>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";

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
    const width = 800;  // Defina a largura da janela
    const height = 600; // Defina a altura da janela
    const left = (window.innerWidth / 2) - (width / 2); // Centralizar a janela horizontalmente
    const top = (window.innerHeight / 2) - (height / 2); // Centralizar a janela verticalmente
    
    window.open(pixWindow.value, '_blank', `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`);
}

onBeforeMount(async () => {
    try {
        await loadScript('https://sdk.mercadopago.com/js/v2');

        const mp = new MercadoPago(process.env.PROD_PUBLIC_KEY, { locale: 'pt-BR' });
        const bricksBuilder = mp.bricks();
        const createPreference = async () => {
            const response = await fetch('http://localhost:3333/api/create_preference', {
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
                            unit_price: 100.00
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
                    amount: 100,
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
                        const isProd = !window.location.href.includes('localhost')
                        const baseURL = isProd ? 'https://midnightickets-api.onrender.com' : 'http://localhost:3333/api/' 
                        return new Promise((resolve, reject) => {
                            fetch(baseURL, {
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
