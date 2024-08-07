<template>
  <q-page class="animate__animated animate__fadeIn flex column relative bg-grad-1">
    <div class="home-wrapper">

      <div class="w100 row justify-center q-mt-md items-center text-white text-bold" style="border-radius: 20px; ">
        <q-avatar>
          <q-icon size="md" color="white" name="local_activity"/>
        </q-avatar>
        <div class="text-h5 text-bold q-pa-md text-center">
          PAGINA PARA GERENCIAR O PERFIL DO HOST
        </div>
      </div>
      </div>
    
    <!-- <div class="w100 q-mt-xl bg-white">
      <FooterComponent />
    </div> -->
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import FooterComponent from 'src/components/FooterComponent.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const avatar = ref({
  url1: 'https://55knots.com.au/wp-content/uploads/2021/01/Zanj-Avatar-scaled.jpg',
  url2: 'https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png',
  url3: 'https://st3.depositphotos.com/1007566/13175/v/450/depositphotos_131750410-stock-illustration-woman-female-avatar-character.jpg',
  url4: 'https://static.vecteezy.com/system/resources/previews/012/941/847/original/illustration-of-avatar-girl-nice-smiling-woman-with-black-hair-flat-icon-on-purple-background-vector.jpg',
  url5: 'https://55knots.com.au/wp-content/uploads/2020/07/John-Avatar-Color-1-01-scaled.jpg',
  url6: 'https://static.vecteezy.com/system/resources/previews/000/242/730/original/vector-police-officer-avatar-illustration.jpg'
})

const navigateTo = (path) => {
  router.push(path);
}
</script>

<style scoped >
.home-wrapper {
  margin-left: 120px;
  margin-right: 120px;
}
#home-card {
  padding-top: 5px;
  cursor: pointer!important;
  position: sticky;
  top: 98px;
  z-index: 1;
  background: #ffffffc7;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.435);
  transition: all 0.2s linear;
  height: 50px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

#home-card:hover {
  background: #ffffff;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.435);
  height: 8vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-avatar{
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.border-top{
  border-top: 4px solid #7734c4;
  margin-top: 8px;
}

@media (max-width: 600px) {
  .home-wrapper {
    margin-left: 0px;
    margin-right: 0px;
  }
  #home-card {
    padding-top:5px;
    border-radius: 0px;
  }
  #home-card:hover {
    height: 13vh;
  }
}
#search-btn{
  transition: all 0.2s linear;
}
#search-btn:hover{
  opacity: 0.8;
}
</style>
