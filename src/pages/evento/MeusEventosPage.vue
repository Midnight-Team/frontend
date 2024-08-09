<template>
    <q-page class="animate__animated animate__fadeIn">
        <div class="es1 bg-white q-ma-sm  rounded-borders shadow-4 relative">
            <div
                class="title-1 w100 q-px-sm row items-center text-primary shadow-1 q-py-xs justify-between no-wrap text-bold">
                <div class="row no-wrap items-center">
                    <q-icon size="sm" color="primary" name="paid" class="q-pr-sm" />
                    {{ authStore.getInfoPurpleCoins() }} <div class="q-pl-sm mid-opacity">PurpleCoins</div>
                </div>
                <div class="row no-wrap items-center">
                    <div class="mid-opacity">R$ {{ formatToNumber(authStore.getInfoSaldo().toString()) }}</div>
                    <q-icon size="sm" color="orange" name="paid" class="q-pl-sm" />
                </div>
            </div>
            <div class="w100 q-ml-sm q-mt-md"><q-btn label="Novo Evento" color="primary"
                    @click="navigateTo('/evento/steps')" icon="today" icon-right="add" /></div>
            <div class="column q-mb-xl">
                <div id="table-eventos" class="q-mt-md w100">
                    <div class="text-h6 text-primary q-mb-sm w100 q-px-md text-center text-bold">Eventos de Midnight
                        Produções</div>
                    <div class="q-px-sm">
                        <div class="w100 hline bg-primary q-mb-md"></div>
                        <q-input v-model="buscarEvento.titulo" maxlength="100" class="q-mb-md" outlined
                            label="Procurar Evento">
                            <template v-slot:append>
                                <q-btn icon="search" color="primary" @click="getEventos()" />
                            </template>
                        </q-input>
                        <q-toggle v-model="buscarEvento.status" @update:model-value="getEventos()"
                            :label="buscarEvento.status ? 'Em andamento' : 'Todos'"
                            class="q-mb-md text-primary text-bold" />
                            <div v-if="loading" class="row w100 justify-center">
                                <q-spinner-ball color="primary" size="lg"/>
                                <q-spinner-ball color="primary" size="lg"/>
                                <q-spinner-ball color="primary" size="lg"/>
                            </div>
                        <q-table no-data-label="Nenhum evento encontrado 🌆" separator="cell"
                            class="my-sticky-column-table text-primary q-mb-md w100 text-bold" :rows="rows"
                            :columns="columns" hide-pagination>
                            <template v-slot:body-cell-titulo="props">
                                <q-td :props="props">
                                    <div class="q-gutter-y-xs q-py-sm">
                                        {{ formatBigString(props.row.titulo) }}
                                    </div>
                                </q-td>
                            </template>
                            <template v-slot:body-cell-acoes="props">
                                <div class="column items-center justify-center q-gutter-y-xs q-py-sm">
                                    <q-btn icon="visibility" color="primary">
                                        <q-tooltip>
                                            Visualizar Evento
                                        </q-tooltip>
                                    </q-btn>
                                    <q-btn icon="sell " color="green">
                                        <q-tooltip>
                                            Virar lote de ingressos
                                        </q-tooltip>
                                    </q-btn>
                                </div>
                            </template>
                        </q-table>

                    </div>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from 'src/stores/authStore';
import { api } from 'src/boot/axios';

const loading = ref(false);
const authStore = useAuthStore();
const router = useRouter();

const buscarEvento = ref({
    titulo: '',
    status: true
})

const navigateTo = (url) => {
    router.push(url);
}
const rows = ref([]);
const columns = [
    {
        name: 'titulo',
        required: true,
        label: 'Título',
        align: 'left',
        field: 'titulo'
    },
    {
        name: 'status',
        align: 'left',
        label: 'Status',
        field: 'status'
    },
    {
        name: 'pacote',
        required: true,
        label: 'Pacote',
        align: 'left',
        field: 'pacote'
    },
    {
        name: 'tipos_ingressos',
        align: 'left',
        label: 'Tipos Ingressos',
        field: 'tipos_ingressos'
    },
    {
        name: 'qtd_ingressos',
        align: 'left',
        label: 'Ingressos Disponíveis',
        field: 'qtd_ingressos'
    },
    {
        name: 'subhosts',
        align: 'left',
        label: 'Subhosts',
        field: 'subhosts'
    },
    {
        name: 'data_evento',
        align: 'left',
        label: 'Data do Evento',
        field: 'data_evento',
    },
    {
        name: 'acoes',
        align: 'left',
        label: 'Ações',
        field: 'acoes',
    },

]

function formatBigString(str){
    if(str.length > 15){
        return str.substring(0, 15) + '...';
    }
    return str;
}

function formatToNumber(inputString) {
    let cleanString = inputString.replace(/[^\d,]/g, '');
    let numericString = cleanString.replace(',', '.');
    let number = parseFloat(numericString).toFixed(2);
    if (isNaN(number)) {
        number = '0.00';
    }
    let formattedString = number.toString().replace('.', ',');

    return formattedString;
}

async function getEventos() {
    loading.value = true;
    const req = {
        host: authStore.getInfoId(),
        evento: {
            titulo: buscarEvento.value.titulo,
            status: buscarEvento.value.status
        }
    }
    await api.post('/get_eventos', req)
        .then((response) => {
            rows.value = response.data;
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            loading.value = false;
        });
}

onMounted(async () => {
    window.scrollTo(0, 0);
    await getEventos();
})
</script>

<style scoped>
.q-page {
    min-height: 100vh;
}

.q-table {
    position: relative;
}

@media (min-width: 1100px) {
    .es1 {
        margin: 16px 100px;
    }
}

.title-1 {
    position: sticky;
    top: 96px;
    background: #dacaff56;
    backdrop-filter: blur(4px);
    z-index: 2;
}
</style>
<style lang="sass">
.my-sticky-column-table
  thead
    background-color: #c7afff

  thead tr:first-child th:first-child
    /* bg color is important for th; just specify one */
    background-color: #c7afff

  td:first-child
    background-color: #c7afff

  th:first-child,
  td:first-child
    position: sticky
    font-weight: bold
    left: 0
    z-index: 1
    border-right: 2px solid #5D0CE0
</style>