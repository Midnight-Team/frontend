<template>
    <q-page class="animate__animated animate__fadeIn bg-grad-7 q-pb-xl">
        <div class="es1 bg-grey-4 q-mx-sm  rounded-borders  relative">
            <div
                class="title-1 w100 q-px-sm row items-center text-primary shadow-1 q-py-md justify-between no-wrap text-bold">
                <div class="row no-wrap items-center">
                    <q-icon size="sm" color="primary" name="paid" class="q-pr-sm" />
                    {{ authStore.getInfoPurpleCoins() }} <div class="q-pl-sm mid-opacity">PurpleCoins</div>
                </div>
                <div class="row no-wrap items-center">
                    <div class="text-green-7"> <strong class="high-opacity"></strong>{{ authStore.getInfoLogin().toLowerCase() }}</div>
                    <q-icon size="sm" color="green" name="person" class="q-pl-sm" />
                </div>
            </div>
            <div class="column q-mb-xl">
                <div id="table-eventos" class="q-mt-sm w100">
                    <div id="title" class=" text-primary q-mb-sm w100 q-px-md text-center text-bold">Meus Eventos</div>
                    <div class="q-px-sm">
                        <div class="w100 hline bg-primary q-mb-md"></div>
                        <div class="w100 q-my-md">
                            <q-btn class="q-pa-md text-bold" label="Novo Evento" glossy color="primary"
                                @click="navigateTo('/eventos/criar')" icon="event" icon-right="add" />
                        </div>
                        <q-input :inputStyle="{ fontWeight:'bold', color:'#6310E1' }" v-model="buscarEvento.titulo" maxlength="100" class="q-mb-md" outlined
                            label="Procurar Evento">
                            <template v-slot:append>
                                <q-btn icon="search"  color="primary" @click="getEventos()" />
                            </template>
                        </q-input>
                        <q-toggle v-model="buscarEvento.status" @update:model-value="getEventos()"
                            :label="buscarEvento.status ? 'Em andamento' : 'Todos'"
                            class="q-mb-md text-primary text-bold" />
                        <div v-if="loading" class="row w100 q-pb-xl justify-center">
                            <q-spinner-ball color="primary" size="lg" />
                            <q-spinner-ball color="primary" size="lg" />
                            <q-spinner-ball color="primary" size="lg" />
                        </div>
                        <q-table v-if="!loading && rows.length > 0" no-data-label="Nenhum evento encontrado 🌆" separator="cell"
                            class="my-sticky-column-table text-primary q-mb-md w100 text-bold" :rows="rows"
                            :columns="columns">
                            <template v-slot:body-cell-titulo="props">
                                <q-td :props="props">
                                    <div class="q-gutter-y-xs q-py-sm">
                                        {{ isMobile ? formatBigString(props.row.titulo) : props.row.titulo }}
                                    </div>
                                    <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                                        {{ props.row.titulo }}
                                    </q-tooltip>
                                </q-td>
                            </template>
                            <template v-slot:body-cell-pacote="props">
                                <q-td :props="props">
                                    <div class="q-gutter-y-xs q-py-sm">
                                        {{ props.row.pacote }} 
                                    </div>
                                </q-td>
                            </template>
                            <template v-slot:body-cell-acoes="props">
                                <div class="column items-center justify-center q-gutter-y-xs q-py-sm">
                                    <q-btn glossy icon="visibility" color="green-14"  @click="openMeuEventoPage(props.row.id)">
                                        <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                                            Gerenciar Evento
                                        </q-tooltip>
                                    </q-btn>
                                    <!-- <q-btn v-if="props.row.status.includes('andamento')" icon="sell " color="green">
                                        <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                                            Virar lote de ingressos
                                        </q-tooltip>
                                    </q-btn> -->
                                </div>
                            </template>
                        </q-table>
                        <div  v-if="!loading" class="w100 text-right text-secondary  q-mb-md text-bold">
                            {{ rows.length > 0 ? (rows.length.toString() + ' evento(s) encontrado(s)🔎') : 'Nenhum evento encontrado🌃' }} 
                        </div>
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
import { nextTick } from 'vue';
const loading = ref(false);
const authStore = useAuthStore();
const router = useRouter();
const buscarEvento = ref({
    titulo: '',
    status: true
})

const isMobile = window.innerWidth < 800;
function openMeuEventoPage(eventoId) {
    sessionStorage.setItem('eventoHandlerId', eventoId);
    router.push('/eventos/gerenciar');
}

const navigateTo = (url) => {
    router.push(url);
}
const rows = ref([]);
const columns = [
    {
        name: 'titulo',
        required: true,
        label: 'Evento',
        align: 'left',
        field: 'titulo'
    },
    {
        name: 'acoes',
        align: 'left',
        label: 'Ações',
        field: 'acoes',
    },
    {
        name: 'status',
        align: 'left',
        label: 'Status',
        field: 'status'
    },
    {
        name: 'data_evento',
        align: 'left',
        label: 'Data do Evento',
        field: 'data_evento',
    },
    {
        name: 'qtd_ingressos',
        align: 'left',
        label: 'Ingressos Disponíveis',
        field: 'qtd_ingressos'
    },
    {
        name: 'access_code',
        align: 'left',
        label: 'Código',
        field: 'access_code'
    },
    {
        name: 'subhosts',
        align: 'left',
        label: 'Acessos',
        field: 'subhosts'
    },
    {
        name: 'tipos_ingressos',
        align: 'left',
        label: 'Tipos Ingressos',
        field: 'tipos_ingressos'
    },
    {
        name: 'pacote',
        required: true,
        label: 'Pacote',
        align: 'left',
        field: 'pacote'
    },
]

function formatBigString(str) {
    if (str.length > 9) {
        return str.substring(0, 9) + '...';
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
        margin: 0px 100px;
    }
}

.title-1 {
    position: sticky;
    top: 50px;
    background: #dacaff56;
    backdrop-filter: blur(12px);
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