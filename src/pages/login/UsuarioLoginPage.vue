<template>
    <div id="usuariologin-wrapper" class="animate__animated  animate__zoomInRight animate__slower flex flex-center">
        <q-card class="shadow-9 bg-puple-light q-mt-md " id="card-login">
            <div class="text-h5 q-pl-md q-pt-md text-primary row items-center">
                <q-icon  :name="registrando ? 'person_add' : 'person'" size="lg" class="q-mr-sm"/>
                {{ !registrando ? 'Login': 'Registrar'}} Login
            </div>
            <q-card-section>
                <q-form @submit="submitForm()">
                    <q-input :inputStyle="{ fontWeight: 'bold'}" v-if="registrando" filled class="q-my-md" v-model="usuario.nome" label="Nome*">
                        <template v-slot:prepend>
                            <q-icon name="person" color="primary" class="cursor-pointer" />
                        </template>
                    </q-input>
                    <q-input :inputStyle="{ fontWeight: 'bold'}" filled class="q-mb-md" v-model="usuario.cpf" label="CPF*" mask="###.###.###-##" >
                        <template v-slot:prepend>
                            <q-icon name="badge" color="primary" class="cursor-pointer" />
                        </template>
                    </q-input>
                    <q-input type="email" :inputStyle="{ fontWeight: 'bold'}" v-if="registrando" filled class="q-mb-md" v-model="usuario.email" label="Email*">
                        <template v-slot:prepend>
                            <q-icon name="email" color="primary" class="cursor-pointer" />
                        </template>
                    </q-input>
                    <q-input type="phone" :inputStyle="{ fontWeight: 'bold'}" v-if="registrando" filled class="q-mb-md" v-model="usuario.telefone" label="Telefone*"  mask="(##) #####-####">
                        <template v-slot:prepend>
                            <q-icon name="phone" color="primary" class="cursor-pointer" />
                        </template>
                    </q-input>
                    <q-input maxlength="20" :inputStyle="{ fontWeight: 'bold'}" filled v-model="usuario.senha" label="Senha*" :type="showPassword ? 'text' : 'password'">
                        <template v-slot:prepend>
                            <q-icon name="lock" color="primary" class="cursor-pointer"/>
                        </template>
                        <template v-slot:append>
                            <q-icon :name="showPassword ? 'visibility' : 'visibility_off'" color="primary" class="cursor-pointer" @click="showPassword = !showPassword" />
                        </template>
                    </q-input>
                    <div v-if="registrando" class="q-my-sm text-h6 text-primary">Data de Nascimento:*</div>
                    <q-date class="w100 row justify-center q-mb-md" v-if="registrando" v-model="usuario.dataNascimento" mask="DD-MM-YYYY HH:mm" color="primary" />
                    <q-btn glossy v-if="registrando" type="submit" label="Registrar" color="blue" icon-right="person_add" class="w100 q-mt-md q-pa-md"/>
                    <q-btn glossy v-if="!registrando" type="submit" label="Entrar" color="primary" icon-right="login" class="w100 q-mt-md"/>
                </q-form>
            </q-card-section>
            <div class="column q-mb-md q-mx-md">
                <q-btn flat :label="registrando ? 'já possuo uma conta' : 'criar conta'" @click="toggleRegistrando()" :icon-right="registrando ? 'keyboard_return' : 'person_add'" color="primary" />
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

const toggleRegistrando = () => {
    registrando.value = !registrando.value;
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
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