<template>
    <div id="usuariologin-wrapper" class="flex flex-center">
        <q-card class="shadow-9  q-mt-md" id="card-login">
            <div class="text-h5 q-pl-md q-pt-md text-primary row items-center">
                <q-icon :name="registrando ? 'person_add' : 'login'" size="lg" class="q-mr-sm"/>
                {{ !registrando ? 'Login': 'Registrar'}} Usuário
            </div>
            <q-card-section>
                <q-form @submit="submitForm()">
                    <q-input outlined class="q-mb-md" v-model="usuario.cpf" label="CPF*" />
                    <q-input outlined v-model="usuario.senha" label="Senha*" :type="showPassword ? 'text' : 'password'">
                        <template v-slot:append>
                            <q-icon :name="showPassword ? 'visibility' : 'visibility_off'" color="primary" class="cursor-pointer" @click="showPassword = !showPassword" />
                        </template>
                    </q-input>
                    <q-input v-if="registrando" outlined class="q-my-md" v-model="usuario.nome" label="Nome*" />
                    <q-input v-if="registrando" outlined class="q-mb-md" v-model="usuario.telefone" label="Telefone*"  mask="(##) #####-####" />
                    <q-input v-if="registrando" outlined class="q-mb-md" v-model="usuario.email" label="Email*" />
                    <div v-if="registrando" class="text-h6 text-primary">Data de Nascimento*</div>
                    <q-date class="w100 row justify-center q-mb-md" v-if="registrando" v-model="usuario.dataNascimento" mask="DD-MM-YYYY HH:mm" color="primary" />
                    <q-btn v-if="registrando" type="submit" label="Registrar" color="green" icon-right="person_add" class="w100 q-mt-md"/>
                    <q-btn v-if="!registrando" type="submit" label="Entrar" color="primary" icon-right="login" class="w100 q-mt-md"/>
                </q-form>
            </q-card-section>
            <div class="column q-mb-md q-mx-md">
                <q-btn flat :label="registrando ? 'já possuo uma conta' : 'criar conta'" @click="registrando = !registrando" :icon-right="registrando ? 'keyboard_return' : 'person_add'" color="primary" />
            </div>
        </q-card>
    </div>
</template>

<script setup>
import { ref } from "vue";

const showPassword = ref(false);
const registrando = ref(false);

const usuario = ref({
    cpf: '',
    senha: '',
    nome: '',
    dataNascimento: '',
    telefone: '',
    email: ''
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