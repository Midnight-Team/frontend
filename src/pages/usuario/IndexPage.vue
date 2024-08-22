<template>
  <q-page class="bg-grad-7 column justify-center items-center ">
    <div id="title-menu" class="q-px-md text-center text-secondary text-bold">
       Página do Usuário<br>em desenvolvimento...<br><br><br><q-spinner-gears color="secondary" /><q-spinner-gears color="secondary" /><q-spinner-gears color="secondary" /><q-spinner-gears color="secondary" /><q-spinner-gears color="secondary" /><q-spinner-gears color="secondary" /><br>¯\_( ͡° ͜ʖ ͡°)_/¯
    </div>
    <div id="user-info" class="q-mt-md">
        <q-card class="bg-grad-1 text-white" style="width: 300px;">
            <q-card-section class="column">
                <q-card-title class="text-white text-bold row items-center">
                    <q-icon size="md" color="purple-1" name="local_activity" class="q-mr-sm" />
                    {{ user.nome }}
                </q-card-title>
            <q-card-subtitle class="text-secondary text-bold">
                {{ user.email }}<br>
                {{ user.cpf }}<br>
                {{ user.telefone }}
            </q-card-subtitle>
        </q-card-section>
            <q-btn
            class="absolute-right"
                color="red"
                glossy
                label="Sair"
                @click="logout()"
            />
        </q-card>
    </div>
  </q-page>
</template>

<script setup>
const user = JSON.parse(sessionStorage.getItem('user'))

function logout() {
    sessionStorage.clear()
    window.location.href = '/'
}

</script>

<style>

</style>