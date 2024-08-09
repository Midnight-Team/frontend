<template>
  <q-page class="animate__animated animate__fadeIn flex column relative bg-grad-1">
    <div class="home-wrapper q-px-md q-pb-xl">
      <div class="w100  column justify-center q-mt-xs q-gutter-y-md items-center text-white text-bold"
        style="border-radius: 20px; ">
        <div id="title"
          class="w100 text-h5 text-bold text-center bg-grad-1 q-pa-md rounded-borders shadow-1 text-purple-1">
          {{ host.nome_razao }}<br>
          <div class="mid-opacity" style="font-size: 1rem">host</div>
        </div>
        <q-card>
          <div class="row no-wrap items-center justify-center">
            <q-btn label="Editar Perfil" color="green" icon-right="edit" />
          </div>
        </q-card>
        <q-card class="w100 column text-primary q-pa-md bg-grey-3">
          <div class="row q-pb-xs rounded-borders q-mb-md" style="border-bottom:4px solid #8527e26c">
            <q-icon size="xl" color="primary" name="payments" />
          </div>
          <p class="row no-wrap items-center justify-between">
            Saldo: R$ {{ formatToNumber(host.saldo) }}
            <q-btn label="Sacar" class="q-ml-md" icon-right="attach_money" color="blue" />
          </p>
          <p class="row no-wrap items-center justify-between">
            PurpleCoins: {{ host.purpleCoins }}🟣
            <q-btn to="/app/recarregar" label="" class="q-ml-md" icon-right="currency_exchange" color="primary" />
          </p>
          <strong class="text-blue">SubCoins: {{ host.subCoins }}🔵</strong>
        </q-card>
        <q-card class="w100 text-primary column q-gutter-y-md items-center q-pb-md q-px-md bg-grey-3">
          <div class="w100 row q-pb-xs rounded-borders" style="border-bottom:4px solid #8527e26c">
            <q-icon size="xl" color="primary" name="celebration" />
          </div>
          <div class="row no-wrap w100 items-center justify-between">
            Eventos em andamento: 4
            <q-btn to="/evento" icon-right="event" color="primary" />
          </div>
          <div class="row no-wrap w100">
            Total Eventos: 12
          </div>
          <div class="row no-wrap w100">
            Eventos Cancelados: 1
          </div>
          <div class="row no-wrap w100 justify-between items-center">
            Subhosts Cadastrado: 4
            <q-btn icon-right="sensor_occupied" color="blue" />
          </div>
        </q-card>
        <!-- <q-card class="w100 text-primary column q-gutter-y-md items-center q-pb-md q-px-md bg-grey-3">
          <div class="w100 row q-pb-xs rounded-borders" style="border-bottom:4px solid #8527e26c">
            <q-icon size="xl" color="primary" name="local_activity" />
          </div>
          <div class="row no-wrap w100 items-center justify-between">
            Ingressos Vendidos: 334
            <q-btn label="" icon-right="confirmation_number" color="primary" />
          </div>
          <div class="row no-wrap w100">
            Faturamento: R$ 14945,00
          </div>
          <div class="row no-wrap w100">
            Média Lucro por Evento: R$ 1745,00
          </div>
          <div class="row no-wrap w100">
            Percentual Vendas à Vista: 89%
          </div>
          <div class="row no-wrap w100 items-center justify-between">
            Ingressos Não Vendidos: 43
          </div>
        </q-card>
        <q-card class="w100 text-primary column q-gutter-y-md items-center q-pb-md q-px-md bg-grey-3">
          <div class="w100 row q-pb-xs rounded-borders" style="border-bottom:4px solid #8527e26c">
            <q-icon size="xl" color="primary" name="analytics" />
          </div>
          <div class="row no-wrap w100 items-center justify-between">
            Lucro Líquido: R$ 13223,00
            <q-btn label="" icon-right="savings" color="primary" />
          </div>
          <div class="row no-wrap w100">
            Gasto em PurpleCoins: R$ 845,00
          </div>
          <div class="row no-wrap w100">
            Cotação PurpleCoin: R$ 55,00
          </div>
          <div class="row no-wrap w100">
            Variação de Lucro: +80%
          </div>
          <div class="row no-wrap w100">
            Cashback: 1860🔵
          </div>
        </q-card>
        <q-btn label="Entender Análises de Dados" icon="equalizer" class="w100" color="blue" /> -->
        <q-btn label="Solicitar Suporte" @click="wppConsultor()" icon-right="contact_support" class="w100"
          color="primary" />
      </div>
    </div>
    <div class="w100 q-mt-xl bg-white">
      <FooterComponent />
    </div>
  </q-page>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import FooterComponent from 'src/components/FooterComponent.vue';
import { useRouter } from 'vue-router';
import { api } from "src/boot/axios";

const router = useRouter();
const host = ref({
  nome_razao: '',
  saldo: 0,
  purpleCoins: 0,
  subCoins: 0
})

async function updateMoneys(isFromBtn) {
  const host = JSON.parse(sessionStorage.getItem('userLogado'));
  await api.post('/update_moneys', { id: host.id })
    .then((res) => {
      sessionStorage.removeItem('userLogado');
      const updateUser = res.data
      updateUser.updatedSessionAt = new Date()
      sessionStorage.setItem('userLogado', JSON.stringify(updateUser));
      host.value = res.data
    })
    .catch((err) => {
      console.log(err)
    })
  if (isFromBtn) {
    router.push('/evento')
  }
}

function wppConsultor() {
  window.open('https://wa.me/5561996459013?text=Ola,%20Gostaria%20de%20solicitar%20um%20suporte%20como%20Host.', '_blank');
}

function formatToNumber(inputString) {
  // verifica se é string, caso nao seja transforma
  if (typeof inputString !== 'string') {
    inputString = inputString.toString();
  }
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
onBeforeMount(async () => {
  await updateMoneys(false)
})
</script>

<style scoped>
.home-wrapper {
  margin-left: 14vw;
  margin-right: 14vw;
}

#home-card {
  padding-top: 5px;
  cursor: pointer !important;
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

.img-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.border-top {
  border-top: 4px solid #7734c4;
  margin-top: 8px;
}

@media (max-width: 600px) {
  .home-wrapper {
    margin-left: 0px;
    margin-right: 0px;
  }

  #home-card {
    padding-top: 5px;
    border-radius: 0px;
  }

  #home-card:hover {
    height: 13vh;
  }
}

#search-btn {
  transition: all 0.2s linear;
}

#search-btn:hover {
  opacity: 0.8;
}

#title {
  font-family: "Rowdies", sans-serif;
  letter-spacing: 1px;
  font-size: 40px;
}
</style>
