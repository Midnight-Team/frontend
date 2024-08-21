<template>
    <div class="es1 bg-white q-mx-sm  rounded-borders shadow-4 relative">
        <div class="title-1 w100 text-h6 row items-center text-primary shadow-1 q-py-xs justify-center text-bold">
            <q-icon size="md" color="primary" name="confirmation_number" class="q-pr-sm" />
            Configuração de Ingressos
        </div>
        <div class="column q-gutter-y-md q-pa-md q-mb-xl">
            <q-input :inputStyle="{ fontWeight: 'bold', color:'#6310E1' }" outlined class="q-mt-lg" v-model="ingressoHandler.titulo"
                placeholder="Entrada Masculina, Camarote, Pista Inteira" label="Título Tipo do Ingresso*" />
            <q-input :inputStyle="{ fontWeight: 'bold', color:'#6310E1' }" outlined maxlength="7" prefix="R$" v-model="ingressoHandler.valor" label="Valor do Ingresso*"
                reverse-fill-mask mask="####,##">
                <template v-slot:append>
                    <q-icon name="payments" color="primary" />
                </template>
            </q-input>
            <q-input :inputStyle="{ fontWeight: 'bold', color:'#6310E1' }" outlined mask="#####" maxlength="4" v-model="ingressoHandler.quantidade" label="Quantidade de Ingressos*"
                reverse-fill-mask >
                <template v-slot:append>
                    <div class="q-pr-sm">{{ ingressosDisponiveis }}</div>
                    <q-icon name="confirmation_number" color="primary" />
                </template>
            </q-input>
            <q-btn label="Adicionar Ingresso" color="blue" :disable="validaIngresso()" @click="addIngresso()"
                icon-right="add_circle" />
            <div v-if="ingressos.length > 0" class="w100 hline bg-primary"></div>
            <div v-if="ingressos.length > 0" class="text-bold mid-opacity text-primary text-center">Ingressos
            </div>
            <div id="list-ingressos" class="column">
                <div v-for="(ingresso, index) in ingressos" :key="index"
                    class="column no-wrap items-center rounded-borders shadow-4 bg-grad-6 q-mb-md  justify-between">
                    <div class="row q-py-xs items-center">
                        <div class="text-bold text-white q-py-sm text-center">🎫 {{ format(ingresso.titulo) }}</div>
                    </div>
                    <div class="w100 bg-secondary mid-opacity q-mx-md" style="height: 2px"></div>
                    <div class="row w100 items-center justify-center">
                        <q-btn color="red-4" flat icon="delete" @click="removeIngresso(index)" />
                        <q-btn :label="ingresso.quantidade" icon="local_activity" flat color="blue-3" />
                        <div class="text-bold text-green-4">R$ {{ ingresso.valor }}</div>
                    </div>
                </div>
            </div>
            <div class="w100 hline bg-primary"></div>
            <q-btn :disabled="checkNext()" label="próximo" color="primary"  @click="goNext()" icon-right="skip_next" />
            <q-btn label="voltar" flat color="primary" @click="goPrev()" />
        </div>

    </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, defineEmits, onMounted } from "vue";

const emit = defineEmits(['next', 'prev'])

const ingressoHandler = ref({
    titulo: '',
    valor: '',
    quantidade: '',
    vendidos: 0
})

const $q = useQuasar()

const ingressosDisponiveis = ref(0)

const ingressos = ref([])
function formatToNumber(inputString) {
    // Remove todos os caracteres que não sejam dígitos ou vírgula
    let cleanString = inputString.replace(/[^\d,]/g, '');

    // Substitui vírgula por ponto para lidar com números decimais
    let numericString = cleanString.replace(',', '.');

    // Converte para número e força duas casas decimais
    let number = parseFloat(numericString).toFixed(2);

    // Se a conversão não resultar em um número válido, retorna 0.00
    if (isNaN(number)) {
        number = '0.00';
    }

    // Converte de volta para string e substitui ponto por vírgula
    let formattedString = number.toString().replace('.', ',');

    return formattedString;
}
const addIngresso = () => {
    if (ingressoHandler.value.quantidade > ingressosDisponiveis.value) {
        $q.notify({
            color: 'red',
            position: 'top',
            message: 'Quantidade de ingressos maior do que o disponível',
            icon: 'report_problem'
        })
        ingressoHandler.value.quantidade = 0
        return
    } else {
        ingressoHandler.value.quantidade = Number(ingressoHandler.value.quantidade)
        ingressosDisponiveis.value -= ingressoHandler.value.quantidade
        ingressoHandler.value.valor = formatToNumber(ingressoHandler.value.valor)
        ingressos.value.push(ingressoHandler.value)
        ingressoHandler.value = {
            titulo: '',
            valor: '',
            quantidade: '',
            vendidos: 0
        }
    }
}

function validaIngresso() {
    return ingressoHandler.value.titulo == '' || ingressoHandler.value.valor == '' || ingressoHandler.value.quantidade == 0 || ingressoHandler.value.quantidade == null

}

function format(text) {
    if (text.length > 20) {
        return (text.substring(0, 13) + '...').toUpperCase()
    }
    return text.toUpperCase()
}

function removeIngresso(index) {
    const confirm = window.confirm('Deseja realmente remover este tipo de ingresso?')
    if (confirm) {
        ingressosDisponiveis.value += Number(ingressos.value[index].quantidade)
        ingressos.value.splice(index, 1)
    }
}

const goNext = () => {
    if(ingressosDisponiveis.value > 0){
        const confirm = window.confirm('Você ainda possui Ingressos Disponíveis para uso.\nCaso não os utilize eles irão se transformar em SubCoins automaticamente.\nDeseja Continuar?')
        if(confirm){
            sessionStorage.setItem('eventoStep2', JSON.stringify(ingressos.value))
            emit('next')
        }
        else {
            return
        }
    } else {
        sessionStorage.setItem('eventoStep2', JSON.stringify(ingressos.value))
        emit('next')
    }
}

const goPrev = () => {
    emit('prev')
}

onMounted(() => {
    window.scrollTo(0, 0);
    const es2Storage = sessionStorage.getItem('eventoStep2')
    const es2 = JSON.parse(es2Storage)
    if(es2){
        ingressos.value = es2
    } else {
        const es1Storage = sessionStorage.getItem('eventoStep1')
        const es1 = JSON.parse(es1Storage)
        ingressosDisponiveis.value = es1.pacote.max_ingressos
    }
})

const checkNext = () => {
    if(ingressos.value.length == 0){
        return true
    } 
    else {
        return false
    }
}

</script>

<style scoped>
.title-1 {
    position: sticky;
    top: 90px;
    background: #efefef4d;
    backdrop-filter: blur(4px);
    z-index: 1;
}
</style>