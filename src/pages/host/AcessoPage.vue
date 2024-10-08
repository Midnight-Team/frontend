<template>
  <q-page class="bg-puple-light q-px-md  q-py-md animate__animated animate__fadeIn ">
    <q-btn icon="keyboard_return" flat color="grey-5" class="q-py-sm absolute-top-left" to="/eventos" label="eventos"></q-btn>
    <div class="q-mb-md q-mt-lg text-h6 text-bold bg-grad-1  rounded-borders text-white row items-center justify-center q-pa-md">
      <q-icon size="md" name="sensor_occupied" color="white" class="q-pr-sm"></q-icon>
      ACESSOS
    </div>
    <!-- <p class="text-center text-white">
      Os acessos são as contas que você cria e disponibiliza para seus colaboradores de eventos validarem os ingressos dos seus clientes.
    </p> -->
    <div class="w100 q-mb-md rounded-borders ">
      <q-input maxlength="40" :input-style="{ fontSize: '1rem', fontWeight: 'bold', color: '#6310E1'}"  filled class="bg-purple-light rounded-borders" v-model="acesso.nome" label="Título do Acesso*" placeholder="Entrada Principal, Maria Recepção..." >
        <template v-slot:prepend>
          <q-icon name="title" color="primary" />
        </template>
      </q-input>
      <q-input maxlength="20" :input-style="{ fontSize: '1rem', fontWeight: 'bold', color: '#6310E1'}" filled class="bg-purple-light rounded-borders q-mt-md" v-model="acesso.id" label="Login do Acesso*">
          <template v-slot:prepend>
            <q-icon name="assignment_ind" color="primary" />
          </template>
      </q-input>
      <q-btn glossy  @click="createAccessPerson()" :disabled="acesso.id.trim() == '' || acesso.nome.trim() == ''" class="w100 q-mt-md q-pa-lg" label="Criar Acesso" icon-right="person_add"
        color="positive" />
    </div>
    <div v-if="acessos && acessos.length > 0" id="title-layout" class="text-bold rounded-borders text-secondary row items-center q-pa-sm">
      {{ acessos.length }} ACESSO(S) CADASTRADO(S):
    </div>
      <div v-if="!loading && acessos.length > 0" class="rounded-borders row q-pa-sm cards-wrapper justify-center" style="gap:5%">
          <q-card id="card-acesso" v-for="acesso in acessos" :key="acesso.id" class="w100 bg-grad-7 q-mb-md">
            <q-card-section>
              <div class="text-h6 text-bold text-grey-4 q-pt-md text-center" id="title-layout">{{ acesso.nome.toUpperCase() }}</div>
              <div class="text-subtitle2 text-bold text-secondary text-center q-mt-sm"><q-icon name="assignment_ind" size="sm" class="q-mr-sm"></q-icon>{{ acesso.id }}</div>
            </q-card-section>
            <q-card-actions align="left">
              <q-btn @click="deleteAccessPerson(acesso.id)" class="absolute-top-left q-mb-sm" icon="close" flat color="red" />
            </q-card-actions>
          </q-card>
      </div>
      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="signal_wifi_off" color="primary" text-color="white" />
            <span class="q-ml-sm">You are currently not connected to any network.</span>
          </q-card-section>
  
          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Turn on Wifi" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <div v-if="loading" class="row w100 q-py-md justify-center">
        <q-spinner-ball color="blue" size="lg" />
        <q-spinner-ball color="blue" size="lg" />
        <q-spinner-ball color="blue" size="lg" />
    </div>
  </q-page>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { api } from 'src/boot/axios';
import { useQuasar } from 'quasar';

const $q = useQuasar()
const acesso = ref({
  id: '',
  nome: ''
})

const loading = ref(false)
const confirm = ref(false)

function verificaEspacosStr(str) {
  return str.includes(' ')
}

async function createAccessPerson(){
  if(verificaEspacosStr(acesso.value.id)){
    $q.notify({
      color: 'red-8',
      textColor: 'white',
      icon: 'fingerprint',
      message: 'O campo de identificação não pode conter espaços',
      position: 'top'
    })
    acesso.value.id = ''
    return
  }
  const myHost = {
    id: JSON.parse(sessionStorage.getItem('userLogado')).id,
    senha: JSON.parse(sessionStorage.getItem('userLogado')).senha
  }
  acesso.value.id = acesso.value.id.trim().toLowerCase()
  loading.value = true
  await api.post('/create_access_person', { host: myHost, acesso: acesso.value })
  .then(response => {
    $q.notify({
      color: 'green-7',
      textColor: 'white',
      icon: 'assignment_ind',
      message: 'Acesso criado com sucesso',
      position: 'top'
    })
    acesso.value.id = ''
    acesso.value.nome = ''
    getAcessos()
  })
  .catch(err=> {
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: err.response.data.error,
      position: 'top'
    })
    loading.value = false
  })
}

async function deleteAccessPerson(id){
  const confirm = window.confirm('Deseja realmente excluir este acesso permanentemente?')
  if(confirm){
    const myHost = {
      id: JSON.parse(sessionStorage.getItem('userLogado')).id,
      senha: JSON.parse(sessionStorage.getItem('userLogado')).senha
    }
    await api.post('/delete_access_person', { host: myHost, acesso: { id: id } })
    .then(response => {
      loading.value = true
      $q.notify({
        color: 'green-7',
        textColor: 'white',
        icon: 'delete',
        message: 'Acesso Excluído com sucesso',
        position: 'bottom'
      })
      getAcessos()
    })
    .catch(err=> {
      $q.notify({
        color: 'red-4',
        textColor: 'white',
        icon: 'error',
        message: err.response.data.error,
        position: 'top'
      })
    loading.value = false
    })
  }
}

const columns = [
  { name: 'id', label: 'Identificação', align: 'left', field: 'id', sortable: true },
  { name: 'nome', label: 'Nome', align: 'left', field: 'nome', sortable: true },
  { name: 'actions', label: 'Ações', align: 'center', field: 'actions' }
]

const acessos = ref([])

async function getAcessos(){
  const myHost = {
    id: JSON.parse(sessionStorage.getItem('userLogado')).id,
    senha: JSON.parse(sessionStorage.getItem('userLogado')).senha
  }
  loading.value = true
  const response = await api.post('/get_access_people', {id: myHost.id, senha: myHost.senha})
  acessos.value = response.data
  loading.value = false
}

onBeforeMount(async () => {
  loading.value = true
  await getAcessos()
})

</script>

<style scoped>
.q-page {
  min-height: 100vh!important;
}

@media (min-width: 1100px) {
  .q-page {
   padding: 16px 320px
  }
  #card-acesso{
    width: 45%
  }
}
.bg-puple-light{
  background-color: #2d0b6b;
}
</style>