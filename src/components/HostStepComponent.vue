<template>
  <div class="es1 bg-white q-mx-sm  rounded-borders shadow-4 relative">
    <div class="title-1 w100 text-h6 row items-center text-primary shadow-1 q-py-xs justify-center text-bold">
      <q-icon size="md" color="primary" name="admin_panel_settings" class="q-pr-sm" />
      Confirmação de Login
    </div>
    <div class="column q-gutter-y-md q-pa-md q-mb-xl">
      <q-input outlined v-model="host.login" label="Login*">
        <template v-slot:prepend>
          <q-icon name="person" color="primary" />
        </template>
      </q-input>
      <q-input outlined v-model="host.senha" maxlength="15" :type="!host.lockpassword ? 'password' : 'text'"
        label="Senha*">
        <template v-slot:prepend>
          <q-icon name="lock" color="primary" />
        </template>
        <template v-slot:append>
          <q-btn flat :icon="host.lockpassword ? 'visibility' : 'visibility_off'"
            @click="host.lockpassword = !host.lockpassword" color="primary" />
        </template>
      </q-input>
      <div>
        <div class="row items-center w100 justify-center no-wrap">
          <q-icon size="md" name="paid" color="primary" />
          <div class="q-pl-sm text-primary text-bold">{{ host.saldo_pc }}</div>
          <div class="q-pl-sm text-red text-bold">- 1</div>
          <div class="q-pl-sm text-primary text-bold">= 2 Purple Coins</div>
        </div>
      </div>
      <div class="w100 hline bg-primary"></div>
      <q-btn label="Confirmar Evento" color="green" @click="goNext()" icon-right="today" />
      <q-btn label="voltar" flat color="primary" @click="goPrev()" />
    </div>

  </div>
</template>

<script setup>
import { ref, defineEmits, onMounted } from "vue";

const emit = defineEmits(['next'])
const goNext = () => {
  emit('next', 'prev')
}

const goPrev = () => {
  emit('prev')
}


const host = ref({
  login: '',
  senha: '',
  saldo_pc: '3 Purple Coins',
  lockpassword: false
})

onMounted(() => {
  window.scrollTo(0, 0);
})
</script>

<style scoped>
.title-1 {
  position: sticky;
  top: 138px;
  background: #efefef4d;
  backdrop-filter: blur(2px);
  z-index: 1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
</style>