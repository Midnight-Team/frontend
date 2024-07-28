<template>
    <q-layout class="relative animate__animated animate__fadeIn">
        <q-header class="bg-grad-3 text-white animate__animated animate__backInDown animate__slow" height-hint="98">
            <div style="font-size: 1rem;" class=" q-py-md w100 row no-wrap items-center  justify-evenly">
                <a @click="scrollTop()">
                    Quem Somos
                </a>
                <a href="#beneficios">
                    Vantagens
                </a>
                <a href="#contato">
                    Contato
                </a>
            </div>

        </q-header>
        <q-page-container>
            <q-page class="">
                <div id="home" class="q-mb-xl animate__animated animate__zoomIn animate__slower">
                    <q-toolbar class="bg-grad-4">
                        <q-toolbar-title
                            class="row justify-center q-py-sm text-bold text-white rounded-borders items-center q-gutter-x-sm">
                            <q-icon size="xl" color="white" name="local_activity" />
                            <div>
                                MIDNIGHT TICKETS
                            </div>
                        </q-toolbar-title>
                    </q-toolbar>
                    <div class="space bg-grad-2 w100 text-center text-white q-py-md text-bold q-px-sm high-opacity">
                        PARE DE PAGAR TAXAS EXCESSIVAS NA VENDA DE SEUS INGRESSOS E ESCALE AINDA MAIS O SEU NEGÓCIO
                    </div>
                    <q-card class="text-white bg-grad-1 text-bold rounded-borders">
                        <p class="text-center q-pt-md">Receba Notificações do Lançamento do Nosso Serviço e Receba Bônus!!</p>
                        <q-input v-model="contato.email" class="bg-white" filled label="Seu melhor email">
                            <template v-slot:prepend>
                                <q-icon name="email" color="primary"/>
                            </template>
                            <template v-slot:append>
                                <q-btn @click="getEmail()" color="primary" icon="send" label="Enviar" />
                            </template>
                        </q-input>
                    </q-card>
                    <div class="w100 img-wrapper">
                        <img class="img"
                            src="https://images.blush.design/UKjlMI8EIiiOMVntZau4?w=920&auto=compress&cs=srgb" alt="">
                    </div>
                    <div style="font-size:1.3rem" class=" bg-grad-4 text-white text-bold q-px-sm q-py-md text-left">Quem
                        Somos ?</div>
                    <div style="font-size:1.1rem"
                        class=" bg-grad-2 text-white high-opacity text-bold q-px-sm q-py-md text-right">Somos um
                        Serviço de Bilheteria Online e Gerenciador de Eventos Personalizados focados na Escalabilidade
                        dos Lucros na vendo de Ingressos</div>
                    <div class="w100 img-wrapper">
                        <img class="img"
                            src="https://images.blush.design/PJcHFUF4pMy6BXPLEFnD?w=500&auto=compress&cs=srgb" alt="">
                    </div>
                    <div style="font-size:1.3rem" class=" bg-grad-4 text-white text-bold q-px-sm q-py-md text-left">O
                        que Fazemos ?</div>
                    <div style="font-size:1.1rem"
                        class="q-mb-md bg-grad-2 text-white high-opacity text-bold q-px-sm q-py-md text-right">
                        Otimizamos o Lucro Líquido na venda de seus ingressos com o melhor preço do mercado e focando
                        <br> Escolha a Melhor Modalidade para Seus Eventos
                    </div>
                    <div class="w100 img-wrapper column">
                        <img class="img" src="~/assets/landing-images/drawn1.png" alt="">
                    </div>
                    <div style="font-size:1.3rem" class="bg-grad-4 text-white text-bold q-px-sm q-py-md text-left">Como
                        fazemos isso ?
                    </div>
                    <div style="font-size:1.1rem;border-bottom-left-radius: 40px;"
                        class="bg-grad-2 text-white high-opacity text-bold q-px-sm  q-py-md text-right">Desde
                        pequenos encontros a grandes festivais, nossa plataforma se adapta às suas necessidades e
                        maximiza seus ganhos.
                        Na Midnight Tickets, entendemos que cada evento é único. Oferecemos opções flexíveis que se
                        ajustam ao porte do seu evento, permitindo que você escale seu negócio e maximize seus lucros
                    </div>
                    <div class="w100 img-wrapper column">
                        <img class="img q-mb-md" src="~/assets/landing-images/login.png" alt="">
                        <img class="img" src="~/assets/landing-images/evento.png" alt="">
                    </div>
                </div>
                <div id="beneficios" class="">
                    <div class="space rounded-borders q-mb-lg q-mt-xl" style="border-bottom: 25px double #3C0783;z-index: -10">
                    </div>

                    <div class="text-h5 text-center w100 text-white text-bold q-mt-md q-mb-md"> 🚀 Vantagens</div>
                    <div class="w100 text-h6 text-bold bg-white text-primary text-center q-px-lg q-py-sm border-bottom">
                        Veja
                        como
                        nossa Plataforma pode aumentar o Lucro do seu Evento!!</div>
                    <div style="font-size:1rem" class="q-px-sm bg-white text-left q-py-md rounded-borders">
                        🟢 <strong class="text-green">Modalidade Grátis:</strong> Crie Eventos <strong>sem
                            custo</strong> e pague apenas <strong>6% de taxa</strong>
                        por
                        ingresso vendido. Ingressos ilimitados e uma solução simples para qualquer porte de evento.
                        <br>🟣 <strong class="text-primary">Modalidade Purplecoins:</strong> Utilize nossa moeda virtual
                        para realizar
                        eventos com com <strong>0% de taxa</strong> por ingresso vendido.Obtenha <strong>100% do
                            LUCRO</strong> de seus Eventos e ainda <strong>GANHE CASHBACK</strong> com cada ingresso
                        não vendido
                    </div>
                    <div class="w100 img-wrapper column">
                        <img class="img" src="~/assets/landing-images/evento2.png" alt="">
                        <img class="img" src="~/assets/landing-images/recarga.png" alt="">
                    </div>
                    <div
                        class="w100 text-h5 text-bold bg-white text-primary text-center q-px-md rounded-borders q-py-sm border-bottom q-mt-md">
                        💰 Benefícios</div>
                    <div style="font-size:1rem" class="q-px-xs bg-white q-py-md rounded-borders border-bottom">
                        💸 <strong style="font-size:1.2rem" class="text-primary text-bold">Pagamentos e Menores
                            Taxa:</strong> Estamos integrados ao <strong>Mercado Pago Api</strong> com <strong>segurança
                            e confidencialidade</strong> além de possuir <strong>as menores taxas de
                            transações</strong>, facilitando pagamentos tanto pros usuários cliente quanto pros
                        produtores de eventos
                        <br>
                        🤳🏼 <strong style="font-size:1.2rem" class="text-primary text-bold">Sem Necessidade De
                            Instalação:</strong> Gerencie seu aplicativo na palma da sua mão sem necessidade de
                        instalação de aplicativos pra todos os tipos de usuário
                        <br>
                        🧑🏼‍💻 <strong style="font-size:1.2rem" class="text-primary text-bold">Suporte Humanizado e
                            Eficaz:</strong> Nosso serviço é monitorado constantemente, focado em otimizar os custos
                        para todos e gratificar os usuários com nossas moedas virtuais gamificadas
                        <br>
                        🖥️ <strong style="font-size:1.2rem" class="text-primary text-bold">Consultoria
                            Especializada:</strong> Nossos desenvolvedores possuem experiências em diversos projetos
                        nacionais e internacionais além de uma gama diversificada em segmentos de softwares, e estarão a disposição para suporte, melhorias contínuas e correções
                        de bugs
                        <br>
                        📲 <strong style="font-size:1.2rem" class="text-primary text-bold">Tecnologia de Ponta:</strong>
                        Nosso WebApp é desenvolvido com as melhores tecnologias do mercado e hospedada na nuvem com
                        serviços da AWS, garantindo segurança e escalabilidade para todos os tipos de eventos e usuários
                    </div>
                </div>
                <div id="contato" class="q-mt-lg relative">
                    <div class="w100 q-mt-xl border-bottom"></div>
                    <div id="instagram"
                        class="w100 row no-wrap items-center justify-center q-mt-xl text-primary bg-grey-2 q-py-sm">
                        <img src="https://static.cdninstagram.com/rsrc.php/v3/yI/r/VsNE-OHk_8a.png" alt="">
                        <a class="text-center text-primary q-pl-sm" href="https://www.instagram.com/midnightickets/" target="_blank"
                            style="font-size: 1.1rem;text-decoration: none;">
                            Midnight Tickets<br>no Instagram
                        </a>
                        <q-icon name="local_activity" size="xl" class="q-pl-sm text-primary" />
                    </div>
                    <div class="space rounded-borders q-my-md " style="border-bottom: 8px solid #3C0783;z-index: -10">
                        <q-btn @click="wppConsultor()" class="q-pa-md w100" color="primary" icon-right="description"
                            label="Preencha Esse Formulário de Pesquisa para otimização do App" />
                    </div>
                    <div class="space rounded-borders q-my-md " style="border-top: 8px solid #3C0783;z-index: -10">
                        <q-btn @click="wppConsultor()" class="q-pa-md w100" color="green" icon-right="sms"
                            label="Fale Agora Com um de nossos Consultores" />
                    </div>
                </div>
            </q-page>
        </q-page-container>
        <FooterComponent class=" q-mt-md" />
    </q-layout>
</template>
<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";
import FooterComponent from "../components/FooterComponent.vue";

const $q = useQuasar()

const contato = ref({
    email: '',
})

function wppConsultor() {
    window.open('https://wa.me/5561981748795?text=Ola,%20Gostaria%20de%20realizar%20uma%20consultoria%20para%20Otimizar%20a%20Venda%20dos%20meus%20Ingressos%20e%20Escalar%20o%20Lucro%20dos%20Meus%20Eventos%20com%20a%20Midnight%20Tickets!', '_blank');
}

function getEmail(){
    if(contato.value.email === '' || !contato.value.email.includes('@')){
        $q.notify({
        message: 'Por favor, insira um email válido!',
        color: 'red',
        position: 'top',
        icon: 'email',
    });
        return
    }
    window.open(`https://api.whatsapp.com/send?phone=5561981748795&text=Olá,%20gostaria%20de%20receber%20notificações%20sobre%20o%20lançamento%20do%20seu%20serviço%20e%20receber%20bônus%20na%20Midnight%20Tickets!%20Meu%20email%20é:%20${contato.value.email}`, '_blank');
}

function scrollTop() {
    window.scrollTo(0, 0);
}
</script>

<style scoped>
* {
    overflow-x: hidden;
}

.q-header {
    position: fixed;
}

.q-page-container {
    z-index: 1;
    padding: 0 6px;
}

.border-bottom {
    border-bottom: 4px solid #6d16e0be;
}

.img-wrapper {
    z-index: 99 !important;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.img {
    width: 100%;
    max-width: 800px;
    height: auto;
    border-radius: 10px;
}

a {
    color: white;
    text-decoration: none;
    border-radius: 2px;
    transition: all 0.3s linear;
    font-weight: bold;
    cursor: pointer;
}

a:hover {
    color: #3C0783;
    background: #ebd3ff;
    padding: 8px;
    border-radius: 12px;
}

@media(min-width: 1090px) {
    .q-page-container {
        padding: 0 400px;
    }

    .img {
        max-width: 620px;
    }
}

div {
    border-radius: 10px;
}

#contato {
}
</style>