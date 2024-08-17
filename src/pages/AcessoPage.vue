<template>
  <q-page class="bg-grad-2 q-px-md  q-py-md animate__animated animate__fadeIn ">
    <div class="q-mb-md text-h6 text-bold bg-grad-1  rounded-borders text-white row items-center justify-center q-pa-md">
      <q-icon size="md" name="sensor_occupied" color="blue-1" class="q-pr-sm"></q-icon>
      Acessos
    </div>
    <p class="text-center text-white">
      Os acessos são as contas que você cria e disponibiliza para os colaboradores de seus eventos
    </p>
    <div class="w100 q-mb-md rounded-borders ">
      <q-input maxlength="20" :input-style="{ fontSize: '1rem', fontWeight: 'bold', color: '#6310E1'}" outlined class="bg-grey-2 rounded-borders q-mb-md" v-model="acesso.id" label="Login do Acesso*"/>
      <q-input maxlength="40" :input-style="{ fontSize: '1rem', fontWeight: 'bold', color: '#6310E1'}"  outlined class="bg-grey-2 rounded-borders" v-model="acesso.nome" label="Título do Acesso*" placeholder="ex: Entrada Principal ou nome da pessoa" />
      <q-btn @click="createAccessPerson()" :disabled="acesso.id.trim() == '' || acesso.nome.trim() == ''" class="w100 q-mt-md" label="Criar Acesso" icon-right="person_add"
        color="green" />
    </div>
    <div class="q-mb-md text-h6 text-bold bg-grad-1  rounded-borders text-white row items-center justify-center q-pa-md">
      <q-icon size="md" name="people" color="blue-1" class="q-pr-sm"></q-icon>
      Acessos Criados
    </div>
      <div v-if="!loading" class="rounded-borders bg-grad-4 row q-pa-md q-mt-md justify-around cards-wrapper">
          <q-card id="card-acesso" v-for="acesso in acessos" :key="acesso.id" class="w100 bg-blue-1 q-mb-md">
            <q-card-section>
              <q-icon name="engineering" size="xl" color="primary" class="absolute-right q-pa-xs q-pr-sm"></q-icon>
              <div class="text-h6 text-bold text-primary q-pt-lg">{{ acesso.nome }}</div>
              <div class="text-subtitle2 text-bold text-secondary">{{ acesso.id }}</div>
            </q-card-section>
            <q-card-actions align="left">
              <q-btn @click="deleteAccessPerson(acesso.id)" class="absolute-top-left q-mb-sm" icon="delete" flat color="secondary" />
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
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: 'O campo de identificação não pode conter espaços!',
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
  await api.post('/create_access_person', { host: myHost, acesso: acesso.value })
  .then(response => {
    $q.notify({
      color: 'green',
      textColor: 'white',
      icon: 'check',
      message: 'Acesso criado com sucesso!',
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
      $q.notify({
        color: 'green',
        textColor: 'white',
        icon: 'delete',
        message: 'Acesso excluído com sucesso!',
        position: 'top'
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
    width: 280px;
  }
}

</style>