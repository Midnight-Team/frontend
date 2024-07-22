 <template>
    <div class="es1 bg-white q-mx-sm  rounded-borders shadow-4 relative">
        <div class="title-1 w100 text-h6 row items-center text-primary shadow-1 q-py-xs justify-center text-bold">
            <q-icon size="md" color="primary" name="confirmation_number" class="q-pr-sm" />
            Configuração de Ingressos
        </div>
        <div class="column q-gutter-y-md q-pa-md q-mb-xl">
            <q-input outlined class="q-mt-lg" v-model="ingressoHandler.titulo" label="Título Tipo do Ingresso*" />
            <q-input outlined maxlength="7" prefix="R$" v-model="ingressoHandler.valor" label="Valor do Ingresso*" reverse-fill-mask mask="####,##">
                <template v-slot:append>
                    <q-icon name="payments" color="primary" />
                </template>
            </q-input>
            <q-btn label="Adicionar Tipo Ingresso" color="blue" :disable="validaIngresso()" @click="addIngresso()" icon-right="add_circle"/>
            <div class="w100 hline bg-primary"></div>
            <div class="text-bold mid-opacity text-primary text-center">Tipos Ingressos - Total: {{ ingressos.length }}</div>
            <div id="list-ingressos" class="column q-gutter-y-md">
                <div v-for="(ingresso, index) in ingressos" :key="index" class="row no-wrap items-center q-mt-md justify-between">
                    <q-btn icon="local_activity" flat color="primary" @click="removeIngresso(index)"/>
                    <div class="text-bold text-primary">{{ format(ingresso.titulo) }}</div>
                    <div class="text-bold text-primary">R$ {{ ingresso.valor }}</div>
                    <q-btn icon="delete" flat color="red" @click="removeIngresso(index)"/>
                </div>
            </div>
            <div class="w100 hline bg-primary"></div>
            <q-btn label="próximo" color="primary" @click="goNext()" icon-right="skip_next"/>
            <q-btn label="voltar" flat color="primary" @click="goPrev()"/>
        </div>
    
      </div>
</template>

<script setup >
import { ref, defineEmits, onMounted } from "vue";

const emit = defineEmits(['next', 'prev'])

const ingressoHandler = ref({
    titulo: '',
    valor: '',
})

const ingressos = ref([])

const addIngresso = () => {
    ingressos.value.push(ingressoHandler.value)
    ingressoHandler.value = {
        titulo: '',
        valor: '',
    }
}

function validaIngresso(){
    return ingressoHandler.value.titulo == '' || ingressoHandler.value.valor == ''

}

function format(text){
    if(text.length > 10){
        return text.substring(0, 10) + '...'
    }
    return text
}

function removeIngresso(index){
    ingressos.value.splice(index, 1)
}   

const goNext = () => {
    emit('next')
}

const goPrev = () => {
    emit('prev')
}

const evento = ref({
    titulo: '',
    descricao: '',

})


onMounted(() => {
    window.scrollTo(0, 0);
})

</script>

<style scoped>
.title-1{
    position: sticky;
    top: 138px;
    background: #efefef4d;
    backdrop-filter: blur(4px);
    z-index: 1;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}

</style>