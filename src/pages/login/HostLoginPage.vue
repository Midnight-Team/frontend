<template>
    <div id="hostlogin-wrapper" class="animate__animated animate__zoomIn  flex flex-center">
        <q-card class="shadow-9  q-mt-md " id="card-login">
            <div class="text-h5 q-pl-md q-pt-md text-primary text-bold row items-center">
                <q-icon :name="usuario.isSubhost ? 'sensor_occupied' :'admin_panel_settings'" size="lg" class="q-mr-md"/>
                Login {{ usuario.isSubhost ? 'Subhost' : 'Host' }}
            </div>
            <q-card-section>
                <q-form @submit="login">
                    <q-toggle class="w100 row text-bold text-primary q-mb-sm" @update:model-value="usuario.senha = ''" v-model="usuario.isSubhost" :label="usuario.isSubhost ? 'Sou Subhost' : 'Sou Host'" color="primary"/>
                    <q-input filled v-model="usuario.login" :label="usuario.isSubhost ? 'CPF*' : 'Login*'" />
                    <q-input filled class="q-mt-md" v-if="!usuario.isSubhost" v-model="usuario.senha" label="Senha*" :type="showPassword ? 'text' : 'password'">
                        <template v-slot:append>
                            <q-icon :name="showPassword ? 'visibility' : 'visibility_off'" color="primary" class="cursor-pointer" @click="showPassword = !showPassword" />
                        </template>
                    </q-input>
                    <q-input filled class="q-mt-md" v-if="usuario.isSubhost" v-model="usuario.senha" label="Access Code*" type="text">
                        <template v-slot:append>
                            <q-icon name="content_copy" color="primary" class="cursor-pointer" @click="colarAcessCode()" />
                        </template>
                    </q-input>
                    <q-btn type="submit" :label="usuario.isSubhost ? 'Escanear Ingressos' : 'Entrar'" color="primary" :icon-right="usuario.isSubhost ? 'document_scanner' :'login'" class="w100 q-mt-md"/>
                </q-form>
            </q-card-section>
        </q-card>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const showPassword = ref(false);
const usuario = ref({
    login: '',
    senha: '',
    isSubhost: false,
})

function colarAcessCode() {
    navigator.clipboard.readText().then(text => {
        usuario.value.senha = text;
    });
}
onMounted(() => {
    window.scrollTo(0, 0);
})
</script>

<style scoped>
#card-login {
    width: 600px;
}
@media (max-width: 600px) {
    #card-login {
        width: 90vw;
    }
}
</style>