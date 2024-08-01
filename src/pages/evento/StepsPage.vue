<template>
    <q-page class="bg-primary animate__animated animate__fadeIn relative">
        <div class="steps w100 row justify-center bg-grad-2 q-py-xs">
            <div  id="step-1" :class=" step == 1 ?  'bg-grey-4' : 'bg-primary'"></div>
            <div  id="step-2" :class=" step == 2 ? 'bg-grey-4' : 'bg-primary'"></div>
            <div  id="step-3" :class=" step == 3 ? 'bg-grey-4' : 'bg-primary'"></div>
        </div>
        <div class="step-wrapper">
            <EventoStep1Component v-if="step == 1" @next="next"/>
            <EventoStep2Component v-if="step == 2" @next="next" @prev="prev"/>
            <HostStepComponent v-if="step == 3" @next="next" @prev="prev"/>
        </div>
        <FooterComponent/>
    </q-page>
</template>
<script setup>
import EventoStep1Component from 'src/components/EventoStep1Component.vue'
import EventoStep2Component from 'src/components/EventoStep2Component.vue'
import HostStepComponent from 'src/components/HostStepComponent.vue'
import FooterComponent from 'src/components/FooterComponent.vue'
import { onBeforeMount, ref } from 'vue'

const step = ref(1)

function next(){
    step.value = step.value + 1
}

function prev(){
    step.value = step.value - 1
}

onBeforeMount(() => {
    sessionStorage.removeItem('eventoStep1')
    sessionStorage.removeItem('eventoStep2')
    sessionStorage.removeItem('eventoStep3')
})

</script>
<style scoped>
.q-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

}
.steps{
    position: sticky;
    top: 98px;
    z-index: 2;
}

#step-1, #step-2, #step-3 {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin: 10px;
}
.step-wrapper {
    margin-left: 260px;
    margin-right: 260px;
}

@media (max-width: 1100px) {
    .step-wrapper {
        margin-left: 0px;
        margin-right: 0px;
    }
}

</style>
