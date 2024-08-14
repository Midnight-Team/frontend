        <template>
    <div class="wrapper q-px-md bg-white">
        <!-- <div id="paymentBrick_container">
        </div> -->
        <div id="wallet_container">
        </div>
        <div v-if="loading" class="row w100 justify-center q-mt-md q-py-xl">
            <q-spinner-ball color="primary" size="xl" />
            <q-spinner-ball color="primary" size="xl" />
            <q-spinner-ball color="primary" size="xl" />
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount, ref } from "vue";
import { useAuthStore } from 'src/stores/authStore';
import { api } from "src/boot/axios";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const pixWindow = ref('');
const valorPagar = ref()
const loading = ref(true)
const $q = useQuasar();
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
    setTimeout(() => {
        window.open(pixWindow.value, '_blank');
    }, 2000);
}

onBeforeUnmount(async () => {
    const host = JSON.parse(sessionStorage.getItem('userLogado'));
    await api.post('/update_moneys', { id: host.id, senha: host.senha })
        .then((res) => {
            sessionStorage.removeItem('userLogado');
            sessionStorage.setItem('userLogado', JSON.stringify(res.data));
        })
})
const isProd = !window.location.href.includes('localhost')
const baseURL = isProd ? 'https://midnightickets.com' : 'http://localhost:9000'
const preferenceId = ref('');
onBeforeMount(async () => {
    const host = JSON.parse(sessionStorage.getItem('userLogado'));
    try {
        const pctStr = sessionStorage.getItem('recargaPacote');
        const recargaPacote = JSON.parse(pctStr);
        await loadScript('https://sdk.mercadopago.com/js/v2');
        const mp = new MercadoPago(process.env.PROD_PUBLIC_KEY, { locale: 'pt-BR' });
        const createPreference = async () => {
            await api.post('/create_preference', {
                back_urls: {
                    "success": baseURL + '/app',
                    "failure": baseURL + '/app',
                    "pending": baseURL + '/app',
                },
                host: host.id,
                pacote: recargaPacote,
                auto_return: "approved",
                items: [
                    {
                        id: recargaPacote.id,
                        title: 'Compra de ' + recargaPacote.label,
                        quantity: 1,
                        unit_price: recargaPacote.preco,
                        tipo: recargaPacote.tipo,
                    }
                ],
                

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
        // console.log('preferenceId = ' + preferenceId.value);
        mp.bricks().create("wallet", "wallet_container", {
            initialization: {
                preferenceId: preferenceId.value,
            },
            customization: {
                texts: {
                    valueProp: 'smart_option',
                },
            }
        });
        loading.value = false;
        // const renderPaymentBrick = async (bricksBuilder) => {
        //     const host = JSON.parse(sessionStorage.getItem('userLogado'));
        //     const settings = {
        //         initialization: {
        //             amount: recargaPacote.preco,
        //             transaction_amount: recargaPacote.preco,
        //             payer: {
        //                 firstName: host.nome_razao,
        //                 email: host.email,
        //                 identification: {
        //                     type: host.cpf_cnpj.length > 11 ? 'CNPJ' : 'CPF',
        //                     number: host.cpf_cnpj
        //                 },
        //             },
        //         },
        //         customization: {
        //             visual: {
        //                 style: {
        //                     theme: "flat",
        //                 },
        //             },
        //             paymentMethods: {
        //                 creditCard: "all",
        //                 bankTransfer: "all",
        //                 atm: "all",
        //                 onboarding_credits: "all",
        //                 wallet_purchase: "all",
        //                 maxInstallments: 10
        //             }
        //         },
        //         callbacks: {
        //             onReady: () => {
        //                 loading.value = false;
        //                 console.log('Brick is ready');
        //             },
        //             onSubmit: ({ selectedPaymentMethod, formData }) => {
        //                 formData.notification_url = process.env.PROD == 'true' ? process.env.PROD_NOTIFICATION_URL : process.env.PROD_NOTIFICATION_URL;
        //                 formData.additional_info = {
        //                     items:
        //                         [
        //                             {
        //                                 id: recargaPacote.id,
        //                                 title: recargaPacote.label,
        //                                 description: recargaPacote.label,
        //                                 quantity: 1,
        //                                 unit_price: recargaPacote.preco,
        //                                 category_id: recargaPacote.tipo,
        //                             }
        //                         ],
        //                     payer: {
        //                         first_name: host.nome_razao,
        //                         phone: {
        //                             area_code: host.telefone.substring(0, 2),
        //                             number: host.telefone.substring(2, 11)
        //                         },
        //                     }
        //                 }
        //                 formData.description = "💷 Compra de " + recargaPacote.label + 'por R$ ' + recargaPacote.preco.toFixed(2).toString().replace('.', ',');
        //                 return new Promise((resolve, reject) => {
        //                     fetch("http://localhost:3333/api/process_payment", {
        //                         method: "POST",
        //                         headers: {
        //                             "Content-Type": "application/json",
        //                         },
        //                         body: JSON.stringify(formData),
        //                     }).then((response) => {
        //                         const data =  response.json().then(data => data);
        //                         console.log('Payment response:', data);
        //                         sessionStorage.setItem('paymentId', JSON.parse(response.data.id))
        //                         api.post('/save_recarga_payment', {
        //                             payment_id: response.data.id,
        //                             specs: {
        //                                 host_name: host.nome_razao,
        //                                 transactionData: response.data,
        //                                 paymentMethod: selectedPaymentMethod,
        //                                 valorPagar: valorPagar.value
        //                             },
        //                             pacote: recargaPacote,
        //                             status: 'bricks payment frontend created',
        //                             host: authStore.getInfoId()
        //                         }).then(() => resolve())
        //                         // console.log('Payment response:', JSON.stringify(response.point_of_interaction.transaction_data));
        //                         if (formData.payment_method_id === 'pix') {
        //                             pixWindow.value = response.data.point_of_interaction.transaction_data.ticket_url;
        //                             openPixWindow();
        //                         }
        //                         // console.log(JSON.stringify(response.data));
        //                         router.push('/status-payment')
        //                         resolve();
        //                     })
        //                         .catch((error) => {
        //                             console.error('Payment error:', error);
        //                             reject();
        //                         });
        //                 });
        //             },
        //             onError: (error) => {
        //                 console.error('Brick error:', error);
        //             },
        //         },
        //     };

        //     window.paymentBrickController = await bricksBuilder.create(
        //         "payment",
        //         "paymentBrick_container",
        //         settings
        //     );
        // };
        // await renderPaymentBrick(bricksBuilder);
    } catch (error) {
        console.error(error);
    }
});
</script>

<style scoped></style>
