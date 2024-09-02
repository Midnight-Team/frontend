<template>
    <q-page class="bg-grad-7">
        <div class="bg-white">
            <q-input v-model="text" label="Digite algo para gerar o QR Code" />
            <q-btn label="Gerar QR Code" @click="generateQRCode" />
            <canvas ref="qrcodeCanvas"></canvas>
          </div>
    </q-page>
</template>

<script setup>
import { ref } from 'vue';
import QRCode from 'qrcode';

const text = ref('');
const qrcodeCanvas = ref(null);

const generateQRCode = () => {
  QRCode.toCanvas(qrcodeCanvas.value, text.value, (error) => {
    if (error) console.error(error);
  });
};

</script>

<style scoped>

</style>