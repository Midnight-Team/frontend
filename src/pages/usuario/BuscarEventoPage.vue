<template>
  <q-page class="bg-grad-7 w100 q-px-md animate__animated animate__fadeIn q-pb-xl">
    <div class="form-wrapper rounded-borders q-pt-md column items-center justify-center ">
      <q-input @keyup.enter="buscarEvento()" v-model="busca.titulo"
        :inputStyle="{ fontWeight: 'bold', color: '#6310E1' }" class="w100 bg-white rounded-borders cursor-pointer" filled
        label="Procurar Eventos">
        <template v-slot:append>
          <q-icon v-if="busca.titulo.trim() != ''" color="secondary" size="sm" @click="busca.titulo = ''; buscarEvento()"
            name="close" />
          <q-icon color="primary" size="lg" @click="buscarEvento()" name="search" />
        </template>
      </q-input>
      <q-list v-if="eventos.length > 0 && !loading" class="w100 animate__animated animate__backInUp ">
        <div style="font-size:1rem;" class="text-center q-py-xs text-secondary rounded-borders q-mt-md">
          <strong>{{ eventos.length }}</strong> Evento(s) Encontrado(s)
        </div>
        <div class="w100 items-wrapper column">
          <q-item v-for="evento in eventos" :key="evento.id"
            :class="'rounded-borders q-mt-md row ' + (Number(evento.hora_evento.replace(':', '.')) > 18 ? 'bg-blue-grad' : 'bg-orange-grad')">
            <q-item-section class="row no-wrap items-center">
               <div class="w100 q-mt-sm rounded-borders">
                <img class="w100 rounded-borders" style="border: 6px solid #6310E1" :src="evento.img_url" />
               </div>
              <div class="column justify-center items-center q-pt-sm">
                <q-item-label class="text-primary text-center" id="title-menu">{{ evento.titulo }}</q-item-label>
                <q-item-label class="text-primary high-opacity text-bold">{{ evento.host_name.toUpperCase()
                  }}</q-item-label>
              </div>
              <div class="w100 text-center text-bold text-secondary q-my-sm">
                {{ evento.data_evento }}
              </div>
              <q-btn @click="openEvento(evento.id)" label="visualizar evento" class="w100 q-pa-md q-my-sm"
                color="primary" icon-right="visibility" glossy></q-btn>
            </q-item-section>
          </q-item>
        </div>
      </q-list>
      <div id="title-menu" v-if="eventos.length == 0 && !loading" class="q-mt-md text-center text-h6 text-secondary">
        Nenhum
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
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter()
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
  sessionStorage.setItem('evento', id);
  router.push('/eu/evento');
}

onMounted(async () => {
  await buscarEvento()
});
</script>

<style scoped>
@media (min-width: 800px) {
  .q-page {
    padding: 0 220px;
  }

  .items-wrapper {
    flex-direction: row;
    justify-content: space-between;
  }

  .q-input{
    width: 25vw;
  }

  .q-item {
    width: 30vw;
  }
}

.bg-blue-grad {
  background: #bef3ff;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to top, #bef3ff, #138ba9);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to top, #d6deff, #1366a9);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.bg-orange-grad {
  background: #ffda7e;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #f8b500, #fceabb);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #f8b500, #fceabb);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
</style>