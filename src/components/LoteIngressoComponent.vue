<template>
    <div class="w100 bg-grad-1 relative">
        <div id="title-menu" class="bg-grad-1 text-white w100 q-pa-md text-center title-lote">
            <q-btn style="z-index:9999!important" label="voltar" @click="$emit('dialogBack')" flat color="secondary" dense ></q-btn>
            <br>Lote de Ingressos
        </div>
        <div class="w100"></div>
        <div id="list" v-for="(eventoTipoIngresso, index) in eventoTiposIngressos" :key="index">
                <div class="q-pa-md" style="border:4px solid #5203D5">
                    <div class="row no-wrap w100">
                        <div class="text-h6 row items-center text-primary text-bold">
                            <q-input  v-model="eventoTipoIngresso.titulo" @update:model-value="edited = true" :inputStyle="{ fontWeight:'bold', color:'#6310E1' }" class="q-mb-md" maxlength="30" filled color="primary" :label="'Ingresso ' +(index + 1)" >
                                <template v-slot:append>
                                    <q-icon name="confirmation_number" color="primary" size="md"></q-icon>
                                </template>
                            </q-input>
                        </div>
                        </div>
                        <div>
                            <q-input style="width:60%" v-model="eventoTipoIngresso.valor" @update:model-value="edited = true" class="q-mb-sm" :inputStyle="{ fontWeight:'bold', color:'green' }" maxlength="7" filled color="green-8" mask="##,##" reverse-fill-mask prefix="R$" label="Preço" >
                                <template v-slot:append>
                                    <q-icon name="attach_money" color="green-8" size="md"></q-icon>
                                </template>
                            </q-input>
                            <strong class="text-blue mid-opacity">Ingressos Vendidos: {{ (eventoTipoIngresso.vendidos ? eventoTipoIngresso.vendidos : 0)}}/{{ eventoTipoIngresso.quantidade }}</strong>
                        </div>
                    </div>
                </div>
        <q-btn :disable="!edited" color="green" label="Salvar Ingressos" @click="salvar()" class="w100 save-lote q-py-md" icon-right="sell"></q-btn>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { api } from 'src/boot/axios';
import { useQuasar } from "quasar";

const edited = ref(false)
const eventoTiposIngressos = ref([]);
const $q = useQuasar()


async function salvar() {
    const evento = {
        _id: sessionStorage.getItem("eventoHandlerId"),
        tipos_ingressos: eventoTiposIngressos.value
    }
    await api.put('/lote_ingresso', {evento: evento, host: JSON.parse(sessionStorage.getItem("userLogado"))}).then(res => {
        $q.notify({
            color: 'green-8',
            textColor: 'white',
            icon: 'confirmation_number',
            message: res.data.response.message,
            position: 'top'
        });
        eventoTiposIngressos.value = res.data.response.tipos_ingressos;
        sessionStorage.setItem("eventoTiposIngressos", JSON.stringify(eventoTiposIngressos.value));
    }).catch(err => {
        $q.notify({
            color: 'red-8',
            textColor: 'white',
            icon: 'error',
            message: err.response.data.error,
            position: 'top'
        });
    });
    edited.value = false;
}

onBeforeMount(async () => {
    eventoTiposIngressos.value = JSON.parse(sessionStorage.getItem("eventoTiposIngressos"));
});



</script>

<style scoped>
.title-lote{
    position: sticky;
    top: 0px;
    z-index: 1
}
.save-lote{
    position: sticky;
    bottom: 0px;
}
#list:nth-child(n){
    background-color: #fafafa;
}

</style>