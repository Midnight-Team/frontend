<template>
  <div class="es1 bg-white q-mx-sm rounded-borders shadow-4 relative">
    <div class="title-1 w100 text-h6 row items-center text-primary shadow-1 q-py-xs justify-center text-bold">
      <q-icon size="md" color="primary" name="admin_panel_settings" class="q-pr-sm" />
      Confirmar Host do Evento
    </div>
    <div class="column q-gutter-y-md q-pa-md q-mb-xl text-primary text-bold text-center">
      <div>
        <div class="mid-opacity">Confirmo a Criação do Evento:<br>{{ pacote.label }}<q-icon size="xs" class="q-pl-xs" name="paid" color="primary" /></div>
      </div>
      <div class="w100 hline bg-primary"></div>
      <q-input outlined v-model="host.senha" maxlength="20" :type="!lockpassword ? 'password' : 'text'" label="Senha*">
        <template v-slot:prepend>
          <q-icon name="lock" color="primary" />
        </template>
        <template v-slot:append>
          <q-btn flat :icon="lockpassword ? 'visibility' : 'visibility_off'" @click="lockpassword = !lockpassword" color="primary" />
        </template>
      </q-input>

      <q-btn :disabled="check()" label="Criar Evento" color="primary" class="q-py-md" @click="criarEvento()" icon-right="event" />
      <!-- <q-btn label="voltar" flat color="primary" @click="goPrev()" /> -->
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, onMounted } from "vue";
import { useAuthStore } from 'src/stores/authStore';
import { api } from 'src/boot/axios';
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const $q = useQuasar();
const authStore = useAuthStore();
const emit = defineEmits(['next']);
const host = ref({
  id: authStore.getInfoId(),
  senha: '',
});
const router = useRouter();

const criarEvento = async () => {
  const step1 = JSON.parse(sessionStorage.getItem('eventoStep1'));
  const step2 = JSON.parse(sessionStorage.getItem('eventoStep2'));
  const evento = { evento: { tipos_ingressos: step2 ,...step1}, host: host.value }
  // console.log("EVENTO: " + JSON.stringify(evento));
  await api.post('/create_evento', evento).then(res => {
    $q.notify({
      color: 'positive',
      message: res.data.message,
      icon: 'local_activity',
      position: 'top',
      timeout: 2000,
    });
    $q.notify({
      color: 'primary',
      message: res.data.evento.msgPurpleCoins,
      icon: 'paid',
      position: 'bottom',
      timeout: 3000,
    });
    authStore.setInfoPurpleCoins(res.data.evento.host.purpleCoins);
    authStore.setInfoSubCoins(res.data.evento.host.subCoins);
    sessionStorage.removeItem('eventoStep1');
    sessionStorage.removeItem('eventoStep2');
    sessionStorage.removeItem('eventoStep3');

    router.push('/evento');
  }).catch(err => {
    $q.notify({
      color: 'negative',
      message: err.response.data.error,
      icon: 'error',
      position: 'top',
    });
    host.value.senha = '';
  });
};

const goPrev = () => {
  emit('prev');
};


const lockpassword = ref(false)

const pacote = ref('');

const check = () => {
  return host.value.senha.length === 0;
};

onMounted(() => {
  window.scrollTo(0, 0);
  const es1Storage = sessionStorage.getItem('eventoStep1');
  const es1 = JSON.parse(es1Storage);
  pacote.value = es1.pacote;
});

</script>

<style scoped>
.title-1 {
  position: sticky;
  top: 90px;
  background: #efefef4d;
  backdrop-filter: blur(2px);
  z-index: 1;
}
</style>
