<template>
  <q-page class="bg-grad-7 w100 q-px-md animate__animated animate__fadeIn q-pb-xl">
    <div class="form-wrapper rounded-borders q-pt-md">
      <q-input @keyup.enter="buscarEvento()" v-model="busca.titulo"
        :inputStyle="{ fontWeight: 'bold', color: '#6310E1' }" class="bg-white rounded-borders cursor-pointer" outlined
        label="Buscar Eventos">
        <template v-slot:append>
          <q-icon v-if="busca.titulo.trim() != ''" color="secondary" size="sm" @click="busca.titulo = ''"
            name="close" />
          <q-icon color="primary" size="lg" @click="buscarEvento()" name="search" />
        </template>
      </q-input>
      <q-list v-if="eventos.length > 0 && !loading" class="animate__animated animate__backInUp ">
        <div class="text-center q-py-xs text-secondary bg-grey-3 rounded-borders q-my-sm"><strong>{{ eventos.length
            }}</strong>
          Evento(s) Encontrado(s)</div>
        <q-item v-for="evento in eventos" :key="evento.id" class="bg-blue-grad rounded-borders">
          <q-item-section class="row no-wrap items-center">
            <q-avatar size="150px" class="q-my-md shadow-4">
              <img :src="evento.img_url" />
            </q-avatar>
            <div class="column justify-center items-center">
              <q-item-label class="text-primary text-center" id="title-menu">{{ evento.titulo }}</q-item-label>
              <q-item-label class="text-primary high-opacity text-bold">{{ evento.host_name.toUpperCase() }}</q-item-label>
            </div>
            <div class="w100 text-center text-bold text-secondary q-my-sm">
              {{ evento.data_evento }}
            </div>
            <q-btn @click="openEvento(evento.id)" label="visualizar evento" class="w100 q-pa-md q-mt-sm" color="primary"
              icon-right="visibility" glossy></q-btn>
          </q-item-section>
        </q-item>
      </q-list>
      <div id="title-menu" v-if="eventos.length == 0 && !loading" class="q-mt-md text-center text-h6 text-secondary">Nenhum
        Evento<br>Encontrado
        🌃</div>
      <div v-if="loading" class="row w100 q-pt-md justify-center">
        <q-spinner-ball color="primary" size="lg" />
        <q-spinner-ball color="primary" size="lg" />
        <q-spinner-ball color="primary" size="lg" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { api } from "src/boot/axios";
import { ref } from "vue";
const loading = ref(false);


const busca = ref({
  titulo: '',
  host_name: '',
});

const eventos = ref([]);

async function buscarEvento() {
  loading.value = true;
  await api.post('/buscar', { titulo: busca.value.titulo })
    .then(response => {
      eventos.value = response.data;
    })
    .catch(error => {
      console.log(error);
    });
  loading.value = false;
}

function openEvento(id) {
  alert(id);
}
</script>

<style scoped>
@media (min-width: 600px) {
  .q-page {
    max-width: 600px;
    margin: 0 auto;
  }

}

.bg-blue-grad {
  background: #bef3ff;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to top, #bef3ff, #83dbf1);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to top, #bef3ff, #83dbf1); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>