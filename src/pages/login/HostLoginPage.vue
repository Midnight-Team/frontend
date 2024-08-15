<template>
    <div id="hostlogin-wrapper" class="bg-dark animate__animated animate__zoomIn  flex flex-center">
        <div class="rounded-borders" id="card-login">
            <div id="title-menu" class=" q-pl-md q-pt-md text-secondary text-bold row items-center">
                <q-icon :name="!usuario.isHost ? 'sensor_occupied' : 'admin_panel_settings'" size="lg"
                class="q-mr-md" />
                {{ usuario.isHost ? 'Host' : 'Subhost' }}
            </div>
            <q-card-section>
                <div>
                    <q-checkbox class=" w100 bg-grad-6 row text-bold rounded-borders text-secondary " @update:model-value="usuario.senha = ''"
                        v-model="usuario.isHost" :label="!usuario.isHost ? 'Sou Subhost' : 'Sou Host' "
                         color="secondary" />
                    <q-input class="bg-grey-3" maxlength="30" filled v-model="usuario.login" :label="usuario.isHost ? 'Login' : 'ID SubHost'">
                        <template v-slot:prepend>
                            <q-icon size="md" name="person" color="primary" />
                        </template>
                    </q-input>
                    <q-input  maxlength="20" filled class="q-mt-md bg-grey-3" v-if="usuario.isHost"  @keyup.enter="login()" v-model="usuario.senha" label="Senha"
                        :type="showPassword ? 'text' : 'password'">
                        <template v-slot:prepend>
                            <q-icon size="md" name="lock" color="primary" />
                        </template>
                        <template v-slot:append>
                            <q-icon :name="showPassword ? 'visibility' : 'visibility_off'" color="primary"
                                class="cursor-pointer" @click="showPassword = !showPassword" />
                        </template>
                    </q-input>
                    <q-input maxlength="100" filled class="q-mt-md bg-grey-3" v-if="!usuario.isHost" v-model="usuario.evento_id"
                        label="Evento" type="text">
                        <template v-slot:prepend>
                            <q-icon name="nightlife" size="md" color="primary" class="cursor-pointer"/>
                        </template>
                        <template v-slot:append>
                            <q-icon name="content_copy" color="primary" class="cursor-pointer"
                                @click="colarAcessCode()" />
                        </template>
                    </q-input>
                    <q-input  @keyup.enter="login()" maxlength="4" mask="####" filled class="q-mt-md bg-grey-3" v-if="!usuario.isHost" v-model="usuario.access_code"
                        label="Código de Acesso" type="text">
                        <template v-slot:prepend>
                            <q-icon name="vpn_key" size="md" color="primary" class="cursor-pointer"/>
                        </template>
                    </q-input>
                    <q-btn v-if="!loading"  @click="login()"
                     type="submit" :label="!usuario.isHost ? 'Escanear Ingressos' : 'Entrar'" color="primary"
                        :icon-right="!usuario.isHost ? 'document_scanner' : 'login'" class="w100 q-mt-md q-py-md" />
                        <div v-if="loading" class="row w100 q-pt-md justify-center">
                            <q-spinner-ball color="secondary" size="lg"/>
                            <q-spinner-ball color="secondary" size="lg"/>
                            <q-spinner-ball color="secondary" size="lg"/>
                        </div>
                </div>
            </q-card-section>
        </div>
    </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { api } from "src/boot/axios";
import { onMounted, ref } from "vue";

const loading = ref(false);
const $q = useQuasar();
const showPassword = ref(false);
const usuario = ref({
    login: '',
    senha: '',
    isHost: true,
    evento_id: '',
    access_code: ''
})

const login = async () => {
    if (usuario.value.isHost) {
        loading.value = true;
        usuario.value.login = usuario.value.login.toLowerCase();
        await api.post('/login_host', usuario.value).then(res => {
            sessionStorage.clear();
            sessionStorage.setItem('userLogado', JSON.stringify(res.data.host));
            sessionStorage.setItem('role', JSON.stringify(res.data.role));
            $q.notify({
                color: 'dark',
                message: 'Login efetuado com sucesso',
                icon: 'local_activity',
                position: 'top',
            });
            setTimeout(() => {
                window.location.href = '/app'
            }, 1000);
        }).catch(err => {
            $q.notify({
                color: 'negative',
                message: err.response.data.error,
                icon: 'report_problem',
                position: 'top',
            });
            loading.value = false;
            usuario.value.senha = '';
            console.log(err)
        })
    }
}

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
#hostlogin-wrapper{
    border-radius: 20px;
    padding-bottom: 24px;
}
@media (max-width: 600px) {
    #card-login {
        width: 90vw;
    }
}

</style>