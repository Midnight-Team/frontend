<template>
  <div class="es1 bg-white q-mx-sm  rounded-borders shadow-4 relative">
    <div class="title-1 w100 text-h6 row items-center text-primary shadow-1 q-py-xs justify-center text-bold">
      <q-icon size="md" color="primary" name="admin_panel_settings" class="q-pr-sm" />
      Confirmar Host do Evento
    </div>
    <div class="column q-gutter-y-md q-pa-md q-mb-xl text-primary text-bold text-center">
      <div>
        <div class="mid-opacity">Confirmo a Criação do Evento:<br>{{ pacote.label }}<q-icon size="xs" class="q-pl-xs" name="paid" color="primary" /> </div>
      </div>
      <q-input outlined v-model="host.senha" maxlength="20" :type="!host.lockpassword ? 'password' : 'text'"
        label="Senha*">
        <template v-slot:prepend>
          <q-icon name="lock" color="primary" />
        </template>
        <template v-slot:append>
          <q-btn flat :icon="host.lockpassword ? 'visibility' : 'visibility_off'"
            @click="host.lockpassword = !host.lockpassword" color="primary" />
        </template>
      </q-input>

      <div class="w100 hline bg-primary"></div>
      <q-btn  :disabled="check()"  label="Criar Evento" color="green" @click="goNext()" icon-right="post_add" />
      <q-btn label="voltar" flat color="primary" @click="goPrev()" />
    </div>

  </div>
</template>

<script setup>
import { ref, defineEmits, onMounted } from "vue";

const emit = defineEmits(['next', 'prev'])
const goNext = () => {
  emit('next')
}

const goPrev = () => {
  emit('prev')
}


const host = ref({
  login: '',
  senha: '',
  lockpassword: false
})

const pacote = ref('')

const check = () => {
  return host.value.senha.length == 0
}

onMounted(() => {
  window.scrollTo(0, 0);
  const es1Storage = sessionStorage.getItem('eventoStep1')
  const es1 = JSON.parse(es1Storage)
  pacote.value = es1.qtd_ingressos_inicial

})
</script>

<style scoped>
.title-1 {
  position: sticky;
  top: 138px;
  background: #efefef4d;
  backdrop-filter: blur(2px);
  z-index: 1;
}
</style>