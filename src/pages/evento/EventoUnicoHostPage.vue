<template>
    <q-page class="animate__animated animate__fadeIn  column bg-grad-3 q-px-md q-pb-xl relative" id="dialog-evento" v-if="pageLoaded">
        <div class="w100 q-mt-sm">
            <img class="shadow-2" id="img-evento" style="border: 4px solid #610FE1" :src="evento.img_url" alt="">
        </div>
        <div class="w100 q-mt-xs rounded-borders">
            <div id="title-menu" class="text-h5 text-center text-purple-1 rounded-borders bg-grad-1 q-pa-md  text-bold">
                {{ evento.titulo }}
            </div>
        </div>
        <q-btn @click="editando = !editando" class="q-mt-sm q-py-md" :color="editando ? 'orange-8' : 'blue'" :icon-right="editando ? 'close' : 'edit'" :label="editando ? 'Cancelar edição' : 'Editar Evento'"></q-btn>
        <div class="q-px-md q-gutter-y-md q-mt-sm bg-glass-1 rounded-borders q-pb-md">
            <div class="text-h6 text-primary text-bold" id="text-menu">
                <q-icon name="nightlife" size="md" class="text-primary" />
                EVENTO
            </div>
            <q-input v-if="editando" label="Link da Imagem" v-model="evento.img_url" outlined color="primary"></q-input>
            <q-input v-if="editando" label="Título do Evento" v-model="evento.titulo" outlined color="primary"></q-input>
            <div class="w100">
                {{ evento.status }}
            </div>
            <q-input :readonly="!editando" label="Contato" v-model="evento.contato" type="textarea" outlined color="primary"></q-input>
            <q-input type="textarea" label="Descrição" v-model="evento.descricao" outlined color="primary"
                :readonly="!editando" :filled="!editando"></q-input>
            <!-- <q-input label="Data" v-model="evento.data_evento" outlined color="primary" :readonly="!editando" :filled="!editando"></q-input> -->
            <div class="row q-gutter-x-md justify-center no-wrap">
                <q-input label="Horário de Início" v-model="evento.hora_evento" outlined color="primary" :readonly="!editando" :filled="!editando"></q-input>
                <q-input v-if="evento.hora_final" label="Horário de Término" v-model="evento.hora_final" outlined color="primary"
                :readonly="!editando" :filled="!editando"></q-input>
            </div>
            <q-date :readonly="!editando" class="w100" v-model="evento.data_evento" mask="DD-MM-YYYY" color="primary" />
            <q-input label="Endereço" v-model="evento.endereco" type="textarea" outlined color="primary" readonly filled></q-input>
            <div v-if="evento.localizacao && !evento.localizacao.trim() == ''" class="w100 q-mt-md rounded-borders">
                <iframe :src="evento.localizacao" class="w100 rounded-borders shadow-2" height="200" style="border:0;" allowfullscreen=""
                    loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
        <div id="subhost-info" class="bg-glass-1 rounded-borders q-pa-md q-mt-md">
            <div class="text-h6 text-primary text-bold " id="text-menu">
                <q-icon name="confirmation_number" size="md" class="text-primary" />
                INGRESSOS
            </div>
            <div class="text-bold text-secondary q-mt-sm">Ingressos Disponíveis:  74/{{ evento.qtd_ingressos }}</div>
            <div class="w100 text-primary text-bold mid-opacity">
                <!-- faça um v-for no evento.tipos_ingressos mostrando o titulo, valor e quantidade. -->
                <div class="row no-wrap items-center no-wrap q-pa-sm q-mt-md rounded-borders" v-for="ingresso in evento.tipos_ingressos" :key="ingresso.id" style="border: 2px solid #872DE1">
                    <q-icon name="local_activity" size="xl"></q-icon>
                    <div class="column q-ml-sm">
                        <div class="text-black text-h6">{{ ingresso.titulo }}</div>
                        <div>R$ {{ ingresso.valor }}</div>
                        <div> 34/{{ ingresso.quantidade }} Ingressos</div>
                    </div>
                </div>
            </div>
            <q-btn v-if="!editando" label="Adicionar Ingressos" icon-right="confirmation_number" class="q-mt-md" color="primary"></q-btn>
        </div>
        <div id="pacote-info" class="bg-glass-1 rounded-borders q-pa-md q-mt-md">
            <div class="text-h6 text-primary text-bold" id="text-menu">
                <q-icon name="local_atm" size="md" class="text-primary" />
                PACOTES
            </div>
            <div class="w100 text-primary text-bold mid-opacity q-pt-md">
                <div class="w100 rounded-borders bg-primary mid-opacity q-mb-md" style="height:4px"></div>
                🌱 PACOTE INICIAL<br>
                💰 {{ evento.pacote.label }}<br>
                🎟️ Máximo de Ingressos: {{ evento.pacote.max_ingressos}}<br>
                <div class="w100 rounded-borders bg-primary mid-opacity q-mt-md" style="height:4px"></div>
            </div>
        </div>
        <div id="subhost-info" class="bg-glass-1 rounded-borders q-pa-md q-mb-xl q-mt-md">
            <div class="text-h6 text-primary text-bold " id="text-menu">
                <q-icon name="groups" size="md" class="text-primary" />
                ACESSO
            </div>
            <div class="w100 text-primary text-bold mid-opacity q-pb-md">
                <!-- faça um v-for no evento.subhosts mostrando o id e o nome -->
                <div class="row no-wrap items-center no-wrap q-py-sm q-mt-md" v-for="subhost in evento.subhosts" :key="subhost.id" style="border-bottom: 4px solid #872DE1;border-top: 4px solid #872DE1">
                    <q-icon name="person" size="xl"></q-icon>
                    <div class="column q-ml-sm">
                        <div>{{ subhost.nome }}</div>
                        <div>{{ subhost.id }}</div>
                    </div>
                </div>
            </div>
            <q-btn v-if="!editando" label="Adicionar Subhost" icon-right="person_add" class="q-mt-md" color="primary"></q-btn>
        </div>
        <q-btn v-if="!editando" class=" w100  q-py-xl q-mb-md" label="Painel de Vendas" icon-right="payments" icon="insert_chart" color="primary"></q-btn>
        <q-btn v-if="!editando" class=" w100  q-py-lg " label="Visualizar Convite" icon-right="visibility" color="dark"></q-btn>
        <q-btn v-if="!editando" class="w100 q-mt-md q-mb-lg" label="Cancelar Evento" icon-right="cancel" color="red-8"></q-btn>
        <div class="w100 q-pb-xl"></div>
        <q-btn v-if="editando" class=" w100 q-mt-md q-py-xl fixed" style="bottom:0px;left:0px;z-index: 9;" label="Salvar Alterações" icon-right="save" color="green-7"></q-btn>
    </q-page>
    <q-page v-else>
        <div class="row w100 q-pt-md justify-center">
            <q-spinner-ball color="blue" size="lg"/>
            <q-spinner-ball color="blue" size="lg"/>
            <q-spinner-ball color="blue" size="lg"/>
        </div>
    </q-page>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { api } from 'src/boot/axios';

const evento = ref({})
const pageLoaded = ref(false)
const editando = ref(false)
onBeforeUnmount(() => {
    // sessionStorage.removeItem('eventoHandlerId')
})

onBeforeMount(async () => {
    const host = JSON.parse(sessionStorage.getItem('userLogado'));
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
})



</script>

<style scoped>
#img-evento {
    width: 100%;
    height: 200px;
    border-radius: 10px;
}
@media (min-width: 1100px) {
    .q-page {
        padding: 16px 200px;
    }
    #img-evento {
        width: 100%;
        height: 600px;
        border-radius: 10px;
    }
}

</style>