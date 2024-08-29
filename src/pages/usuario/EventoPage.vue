<template>
    <q-page class="animate__animated animate__fadeInRight column bg-grad-7 q-pb-xl relative" id="dialog-evento"
        v-if="pageLoaded">
        <div class="wrapper q-px-md relative">
            <q-btn icon="keyboard_return" flat color="grey-5" class="absolute-top-left" to="/eu/buscar"
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
                        <q-icon name="confirmation_number" size="md"></q-icon>
                        <div class="column q-mx-md w100">
                            <div style="font-size: .9rem;text-transform: uppercase;" class="text-primary">{{
                                ingresso.titulo
                                }}</div>
                            <div class="text-secondary">R$ {{ ingresso.valor }}</div>
                            <div class="high-opacity text-orange-13"
                                v-if="ingresso.quantidade - ingresso.vendidos <= 20">🟠 Esgotando Ingressos
                            </div>
                            <div class="row no-wrap q-gutter-x-md">
                                <q-btn :disabled="!ingressoExistInCart(ingresso)" @click="removeCartIngresso(ingresso)"
                                    color="red" dense glossy icon-right="remove" class="q-mt-sm w100"></q-btn>
                                <q-btn @click="addCartIngressos(ingresso)" color="blue-14" dense glossy icon-right="add"
                                    class="q-mt-sm w100"></q-btn>
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
        <q-btn v-if="cartIngressos.length > 0" id="comprar-btn" color="green"
            :label="'Comprar ' + totalIngressos + ' Ingresso(s)'" glossy class="q-py-xl w100"
            icon-right="add_shopping_cart"></q-btn>
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
import { useRouter } from 'vue-router';
const router = useRouter()

const evento = ref({})
const pageLoaded = ref(false)
const eventoLoaded = ref(true)
const $q = useQuasar()
const cartIngressos = ref([])
const totalIngressos = ref(0)
const data = ref('')
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
            data.value = evento.value.data_evento.substring(0, 10).replaceAll('/', '-')
        })
        .catch(error => {
            console.log(error)
        }).finally(() => {
            pageLoaded.value = true
        })
}

function ingressoExistInCart(ingresso) {
    let exist = false
    cartIngressos.value.forEach(item => {
        if (item.titulo === ingresso.titulo) {
            exist = true
        }
    })
    return exist
}

function removeCartIngresso(ingresso) {
    cartIngressos.value.forEach((item, index) => {
        if (item.titulo === ingresso.titulo) {
            if (item.qtdCart > 1) {
                item.qtdCart--
            } else {
                cartIngressos.value.splice(index, 1)
            }
        }
    })
    totalIngressos.value--
    $q.notify({
        message: 'Ingresso Removido do Carrinho',
        color: 'red-8',
        position: 'top',
        icon: 'remove_shopping_cart'
    })
    console.log(JSON.stringify(cartIngressos.value))
}

function addCartIngressos(ingresso) {
    let existIngresso = false
    cartIngressos.value.forEach(item => {
        if (item.titulo === ingresso.titulo) {
            item.qtdCart++
            existIngresso = true
            return
        }
    })
    if(!existIngresso) {
        ingresso.qtdCart = 1
        cartIngressos.value.push(ingresso)
    }
    $q.notify({
        message: 'Ingresso Adicionado ao Carrinho',
        color: 'green-8',
        position: 'top',
        icon: 'add_shopping_cart'
    })
    console.log(JSON.stringify(cartIngressos.value))
    totalIngressos.value++
}

onBeforeMount(async () => {
    await getEvento()
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