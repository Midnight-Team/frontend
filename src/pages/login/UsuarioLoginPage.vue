<template>
    <div id="usuariologin-wrapper" class="animate__animated   animate__zoomInRight animate__slower flex flex-center">
        <q-card class=" bg-purple-light q-mt-md " id="card-login">
            <div class="text-h5 q-pl-md q-pt-md text-primary row items-center">
                <q-icon  :name="registrando ? 'person_add' : 'person'" size="lg" class="q-mr-sm"/>
                {{ !registrando ? 'Login': 'Registrar'}} Usuário
            </div>
            <q-card-section>
                <q-form @submit="submitForm()">
                    <q-input maxlength="70"  :inputStyle="{ fontWeight: 'bold', color:'#6310E1'}" v-if="registrando" outlined class="q-my-md" v-model="usuario.nome" label="Nome*">
                        <template v-slot:prepend>
                            <q-icon name="person" color="primary" class="cursor-pointer" />
                        </template>
                    </q-input>
                    <q-input :inputStyle="{ fontWeight: 'bold', color:'#6310E1'}" outlined class="q-mb-md" v-model="usuario.cpf" label="CPF*" mask="###.###.###-##" >
                        <template v-slot:prepend>
                            <q-icon name="badge" color="primary" class="cursor-pointer" />
                        </template>
                    </q-input>
                    <q-input maxlength="100" type="email" :inputStyle="{ fontWeight: 'bold', color:'#6310E1'}" v-if="registrando" outlined class="q-mb-md" v-model="usuario.email" label="Email*">
                        <template v-slot:prepend>
                            <q-icon name="email" color="primary" class="cursor-pointer" />
                        </template>
                    </q-input>
                    <q-input mask="(##) #####-####" :inputStyle="{ fontWeight: 'bold', color:'#6310E1'}" v-if="registrando" outlined class="q-mb-md" v-model="usuario.telefone" label="Telefone*"  >
                        <template v-slot:prepend>
                            <q-icon name="phone" color="primary" class="cursor-pointer" />
                        </template>
                    </q-input>
                    <q-input maxlength="25" :inputStyle="{ fontWeight: 'bold', color:'#6310E1'}" outlined v-model="usuario.senha" :label="registrando ? 'Crie uma Senha*' : 'Senha*'" :type="showPassword ? 'text' : 'password'">
                        <template v-slot:prepend>
                            <q-icon name="lock" color="primary" class="cursor-pointer"/>
                        </template>
                        <template v-slot:append>
                            <q-icon :name="showPassword ? 'visibility' : 'visibility_off'" color="primary" class="cursor-pointer" @click="showPassword = !showPassword" />
                        </template>
                    </q-input>
                    <!-- <div v-if="registrando" class="q-my-sm text-h6 text-primary">Data de Nascimento:*</div> -->
                    <!-- <q-date class="w100 row justify-center q-mb-md" v-if="registrando" v-model="usuario.dataNascimento" mask="DD-MM-YYYY HH:mm" color="primary" /> -->
                    <q-btn glossy v-if="!registrando" @click="login()" :disabled="!usuario.cpf || !usuario.senha || usuario.senha.length < 6 || usuario.cpf.length != 14" type="submit" label="Entrar" color="green" icon-right="login" class="w100 q-pa-lg q-mt-md"/>
                    <q-btn glossy v-if="registrando" @click="criarConta()" :disabled="checkCampos()"  type="submit" label="Criar Conta" color="green" icon-right="person_add" class="w100 q-mt-md q-pa-md"/>
                </q-form>
            </q-card-section>
            <div class="column q-mb-md q-mx-md">
                <q-btn glossy :label="registrando ? 'já possuo uma conta' : 'criar conta'" @click="toggleRegistrando()" :icon-right="registrando ? 'keyboard_return' : 'person_add'" color="primary" />
                <q-btn v-if="!registrando" type="submit" label="Esqueci minha senha" color="secondary" dense flat class="w100 q-mt-md text-bold"/>
            </div>
        </q-card>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { api } from 'src/boot/axios';
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const $q = useQuasar()
const showPassword = ref(false);
const registrando = ref(false);
const router = useRouter()
const usuario = ref({
    cpf: '',
    senha: '',
    nome: '',
    telefone: '',
    email: ''
})

const toggleRegistrando = () => {
    registrando.value = !registrando.value;
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
}

async function login() {
    await api.post('/login', { cpf:usuario.value.cpf, senha:usuario.value.senha }).then((response) => {
        $q.notify({
            color: 'local_activity',
            position: 'top',
            message: 'Bem Vindo(a), ' + response.data.nome.split(' ')[0].toLowerCase(),
            icon: 'login'
        })
        sessionStorage.setItem('user', JSON.stringify(response.data))
        router.push('/eu')
    }).catch((error) => {
        $q.notify({
            color: 'negative',
            position: 'top',
            message: error.response.data,
            icon: 'error'
        })
    })
}

function checkCampos() {
    if(!usuario.value.cpf || !usuario.value.senha || !usuario.value.nome || !usuario.value.telefone || !usuario.value.email){
        return true;
    }
    if(usuario.value.senha.length < 6){
        return true;
    }
    return false;
}

async function criarConta() {
    usuario.value.nome = usuario.value.nome.trim().toLowerCase()
    usuario.value.email = usuario.value.email.trim().toLowerCase()

    await api.post('/usuario', usuario.value).then((response) => {
        $q.notify({
            color: 'positive',
            position: 'top',
            message: 'Conta criada com sucesso',
            icon: 'person_add'
        })
        sessionStorage.setItem('user', JSON.stringify(response.data))
        router.push('/eu')          
    }).catch((error) => {
        $q.notify({
            color: 'negative',
            position: 'top',
            message: error.response.data.error,
            icon: 'error'
        })
    })
}

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