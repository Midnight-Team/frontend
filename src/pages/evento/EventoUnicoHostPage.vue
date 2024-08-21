<template>
    <q-page class="animate__animated animate__fadeIn  column bg-grad-1 q-px-md q-pb-xl relative" id="dialog-evento"
        v-if="pageLoaded">
        <q-btn icon="keyboard_return" flat color="grey-5" class="absolute-top-left" to="/eventos" label="eventos"></q-btn>
        <div class="w100 rounded-borders q-mt-xl">
            <div id="title-menu"
                class="text-shadow q-mb-sm text-h5 text-center text-purple-1 rounded-borders bg-grad-1 q-pa-md  text-bold">
                {{ evento.titulo }}
            </div>
        </div>
        <div class="w100">
            <img class="shadow-2" id="img-evento" style="border: 4px solid #610FE1" :src="evento.img_url" alt="">
        </div>
        <q-btn v-if="evento.status.includes('andamento')"  id="cancelar-edit" @click="editando = !editando" class="q-mt-sm q-py-sm" :color="editando ? 'orange-8' : 'blue'"
            :icon-right="editando ? 'close' : 'edit'" :label="editando ? 'Cancelar edição' : 'Editar Evento'"></q-btn>
        <div id="evento-info" v-if="eventoLoaded"
            class="w100 q-px-md q-gutter-y-md q-mt-sm bg-glass-1 rounded-borders q-pb-md">
            <div class="w100 text-h5 text-primary text-bold row items-center justify-between no-wrap " id="text-menu">
                <div class="row no-wrap items-center">
                    <q-icon name="nightlife" size="md" class="text-primary" />
                    EVENTO
                </div>
                <div style="font-size: .8rem;" class="text-primary text-bold">
                    {{ evento.status }}
                </div>
            </div>
            <q-input v-if="editando" label="Título do Evento*" v-model="evento.titulo" outlined color="primary">
                <template v-slot:append>
                    <q-icon name="nightlife" color="primary" />
                </template>
            </q-input>
            <q-input v-if="editando" label="Link da Imagem" v-model="evento.img_url" outlined color="primary">
                <template v-slot:append>
                    <q-icon @click="openImgur()" name="image" color="primary" />
                </template>
            </q-input>
            <q-input :readonly="!editando" :filled="!editando" mask="####" maxlength="4" label="Código de Acesso"
                v-model="evento.access_code" outlined color="primary">
                <template v-slot:append>
                    <q-icon name="lock" color="primary" />
                </template>
            </q-input>
            <q-input type="textarea" label="Descrição" v-model="evento.descricao" outlined :readonly="!editando"
                :filled="!editando">
                <template v-slot:append>
                    <q-icon name="description" color="primary" />
                </template>
            </q-input>
            <q-input :readonly="!editando" :filled="!editando" label="Contato*" v-model="evento.contato" type="textarea"
                outlined color="primary">
                <template v-slot:append>
                    <q-icon name="phone" color="primary" />
                </template>
            </q-input>
            <!-- <q-input label="Data" v-model="evento.data_evento" outlined color="primary" :readonly="!editando" :filled="!editando"></q-input> -->
            <div class="row q-gutter-x-md justify-center no-wrap">
                <q-input :filled="!editando" :readonly="!editando" label="Hora Início*" class="q-mt-md q-ml-md"
                    style="width: 45%;" outlined v-model="evento.hora_evento" mask="time" :rules="['time']">
                    <template v-if="editando" v-slot:append>
                        <q-icon name="access_time" color="primary" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-time v-model="evento.hora_evento">
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                </q-time>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
                <q-input :filled="!editando" :readonly="!editando" label="Hora Fim" class="q-mt-md q-ml-md"
                    style="width: 45%;" outlined v-model="evento.hora_final" mask="time" :rules="['time']">
                    <template v-if="editando" v-slot:append>
                        <q-icon name="access_time" color="primary" class="cursor-pointer">
                            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                                <q-time v-model="evento.hora_final">
                                    <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                </q-time>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
            </div>
            <q-date v-model="evento.data_evento" :color="editando ? 'primary' : 'grey-8'" :readonly="!editando"
                class="w100" mask="DD-MM-YYYY" />
            <q-input label="Endereço" v-model="evento.endereco" type="textarea" outlined color="primary"
                :readonly="!editando" :filled="!editando">
                <template v-slot:append>
                    <q-icon name="location_on" color="primary" />
                </template>
            </q-input>
            <q-input  v-if="editando" label="Localização Google Maps" v-model="evento.localizacao" outlined color="primary"
                :filled="!editando">
                <template v-slot:append>
                    <q-icon name="map" color="primary" />
                </template>
            </q-input>
            <div v-if="evento.localizacao && !evento.localizacao.trim() == '' && evento.localizacao.includes('https://www.google.com/maps/embed') && !evento.localizacao.includes('iframe')" class="w100 q-mt-md rounded-borders">
                <iframe :src="evento.localizacao" class="w100 rounded-borders shadow-2" height="200" style="border:0;"
                    allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
        <div id="subhost-info" class="relative bg-glass-1 rounded-borders q-pa-md q-mt-md">
            <div class="row no-wrap items-center text-h5 text-primary text-bold " id="text-menu">
                <div class="w100 row items-center">
                    <q-icon name="local_activity" size="md" class="text-primary" />
                    INGRESSOS
                </div>
                <q-btn v-if="evento.status.includes('andamento')" label="" @click="goToLoteIngresso()" icon-right="sell"></q-btn>
            </div>
            <div class="text-bold text-secondary q-mt-sm">Ingressos Disponíveis: 2000/{{ evento.qtd_ingressos }}</div>
            <div class="w100 text-primary text-bold high-opacity">
                <!-- faça um v-for no evento.tipos_ingressos mostrando o titulo, valor e quantidade. -->
                <div class="row no-wrap items-center no-wrap q-pa-sm q-mt-md rounded-borders"
                    v-for="ingresso in evento.tipos_ingressos" :key="ingresso.id" style="border: 2px solid #872DE1">
                    <q-icon name="confirmation_number" size="md"></q-icon>
                    <div class="column q-ml-sm">
                        <div style="font-size: .9rem;text-transform: uppercase;" class="text-blue-8">{{ ingresso.titulo
                            }}</div>
                            <div class="mid-opacity"> {{ (ingresso.vendidos ? ingresso.vendidos : 0)}}/{{ ingresso.quantidade }} Ingressos</div>
                            <div class="text-secondary">R$ {{ ingresso.valor }}</div>
                    </div>
                </div>
            </div>
            <!-- <q-btn v-if="!editando" label="Adicionar Ingressos" icon-right="confirmation_number" class="q-mt-md"
                color="primary"></q-btn> -->
        </div>
        <div id="subhost-info" class="bg-glass-1 rounded-borders q-pa-md  q-mt-md">
            <div class="text-h5 row items-center text-primary text-bold " id="text-menu">
                <q-icon name="groups" size="md" class="text-primary q-pr-xs" />
                ACESSOS
            </div>
            <div class="w100 text-primary text-bold q-pb-md">
                <!-- faça um v-for no evento.subhosts mostrando o id e o nome -->
                <div class="w100 row justify-between no-wrap items-center no-wrap q-py-sm q-mt-md"
                    v-for="subhost in evento.subhosts" :key="subhost.id"
                    style="border-bottom: 4px solid #872DE1;border-top: 4px solid #872DE1">
                    <q-icon name="account_circle" size="md"></q-icon>
                    <div class="column mid-opacity items-center justify-center">
                        <div class="text-black text-uppercase text-center">{{ subhost.nome }}</div>
                        <div>{{ subhost.id }}</div>
                    </div>
                    <q-btn v-if="evento.status.includes('andamento')" @click="removeSubhost(subhost.id)" color="secondary" size="xl" flat icon="remove"></q-btn>
                </div>
            </div>
            <q-btn v-if="!editando && evento.status.includes('andamento')" @click="dialogAcessos = !dialogAcessos" label="Adicionar Subhost"
                icon-right="person_add" class="" color="primary"></q-btn>
        </div>
        <div id="pacote-info" class="q-mb-md bg-glass-1 rounded-borders q-pa-md q-mt-md">
            <div class="text-h5 row items-center text-primary text-bold" id="text-menu">
                <q-icon name="paid" size="md" class="text-primary" />
                PACOTE
            </div>
            <div class="w100 text-secondary text-bold q-pt-md">
                <div class="w100 rounded-borders bg-primary mid-opacity q-mb-md" style="height:4px"></div>
                <!-- 🌱 PACOTE INICIAL<br> -->
                💰 {{ evento.pacote.label }}<br>
                🎟️ Máximo de Ingressos: {{ evento.pacote.max_ingressos }}<br>
                <div class="w100 rounded-borders bg-primary mid-opacity q-mt-md" style="height:4px"></div>
            </div>
        </div>
        <div class="w100 q-my-lg" v-if="editando"></div>
        <q-btn v-if="!editando" class=" w100  q-py-xl q-mb-md" label="Painel de Vendas" icon-right="payments"
            icon="insert_chart" color="primary"></q-btn>
        <q-btn v-if="!editando && evento.status.includes('andamento')" class=" w100  q-py-lg " label="Visualizar Convite" icon-right="visibility"
            color="dark"></q-btn>
        <q-btn @click="cancelarEvento()" v-if="!editando && evento.status.includes('andamento')" class="w100 q-mt-md q-mb-lg" label="Cancelar Evento" icon-right="cancel"
            color="red-8"></q-btn>
        <div class="w100 q-pb-xl"></div>
        <q-btn @click="salvarAlteracoes()" v-if="editando" class=" w100 q-mt-md q-py-lg fixed"
            style="bottom:0px;left:0px;z-index: 9;" label="Salvar Alterações" icon-right="save" color="green-7"></q-btn>
        <q-dialog v-model="dialogAcessos">
            <q-list id="acessos_disponiveis" class="colum bg-white q-px-md q-pt-md">
                <div
                    class="w100 q-pa-md row rounded-borders justify-center no-wrap bg-grad-1 text-white text-h6 text-bold">
                    Acessos Disponíveis
                </div>
                <div v-if="acessos.length == 0">
                    <div class="text-secondary text-bold q-mt-md">Nenhum acesso disponível 👮🏼</div>
                </div>
                <q-btn class="q-my-md" color="blue" label="Registrar Acessos" icon-right="person_add"
                    to="/app/acesso" />
                <q-list-item class="w100 column rounded-borders q-mb-md q-pa-sm" style="border:4px solid #9573f3"
                    v-for="acesso in acessos" :key="acesso.id">
                    <div class="text-primary text-bold">
                        {{ acesso.nome }} <br><strong class="text-secondary">{{ acesso.id }}</strong>
                    </div>
                    <q-btn v-if="evento.status.includes('andamento')" class="q-mt-md" color="green" label="Adicionar ao Evento" icon-right="sensor_occupied"
                        @click="updateSubhostsEvento(acesso)" />
                </q-list-item>
            </q-list>
        </q-dialog>
        <q-dialog persistent v-model="dialogLoteIngresso" style="backdrop-filter: blur(4px)">
            <LoteIngressoComponent @dialogBack="dialogBack()"/>
        </q-dialog>
    </q-page>
    <q-page v-else class="animate__animated animate__fadeIn">
        <div class="row w100 q-pt-md justify-center">
            <q-spinner-ball color="primary" size="lg" />
            <q-spinner-ball color="primary" size="lg" />
            <q-spinner-ball color="primary" size="lg" />
        </div>
    </q-page>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import LoteIngressoComponent from "components/LoteIngressoComponent.vue";
import { useRouter } from 'vue-router';
const router = useRouter()
const host = JSON.parse(sessionStorage.getItem('userLogado'));
const evento = ref({})
const pageLoaded = ref(false)
const dialogAcessos = ref(false)
const dialogLoteIngresso = ref(false)
const eventoLoaded = ref(true)
const editando = ref(false)
const $q = useQuasar()
const isMobile = window.innerWidth < 600
const acessos = ref([])
function openImgur() {
    window.open('https://imgur.com/', '_blank')
}

onBeforeUnmount(() => {
    // sessionStorage.removeItem('eventoHandlerId')
})

async function updateSubhostsEvento(acesso) {
    acessos.value = acessos.value.filter(ac => ac.id != acesso.id)
    evento.value.subhosts.push(acesso)
    await api.put(`/update_subhosts_evento`, { host: { id: host.id, senha: host.senha }, evento: evento.value })
        .then(response => {
            acessos.value = response.data
            dialogAcessos.value = false
            acessos.value = acessos.value.filter(acesso => !evento.value.subhosts.find(subhost => subhost.id == acesso.id))
            $q.notify({
                color: 'green-8',
                textColor: 'white',
                icon: 'person_add',
                message: 'Acesso adicionado com sucesso',
                position: 'top'
            })
        })
        .catch(error => {
            console.log(error)
            $q.notify({
                color: 'red-8',
                textColor: 'white',
                icon: 'error',
                message: error.response.data.error,
                position: 'top'
            })
        })
}

async function dialogBack(){
    await getEvento().then(() => {
        dialogLoteIngresso.value = false
    })
}

async function removeSubhost(idSubhost) {
    const confirm = window.confirm('Deseja realmente remover este acesso?')
    if (!confirm) return

    evento.value.subhosts = evento.value.subhosts.filter(subhost => subhost.id != idSubhost)

    await api.put(`/update_subhosts_evento`, { host: { id: host.id, senha: host.senha }, evento: evento.value })
        .then(response => {
            acessos.value = response.data
            $q.notify({
                color: 'green',
                textColor: 'white',
                icon: 'delete',
                message: 'Acesso removido com sucesso',
                position: 'top'
            })
        })
    getAcessos()
        .catch(error => {
            console.log(error)
        })
}

async function goToLoteIngresso(){
    sessionStorage.setItem('eventoTiposIngressos', JSON.stringify(evento.value.tipos_ingressos))
    dialogLoteIngresso.value = true
}

async function salvarAlteracoes() {
    await api.put(`/update_evento`, { evento: evento.value, host: JSON.parse(sessionStorage.getItem('userLogado')) })
        .then(response => {
            $q.notify({
                color: 'primary',
                textColor: 'white',
                icon: 'edit',
                message: response.data.message,
                position: 'top'
            })
            getEvento().then(() => {
                editando.value = false
            })
        })
        .catch(error => {
            console.log(error)
            $q.notify({
                color: 'red-8',
                textColor: 'white',
                icon: 'error',
                message: error.response.data.error,
                position: 'top'
            })
        })
}

async function cancelarEvento() {
    const confirm = window.confirm('Deseja realmente CANCELAR este Evento PERMANENTEMENTE?')
    if (!confirm) return
    await api.put(`/cancel_evento`, { evento: evento.value, host: JSON.parse(sessionStorage.getItem('userLogado')) })
        .then(response => {
            $q.notify({
                color: 'green-7',
                textColor: 'white',
                icon: 'cancel',
                message: response.data.message,
                position: 'top'
            })
            router.push('/evento')
        })
        .catch(error => {
            console.log(error)
            $q.notify({
                color: 'red-8',
                textColor: 'white',
                icon: 'error',
                message: error.response.data.error,
                position: 'top'
            })
        })
}

async function getEvento() {
    pageLoaded.value = false
    await api.post(`/get_evento_host`, {
        evento: {
            id: sessionStorage.getItem('eventoHandlerId')
        },
        host: {
            id: host.id,
            senha: host.senha
        }
    })
        .then(response => {
            evento.value = response.data
        })
        .catch(error => {
            console.log(error)
        }).finally(() => {
            pageLoaded.value = true
        })
}
async function getAcessos() {
    const myHost = {
        id: JSON.parse(sessionStorage.getItem('userLogado')).id,
        senha: JSON.parse(sessionStorage.getItem('userLogado')).senha
    }
    const response = await api.post('/get_access_people', { id: myHost.id, senha: myHost.senha })
    acessos.value = response.data
    //remover os acessos que já estão no evento.subhosts
    acessos.value = acessos.value.filter(acesso => !evento.value.subhosts.find(subhost => subhost.id == acesso.id))
}
onBeforeMount(async () => {
    await getEvento()
    await getAcessos()
    // await api.put(`/update_subhosts_evento`, {  host: { id:host.id, senha: host.senha },evento: evento.value })
    //     .then(response => {
    //         acessos.value = response.data
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
})

</script>

<style scoped>
#img-evento {
    width: 100%;
    height: 220px;
}

img {
    border-radius: 10px;

}

@media (min-width: 1300px) {
    .q-page {
        padding: 16px 10vw;
    }

    #img-evento {
        width: 100%;
        height: 500px;
        border-radius: 10px;
    }
}
#cancelar-edit{
    position: sticky!important;
    top: 48px;
    left: 0px;
    z-index: 9;
}

</style>