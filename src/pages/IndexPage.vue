<template>
  <q-page class="animate__animated animate__fadeIn flex column relative bg-grad-1">
    <div class="home-wrapper">
      <div id="home-card" class="w100 row justify-center" style="" >
        <q-input color="primary" outlined dense class="text-primary text-bold" style="width:90%"  label="Buscar evento" >
          <template v-slot:append>
            <q-icon name="search" color="primary"/>
          </template>
        </q-input>
      </div>
      <div class="w100 row justify-center q-mt-md items-center text-white text-bold" style="border-radius: 20px; ">
        <q-avatar>
          <q-icon size="md" color="white" name="local_activity"/>
        </q-avatar>
        <div class="text-h5 text-bold">
          Midnight Tickets
        </div>
      </div>
      <div id="home-card-2">
        <div class="q-mt-md row justify-center">
          <q-card-section class="q-mb-md text-primary bg-white q-pa-md" style="border-top-right-radius: 40px;border-bottom-left-radius: 40px;width:80%">
            <div class="text-h5 text-bold text-center">Quem Somos??🫰🏽💰💵</div>
            <div class="text-body1 text-center text-bold opacity-8">Serviço de bilheteria com os melhores preços e gerenciamento de vendas de ingressos!!</div>
          </q-card-section>
          <div class="w100 row justify-center q-my-md">
            <q-btn class="q-mb-md w100 q-py-lg" @click="navigateTo('/evento/steps')" label="Crie seu Evento Totalmente Grátis Em Poucos Minutos" color="primary"  icon-right="event_available" />
          </div>
          <!-- Primeiro card existente -->
          <q-card class="q-mb-md q-ml-md" style="width: 70%;">
            <q-card-section>
              <div class="text-h6 text-bold row items-center no-wrap text-primary"><img class="q-mr-md img-avatar" :src="avatar.url2" alt="">Taxas ??💰💵</div>
              <div class="text-body2 border-top q-pt-sm text-bold opacity-8">As mais baixas do mercado, temos opções de pacotes que possibilitam desde 0% (isentos de taxa) até no máximo 5% em cada ingresso vendido!!</div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn class="text-bold" flat label="Achar Meu Pacote Ideal" icon-right="request_quote" color="primary" />
            </q-card-actions>
          </q-card>
  
          <!-- Segundo card existente -->
          <q-card class="q-mt-md q-ml-xl" style="width: 70%;">
            <q-card-section>
              <div class="text-h6 text-bold row items-center no-wrap text-primary"><img class="q-mr-md img-avatar" :src="avatar.url4" alt="">O que consigo fazer no App ??⚙️📲📱</div>
              <div class="text-body2 q-pt-sm border-top opacity-8 text-bold">Comprar Ingressos, Criar Eventos e Vender Ingressos com as melhores taxas do mercado, Gerenciar e Monitorar seus eventos e vendas na palma da sua mão!!</div>
            </q-card-section>
          </q-card>
          <!-- Terceiro card existente -->
          <q-card class="q-mt-md q-mb-lg" style="margin-left: 25%;width: 70%;">
            <q-card-section>
              <div class="text-h6 text-bold row items-center no-wrap text-primary"><img class="q-mr-md img-avatar" :src="avatar.url1" alt="">Preciso Baixar Aplicativo??⚙️📲📱</div>
              <div class="text-body2 opacity-8 text-bold q-pt-sm border-top">Não! Nosso serviço é um WebApp e pode ser totalmento utilizado por qualquer navegador, inclusive diretamente do Instagram📸!!</div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn class="text-bold" flat label="Criar Minha Conta Agora" icon-right="person_add" color="primary" />
            </q-card-actions>
          </q-card>
            <div class="w100 flex flex-center q-py-md border-bt">
              <q-btn label="Criar Conta" class="w80 q-mb-md q-py-md" color="green" icon="person_add"/>
              <q-btn label="Fazer Login" color="blue" class="w80 q-py-md" icon="login"/>
            </div>
  
          <q-card class="q-mt-md" style="margin-left: 9%;width: 65%;">
            <q-card-section>
              <div class="text-h6 text-bold row items-center no-wrap text-primary"><img class="q-mr-md img-avatar" :src="avatar.url3" alt="">Suporte 24/7 ??📞📧</div>
              <div class="text-body2 q-pt-sm border-top opacity-8 text-bold">Oferecemos suporte ao cliente 24 horas por dia, 7 dias por semana, para garantir que todos os seus problemas e dúvidas sejam resolvidos rapidamente!</div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn class="text-bold" flat label="Entrar em Contato" icon-right="contact_support" color="primary" />
            </q-card-actions>
          </q-card>
  
          <q-card class="q-mt-md" style="margin-left: 5%;width: 75%;">
            <q-card-section>
              <div class="text-h6 text-bold row items-center no-wrap text-primary"><img class="q-mr-md img-avatar" :src="avatar.url5" alt="">Feedback dos Usuários ??📝💬</div>
              <div class="text-body2 q-pt-md border-top opacity-8 text-bold">Receba feedback instantâneo dos seus clientes para melhorar continuamente seus eventos e serviços. Sua satisfação é nossa prioridade!</div>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn class="text-bold" flat label="Ler Feedbacks" icon-right="feedback" color="primary" />
            </q-card-actions>
          </q-card>
  
          <q-card class="q-mt-md q-mb-sm" style="margin-left: -20%;width: 65%;">
            <q-card-section>
              <div class="text-h6 text-bold row items-center no-wrap text-primary"><img class="q-mr-md img-avatar" :src="avatar.url6" alt="">Segurança Garantida ??🔒🔐</div>
              <div class="text-body2 q-pt-md border-top opacity-8 text-bold">Todos os pagamentos e dados pessoais são protegidos com os mais altos padrões de segurança, garantindo uma experiência segura e confiável para todos os usuários.</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div class="w100 q-mt-xl bg-white">
      <FooterComponent />
      <!-- <FormCheckoutComponent/> -->
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import FooterComponent from 'src/components/FooterComponent.vue';
import FormCheckoutComponent from 'src/components/FormCheckoutComponent.vue';
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
  cursor: pointer!important;
  padding: 12px;
  position: sticky;
  top: 98px;
  z-index: 1;
  background: #ffffffc7;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 14px rgba(0, 0, 0, 0.435);
  transition: all 0.2s linear;
  height: 6.5vh;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
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
    height: 10vh;
    border-radius: 0px;
  }
  #home-card:hover {
    height: 13vh;
  }
}
</style>
