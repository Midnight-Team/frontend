<template>
    <q-page class="animate__animated animate__fadeIn">
        <div class="es1 bg-white q-ma-sm  rounded-borders shadow-4 relative">
            <div
                class="title-1 w100 q-px-sm row items-center text-primary shadow-1 q-py-xs justify-between no-wrap text-bold">
                <div class="row no-wrap items-center">
                    <q-icon size="sm" color="primary" name="paid" class="q-pr-sm" />
                    3 <div class="q-pl-sm mid-opacity">PurpleCoins</div>
                </div>
                <div class="row no-wrap items-center">
                    <div class="mid-opacity">R$ 22.300,00</div>
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
                        <q-table class="text-primary q-mb-md" :rows="rows" :columns="columns" row-key="eventName" />
                    </div>
                </div>
            </div>
        </div>
        <FooterComponent />
    </q-page>
</template>

<script setup>
import { ref, defineEmits, onMounted } from "vue";
import { useRouter } from "vue-router";
import FooterComponent from "../../components/FooterComponent.vue";

const router = useRouter();

const navigateTo = (url) => {
    router.push(url);
}
const columns = [
    {
        name: 'eventName',
        required: true,
        label: 'Nome do Evento',
        align: 'left',
        field: row => row.eventName,
        format: val => `${val}`,
        sortable: true
    },
    {
        name: 'status',
        align: 'left',
        label: 'Status',
        field: 'status'
    },
    {
        name: 'revenue',
        align: 'left',
        label: 'Faturamento',
        field: 'revenue',
        sortable: true,
        format: val => `R$ ${val.toFixed(2).toString().replace('.', ',')}`,
        sort: (a, b) => a - b
    },
    {
        name: 'ingressos',
        align: 'left',
        label: 'Ingressos Vendidos',
        field: 'ingressos'
    },
    {
        name: 'accessCode',
        align: 'left',
        label: 'Access Code',
        field: 'accessCode'
    },
    {
        name: 'creationDate',
        align: 'left',
        label: 'Data Criação',
        field: 'creationDate',
        format: val => formatDate(val),
        sortable: true
    },
    {
        name: 'eventDate',
        align: 'left',
        label: 'Data do Evento',
        field: 'eventDate',
        format: val => formatDate(val),
        sortable: true
    },
]
const rows = [
    {
        eventName: 'Concerto de Rock',
        creationDate: '2024-01-01T10:00:00',
        eventDate: '2024-07-22T18:00:00',
        ingressos: '303/2000',
        accessCode: '1234',
        status: '🟢 Em andamento',
        revenue: 3200.00
    },
    {
        eventName: 'Festival de Jazz',
        creationDate: '2024-02-15T09:00:00',
        eventDate: '2024-08-10T20:00:00',
        accessCode: '5678',
        ingressos: '133/200',
        status: '🟣 Finalizado',
        revenue: 3500.00
    },
    {
        eventName: 'Feira de Tecnologia',
        creationDate: '2024-03-10T08:30:00',
        eventDate: '2024-09-05T19:00:00',
        ingressos: '230/300',
        accessCode: '9101',
        status: '🟢 Em andamento',
        revenue: 2320.00
    },
    {
        eventName: 'Exposição de Arte',
        creationDate: '2024-04-20T11:15:00',
        eventDate: '2024-10-15T17:00:00',
        accessCode: '1121',
        ingressos: '0/150',
        status: '🟡 Agendado',
        revenue: 0.00
    },
    {
        eventName: 'Maratona de Cinema',
        creationDate: '2024-05-05T14:45:00',
        ingressos: '199/250',
        status: '🟣 Finalizado',
        eventDate: '2024-11-22T22:00:00',
        accessCode: '3141',
        revenue: 2340.00
    },
    {
        eventName: 'Workshop de Fotografia',
        creationDate: '2024-06-10T10:00:00',
        eventDate: '2024-12-01T09:00:00',
        ingressos: '80/140',
        accessCode: '2255',
        status: '🟢 Em andamento',
        revenue: 5000.00
    },
    {
        eventName: 'Seminário de Marketing',
        creationDate: '2024-07-01T11:00:00',
        eventDate: '2024-12-15T10:00:00',
        ingressos: '1240/2000',
        accessCode: '3344',
        status: '🟢 Em andamento',
        revenue: 7000.00
    },
    {
        eventName: 'Feira de Artesanato',
        creationDate: '2024-08-20T12:00:00',
        eventDate: '2025-01-10T11:00:00',
        ingressos: '12/150',
        accessCode: '4455',
        status: '🔴 Cancelado',
        revenue: 90.00
    },
    {
        eventName: 'Congresso de Medicina',
        creationDate: '2024-09-15T13:00:00',
        eventDate: '2025-02-20T14:00:00',
        ingressos: '200/200',
        accessCode: '5566',
        status: '🟢 Em andamento',
        revenue: 15000.00
    },
    {
        eventName: 'Festival de Cinema',
        creationDate: '2024-10-25T14:30:00',
        eventDate: '2025-03-05T15:00:00',
        ingressos: '250/300',
        accessCode: '6677',
        status: '🟢 Em andamento',
        revenue: 18000.00
    }
]


const formatDate = (dateString) => {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    return new Intl.DateTimeFormat('pt-BR', options).format(new Date(dateString));
}
onMounted(() => {
    window.scrollTo(0, 0);
})
</script>

<style scoped>
.q-page{
    min-height: 100vh;
}
.title-1 {
    position: sticky;
    top: 96px;
    background: #efefef4d;
    backdrop-filter: blur(4px);
    z-index: 1;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}
</style>