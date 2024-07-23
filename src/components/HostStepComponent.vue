<template>
  <div class="es1 bg-white q-mx-sm  rounded-borders shadow-4 relative">
    <div class="title-1 w100 text-h6 row items-center text-primary shadow-1 q-py-xs justify-center text-bold">
      <q-icon size="md" color="primary" name="admin_panel_settings" class="q-pr-sm" />
      Confirmar Host do Evento
    </div>
    <div class="column q-gutter-y-md q-pa-md q-mb-xl text-primary text-bold text-center">
      <div>
        <div class="mid-opacity">Eu confirmo a criação do Evento<br> 50 Ingressos por 1 PurpleCoins<q-icon size="xs" class="q-pl-xs" name="paid" color="primary" /> </div>
      </div>
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

      <div class="w100 hline bg-primary"></div>
      <q-btn label="Criar Evento" color="green" @click="goNext()" icon-right="post_add" />
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
  saldo_pc: '3 PurpleCoins',
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