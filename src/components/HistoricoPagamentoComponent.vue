<template>
    <div class="w100 bg-grey-4">
        <div v-if="!loaded" class="row w100 q-py-md justify-center">
            <q-spinner-ball color="primary" size="lg" />
            <q-spinner-ball color="primary" size="lg" />
            <q-spinner-ball color="primary" size="lg" />
          </div>
          <div v-if="loaded">
                <q-card class="w100">
                    <q-card-section>
                        <q-card-title id="title-menu" class="text-primary">
                            Histórico de Compras
                        </q-card-title>
                    </q-card-section>
                    <q-card-section>
                        <div class="w100 row justify-between q-pb-xs">
                            <div class="text-secondary text-bold">PACOTE</div>
                            <div class="text-secondary text-bold">STATUS</div>
                        </div>
                        <q-list separator bordered class="rounded-borders bg-white">
                            <q-item clickable v-for="pagamento in pagamentos" :key="pagamento.id">
                                <q-item-section>
                                    <q-item-label class="row items-center text-bold text-primary justify-between q-pb-xs">
                                        <div>{{ pagamento.pacote.label }}<br> R$ {{ pagamento.pacote.preco.toFixed(2).toString().replace('.', ',') }}<br> <strong class="mid-opacity">{{ pagamento.pacote.tipo }}</strong></div>
                                        <q-badge :color="pagamento.status == 'rejected' ? 'red' : (pagamento.status == 'approved' ? 'green' : 'orange')" ></q-badge>
                                    </q-item-label>
                                    <q-item-label class="row text-bold text-secondary">
                                        🟣 {{ pagamento.pacote.purpleCoinsCredito }} <strong class="text-blue">🔵 {{ pagamento.pacote.subCoinsCredito }}</strong>
                                    </q-item-label>
                                    <q-item-label  caption class="column items-end q-py-sm text-bold">
                                        <div>
                                            Criado em {{ formatarDataISO(pagamento.createdAt) }} 
                                        </div>
                                        <div v-if="pagamento.createdAt.slice(0, 16) != pagamento.updatedAt.slice(0, 16)">
                                            Atualizado em {{ formatarDataISO(pagamento.updatedAt) }} 
                                        </div>
                                    </q-item-label>
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </q-card-section>
                </q-card>
          </div>
    </div>
</template>

<script setup>
import { api } from "src/boot/axios";
import { onBeforeMount, ref } from "vue";
const pagamentos = ref([]);
const loaded = ref(false);
onBeforeMount(async () => {
    const host = JSON.parse(sessionStorage.getItem('userLogado'));
    await api.post('/get_recarga_payment', { id: host.id, senha: host.senha })
        .then((res) => {
            pagamentos.value = res.data;
            loaded.value = true;
        })
        .catch((err) => {
            console.log(err);
            alert('Erro ao carregar histórico de pagamentos');
        })
        .finally(() => {
        })
})
function formatarDataISO(dataISO) {
    // Converter a string em um objeto Date
    const data = new Date(dataISO);

    // Formatar a data para o formato DD/MM/AAAA - HH:MM
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${ano} às ${horas}:${minutos}`;
}
</script>

<style scoped >

</style>