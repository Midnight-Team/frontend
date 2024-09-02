<template>
    <div class="wrapper q-mx-md">
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
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";

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

const isProd = !window.location.href.includes('localhost')
const baseURL = isProd ? 'https://midnightickets.com' : 'http://localhost:9000'
const preferenceId = ref('');
onBeforeMount(async () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const evento = JSON.parse(sessionStorage.getItem('evento'));
    const ingresso = JSON.parse(sessionStorage.getItem('ingresso'));
    try {
        await loadScript('https://sdk.mercadopago.com/js/v2');
        const mp = new MercadoPago(evento.host_mp, { locale: 'pt-BR' });
        const createPreference = async () => {
            await api.post('/preference_ingresso', {
                back_urls: {
                    "success": baseURL + '/eu',
                    "failure": baseURL + '/eu',
                    "pending": baseURL + '/eu',
                },
                eventoId: evento.eventoId,
                ingresso: ingresso,
                usuario: user,
                auto_return: "approved",
                items: [
                    {
                        id: ingresso.titulo,
                        title: 'Compra de ' + ingresso.titulo + ' para o evento ' + evento.titulo + ' com o(a) produtor(a) ' + evento.produtor,
                        quantity: 1,
                        description: '',
                        unit_price: Number(ingresso.valor.replace(',', '.')),
                        // maisparametros: maisparametros,
                    }
                ],
                

            }).then(response => {
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
    } catch (error) {
        console.error(error);
    }
});
</script>

<style>
.grey-3WMlEf.svelte-1a1oxv8.svelte-1a1oxv8{
    color: rgba(255, 255, 255, 0.824)!important;
}
</style>
