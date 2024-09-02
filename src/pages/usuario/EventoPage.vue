<template>
    <q-page class="animate__animated animate__fadeInRight column bg-grad-7 q-pb-xl relative" id="dialog-evento"
        v-if="pageLoaded">
        <div class="wrapper q-px-md relative">
            <q-btn icon="keyboard_return" flat color="grey-5" class="absolute-top-left q-mt-xs" to="/eu/buscar"
                label="eventos"></q-btn>
            <div class="w100 rounded-borders q-mt-xl">
                <div id="title-menu"
                    class="text-shadow q-mb-sm text-center text-purple-1 rounded-borders bg-grad-1 q-pa-md  text-bold">
                    {{ evento.titulo }}
                </div>
            </div>
            <div class="w100">
                <img class="shadow-2" id="img-evento" style="border: 4px solid #610FE1" :src="evento.img_url" alt="">
            </div>

            <div id="ingressos-info" class="relative bg-glass-1 rounded-borders q-pa-md q-mt-md">
                <div class="row no-wrap items-center text-h5 text-primary text-bold " id="text-menu">
                    <div class="w100 row items-center" id="title-menu">
                        <q-icon name="local_activity" size="md" class="text-primary" />
                        INGRESSOS
                    </div>
                </div>
                <div class="w100 rounded-borders bg-primary mid-opacity q-mt-md" style="height:4px"></div>
                <div class="w100 text-primary text-bold high-opacity">
                    <!-- <div class="text-bold text-secondary q-mt-sm">Ingressos Disponíveis: {{ evento.qtd_ingressos }}</div> -->
                    <!-- faça um v-for no evento.tipos_ingressos mostrando o titulo, valor e quantidade. -->
                    <div class="row no-wrap items-center no-wrap q-pa-sm q-mt-md rounded-borders"
                        v-for="ingresso in evento.tipos_ingressos" :key="ingresso.id" style="border: 2px solid #872DE1">
                        <q-icon name="confirmation_number" size="lg"></q-icon>
                        <div class="column q-mx-md w100">
                            <div style="font-size: .9rem;text-transform: uppercase;" class="text-primary">{{
                                ingresso.titulo
                            }}</div>
                            <div class="text-secondary">R$ {{ ingresso.valor }}</div>
                            <div class="high-opacity text-orange-13"
                                v-if="ingresso.quantidade - ingresso.vendidos <= 20">🟠 Esgotando Ingressos
                            </div>
                            <div class="row no-wrap q-gutter-x-md">
                                <q-btn @click="comprarIngresso(ingresso)" color="positive" label="comprar ingresso"
                                    dense glossy icon-right="add_shopping_cart"
                                    class="text-bold q-mt-sm q-py-md w100"></q-btn>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <q-btn v-if="!editando" label="Adicionar Ingressos" icon-right="confirmation_number" class="q-mt-md"
              color="primary"></q-btn> -->
            </div>
            <div id="evento-info" v-if="eventoLoaded"
                class="w100 q-px-md q-gutter-y-md q-mt-sm bg-glass-1 rounded-borders q-pb-md">
                <div id="" style="font-size:1.1rem;text-transform: uppercase;"
                    class="desc text-bold text-primary high-opacity text-center q-pt-md">
                    {{ evento.descricao }}
                </div>
                <div class="w100 rounded-borders bg-primary q-mt-md" style="height:4px"></div>
                <div class="text-primary text-bold row no-wrap items-center">
                    <q-icon name="event" class="q-mr-md" size="lg"></q-icon>
                    <div class="div text-secondary">{{ evento.data_evento }}</div>
                </div>
                <div class="text-primary text-bold row no-wrap items-center">
                    <q-icon name="perm_phone_msg" class="q-mr-md" size="lg"></q-icon>
                    <div class="div text-secondary">{{ evento.contato }}</div>
                </div>
                <div class="text-primary text-bold row no-wrap items-center">
                    <q-icon name="pin_drop" class="q-mr-md" size="lg"></q-icon>
                    <div class="div text-secondary">{{ evento.endereco }}</div>
                </div>
                <div v-if="evento.localizacao && !evento.localizacao.trim() == '' && evento.localizacao.includes('https://www.google.com/maps/embed') && !evento.localizacao.includes('iframe')"
                    class="w100 q-mt-md rounded-borders">
                    <iframe :src="evento.localizacao" class="w100 rounded-borders shadow-2" height="300"
                        style="border:0;" allowfullscreen="" loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>

            <div class="w100 row justify-center item-center">
                <q-date v-model="data" color="primary" class="w100 q-mt-md" readonly mask="DD-MM-YYYY" />
            </div>
            <div class="w100 q-pb-lg"></div>
        </div>
        <q-dialog v-model="dialogIngresso" persistent>
            <div class="column justify-center bg-white">
                <div id="title-menu" class="q-pa-md bg-primary text-white text-bold text-center">Confirmação de Compra</div>
                <div class="q-px-sm q-pt-md bg-white text-primary text-bold text-center">{{ ingressoSelected.titulo }}<br><strong class="text-secondary">por</strong> R$ {{ingressoSelected.valor  }}</div>
                <IngressoPaymentComponent />
                <q-btn label="voltar" @click="dialogIngresso = !dialogIngresso" color="primary" flat></q-btn>
            </div>
        </q-dialog>
    </q-page>
    <q-page v-else class="animate__animated animate__fadeIn bg-grad-7">
        <div class="row w100 q-pt-md justify-center">
            <q-spinner-ball color="secondary" size="lg" />
            <q-spinner-ball color="secondary" size="lg" />
            <q-spinner-ball color="secondary" size="lg" />
        </div>
    </q-page>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';
import IngressoPaymentComponent from "../../components/IngressoPaymentComponent.vue";
import { useRouter } from 'vue-router';
const router = useRouter()

const evento = ref({})
const pageLoaded = ref(false)
const eventoLoaded = ref(true)
const $q = useQuasar()
const data = ref('')
const ingressoSelected = ref({})
const dialogIngresso = ref(false)
onBeforeUnmount(() => {
    sessionStorage.removeItem('evento')
})

async function getEvento() {
    pageLoaded.value = false
    await api.post(`/evento`, {
        evento: {
            id: sessionStorage.getItem('evento')
        }
    })
        .then(response => {
            evento.value = response.data
            const eventoSpecs = {
                titulo: response.data.titulo,
                produtor: response.data.host,
                eventoId: response.data.id,
                host_mp: response.data.host_mp,
            }
            sessionStorage.setItem('evento', JSON.stringify(eventoSpecs))
            data.value = evento.value.data_evento.substring(0, 10).replaceAll('/', '-')
        })
        .catch(error => {
            console.log(error)
        }).finally(() => {
            pageLoaded.value = true
        })
}

function comprarIngresso(ingresso) {
    ingressoSelected.value = ingresso
    sessionStorage.setItem('ingresso', JSON.stringify(ingresso))
    dialogIngresso.value = true
}

onBeforeMount(async () => {
    await getEvento()
})
onBeforeUnmount(async () => {
    sessionStorage.removeItem('ingresso')
})

</script>

<style scoped>
#comprar-btn {
    position: sticky;
    width: 100;
    bottom: 0;
    z-index: 9;
}

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

    .q-date {
        width: 60%;
    }

    #img-evento {
        width: 100%;
        height: 500px;
        border-radius: 10px;
    }
}
</style>