<template>
  <q-page class="animate__animated animate__fadeIn flex column relative " v-if="pageLoaded">
    <div class="home-wrapper q-px-md q-pb-xl">
      <div class="w100  column justify-center items-center text-white text-bold" style="border-radius: 20px; ">
        <div class="w100 flex q-mb-lg flex-center q-mt-lg">
          <q-avatar style="width:110px;height:110px;" class="shadow-2">
            <img :src="host.img" alt="">
          </q-avatar>
        </div>
        <div id="title"
          class="w100 text-h5 text-bold text-center q-pa-md q-pb-md rounded-borders  text-purple-1"
          style="border-top: 2px solid #9573f3;border-bottom: 2px solid #9573f3;">
          {{ host.nome_razao }}<br>
          <div class="high-opacity text-secondary q-mt-sm" style="font-size: 1rem">host</div>
        </div>
        <div class="rounded-borders w100 column text-secondary q-pa-md q-mt-md" style="border-bottom: 2px solid #9573f3;border-top: 2px solid #9573f3;">
          <div class="row q-pb-xs rounded-borders items-center no-wrap w100 q-mb-md justify-between">
            <div class="text-h6 row items-center text-green-2">
              <strong class="text-green q-pr-sm">R$ </strong> {{ formatToNumber(host.saldo) }}
            </div>
            <q-btn label="Sacar" class="q-px-md" icon-right="attach_money" color="green-8" />
          </div>
          <p class="row no-wrap items-center justify-between text-shadow">
            <div>            🟣 {{ host.purpleCoins }}
              <strong class="text-blue text-shadow">🔵 {{ host.subCoins }}</strong></div>
            <q-btn to="/app/recarregar" dense label="recarregar" class="q-px-md q-ml-md" icon-right="currency_exchange" color="primary" />
          </p>
        </div>
        <div class="w100 text-secondary column q-gutter-y-md q-mt-md items-center q-pb-md q-px-md rounded-borders"
          style="border-bottom: 2px solid #9573f3;border-top: 2px solid #9573f3;">
          <div class="row no-wrap w100 items-center ">
            <q-icon name="person" size="lg" color="secondary" class="q-mr-md" />
            {{ host.login }}
          </div>
          <div class="row no-wrap w100 items-center">
            <q-icon name="home_work" size="lg" color="secondary" class="q-mr-md" />
            {{ host.nome_razao }}
          </div>
          <div class="row no-wrap w100 items-center">
            <q-icon name="badge" size="lg" color="secondary" class="q-mr-md" />
            {{ host.cpf_cnpj }}
          </div>
          <div class="row no-wrap w100 items-center">
            <q-icon name="email" size="lg" color="secondary" class="q-mr-md" />
            {{ host.email }}
          </div>
          <div class="row no-wrap w100 items-center">
            <q-icon name="phone" size="lg" color="secondary" class="q-mr-md" />
            {{ host.telefone }}
          </div>
          <div class="row no-wrap w100 items-center">
            <q-icon name="shopping_cart" size="lg" color="secondary" class="q-mr-md" />
            <q-btn @click="dialog.historico = !dialog.historico" label="Histórico de Recargas" color="secondary" icon-right="history" class="q-px-md" dense />

          </div>
        </div>
        <q-btn label="Solicitar Alterações" color="primary" icon-right="edit" class="w100 q-mt-md" />
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
        <!-- <q-btn label="Solicitar Suporte" @click="wppConsultor()" icon-right="contact_support" class="q-mt-xl w100" color="primary" /> -->
      </div>
    </div>
    <q-dialog v-model="dialog.historico" style="backdrop-filter: blur(4px);">
      <HistoricoPagamentoComponent />
    </q-dialog>
    <div class="w100 bg-white q-mt-xl">
      <FooterComponent />
    </div>
  </q-page>
  <q-page v-else>
    <div class="row w100 q-pt-md justify-center">
      <q-spinner-ball color="secondary" size="lg" />
      <q-spinner-ball color="secondary" size="lg" />
      <q-spinner-ball color="secondary" size="lg" />
    </div>
  </q-page>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import FooterComponent from 'src/components/FooterComponent.vue';
import HistoricoPagamentoComponent from 'src/components/HistoricoPagamentoComponent.vue';
import { useRouter } from 'vue-router';
import { api } from "src/boot/axios";

const pageLoaded = ref(false);
const router = useRouter();
const host = ref({})
const dialog = ref({
  historico: false
})

async function updateMoneys(isFromBtn) {
  await api.post('/update_moneys', { id: host.value.id, senha: host.value.senha })
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
  host.value = JSON.parse(sessionStorage.getItem('userLogado'));
  await updateMoneys(false).then(() => {
    pageLoaded.value = true;
  })
})
</script>

<style scoped>
.home-wrapper {
  margin-left: 25vh;
  margin-right: 25vh;
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

.q-field__label {
  color: #7734c4 !important;
}

.q-input {
  font-weight: bold !important;
}
</style>
