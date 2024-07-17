<template>
    <q-page class="animate__animated animate__fadeIn relative">
        <div class="steps w100 row justify-center bg-grad-2 q-pt-sm">
            <div id="step-1" :class="'bg-grey-4'"></div>
            <div id="step-2" :class="'bg-primary'"></div>
            <div id="step-3" :class="'bg-primary'"></div>
        </div>
        <div class="step-wrapper">
            <EventoStep1Component/>
        </div>
    </q-page>
</template>
<script setup>
import EventoStep1Component from 'src/components/EventoStep1Component.vue'
</script>
<style scoped>
.steps{
    position: sticky;
    top: 98px;

    z-index: 1;
}

#step-1, #step-2, #step-3 {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin: 10px;
}
</style>
