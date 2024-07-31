<template>
  <div id="footer" class="bg-grad-1 w100 text-primary text-bold">
    <div id="instagram"
    class="w100 row no-wrap items-center justify-center text-white bg-grad-4 q-py-md">
    <img src="https://static.cdninstagram.com/rsrc.php/v3/yI/r/VsNE-OHk_8a.png" alt="">
    <a class="text-center text-white q-pl-sm" href="https://www.instagram.com/midnightickets/"
        target="_blank" style="font-size: 1rem;text-decoration: none;">
        Midnight Tickets<br>no Instagram
    </a>
    <q-icon name="local_activity" size="xl" class="q-pl-sm text-white" />
  </div>

    <div style="border-bottom: 2px solid #7734c4;" class="row bg-white justify-center items-center q-py-lg">
      <q-icon size="md" name="local_activity" class="q-pr-md"/>
      <a class="text-primary text-center cursor-pointer" @click="modal=!modal">Midnight Tickets<br>Development Team</a>
      <q-icon size="md" name="groups" class="q-pl-md"/>
    </div>
    <div class="row bg-white justify-center items-center q-py-lg">
            <img class="q-pl-sm" src="https://http2.mlstatic.com/frontend-assets/mp-web-navigation/ui-navigation/6.7.19/mercadopago/logo__large.png" alt="">
    </div>
      <div class="row bg-white justify-center items-center q-py-lg">
        <a target="_blank" class="text-primary text-center" href="https://samuelvictorol.github.io/portfolio/contato">Suporte</a>
        <q-icon size="md" name="help" class="q-pl-md"/>
    </div>
    <q-dialog v-model="modal">
      <q-card class="bg-grey-2 animate__animated animate__zoomIn animate__delay-1s">
        
        <q-card-section>
          <div class="text-h6 text-primary text-bold text-center">MEMBROS FUNDADORES</div>
        </q-card-section>
    
        <div class="w100 bg-primary mid-opacity" style="height: 4px;"></div>

        <q-card-section class="q-pt-none row items-center q-gutter-x-md q-gutter-y-sm q-pa-md row">
          <q-avatar size="130px">
            <img src="https://avatars.githubusercontent.com/u/95868897?v=4">
          </q-avatar>
          <div>
            <p class="text-primary text-bold">Samuel Victor</p>
            <p><strong>Telefone:</strong> (61) 98174-8795</p>
            <p><strong>Email:</strong> samuel.softdev@outlook.com</p>
          </div>
        </q-card-section>

        <div class="w100 bg-primary mid-opacity" style="height: 4px;"></div>

        <q-card-section class="q-pt-none row items-center q-gutter-x-md q-pa-md">
          <div>
            <p class="text-primary text-bold">Pedro Rodrigues</p>
            <p><strong>Telefone:</strong> (61) 99645-9013</p>
            <p><strong>Email:</strong> peddroprp@gmail.com</p>
          </div>
          <q-avatar size="130px">
            <img src="https://avatars.githubusercontent.com/u/32720946?v=4">
          </q-avatar>
        </q-card-section>

        <q-card-actions align="center" >
          <q-btn class="w100 bg-primary" flat label="OK" color="white" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const modal = ref(false)

</script>

<style scoped>

.q-card {
  border-radius: 10px;
  border: 6px solid #7734c4;
}


a {
  text-decoration: none!important;

}

</style>