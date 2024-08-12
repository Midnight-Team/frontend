<template>
    <q-layout class="relative animate__animated animate__fadeIn bg-grad-4">
        <q-header class="fixed bg-grad-2 text-white animate__animated animate__backInDown animate__slow shadow-1"
            height-hint="98">
            <div style="font-size: 1rem;" class=" q-py-md w100 row no-wrap items-center  justify-evenly">
                <a v-if="!isMobile" @click="scrollBot()" class="menu-item row items-center" id="title-menu">
                    <q-icon class="q-pr-xs" name="local_activity" size="xl" /> Midnight Tickets
                </a>
                <a v-else @click="scrollBot()" class="menu-item row items-center">
                    <q-icon name="local_activity" size="xl" />
                </a>
                <a class="menu-item" @click="scrollToBottom()">
                    Contato
                </a>
                <a class="menu-item bg-primary q-pa-md text-purple-1 row items-center q-gutter-x-sm"
                    style="border-radius:8px" @click="navigateTo('/login')">
                    Entrar
                    <q-icon name="login" size="sm" />
                </a>
            </div>

        </q-header>
        <q-page-container>
            <q-page class="">
                <div id="home" style="border: 4px solid #984BE7;border-radius: 8px;"
                    class="q-mt-md q-mb-xl q-px-xs q-pb-xl animate__animated animate__zoomIn animate__slower">
                    <q-toolbar class="bg-grad-4">
                        <q-toolbar-title
                            class="row justify-center q-py-sm text-bold text-white rounded-borders items-center q-gutter-x-sm">
                            <div id="title-menu">
                                MIDNIGHT TICKETS
                            </div>
                            <q-icon v-if="!isMobile" size="xl" color="white" name="local_activity" />
                        </q-toolbar-title>
                    </q-toolbar>
                    <div class="space bg-grad-2 w100 text-center text-purple-1 q-py-md text-bold q-px-md high-opacity"
                        style="font-size:1rem">
                        PARE de PAGAR TAXAS excessivas na VENDA de SEUS INGRESSOS e REALIZE seus EVENTOS com 0% de
                        TAXA!!
                    </div>
                    <q-card
                        class="text-white bg-grad-1 q-mt-md text-bold rounded-borders animate__animated animate__zoomIn animate__slower animate__delay-3s">
                        <p class="text-center q-pt-md q-px-md" style="font-size: .8rem;">Digite seu EMAIL para SOLICITAR
                            a ABERTURA da sua CONTA</p>
                        <q-input v-model="contato.email" type="email" class="bg-white" filled label="Seu melhor email">
                            <template v-slot:prepend>
                                <q-icon name="email" color="primary" />
                            </template>
                            <template v-slot:append>
                                <q-btn @click="fastEmailGetter()" color="primary" icon="send" label="Enviar" />
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
                        class=" bg-grad-2 text-purple-1 high-opacity text-bold q-px-sm q-py-md text-right">Somos
                        um
                        Serviço de Bilheteria Online e Gerenciador de Eventos Personalizados focados na Escalabilidade
                        de seus Lucros em Venda de Ingressos Digitais</div>
                    <div class="w100 img-wrapper">
                        <img class="img"
                            src="https://images.blush.design/PJcHFUF4pMy6BXPLEFnD?w=500&auto=compress&cs=srgb" alt="">
                    </div>
                    <div style="font-size:1.3rem" class=" bg-grad-4 text-white text-bold q-px-sm q-py-md text-left">O
                        que Fazemos ?</div>
                    <div style="font-size:1.1rem"
                        class="q-mb-md bg-grad-2 text-purple-1 high-opacity text-bold q-px-sm q-py-md text-right">
                        Maximizamos seus lucros na venda de ingressos de forma escalável com serviços personalizados,
                        transparência, suporte e uma
                        interface amigável. Seus ingressos mais caros são os que mais pagam taxas abusivas, mas pra nós
                        o ingresso é apenas
                        um dado e por isso não devem ser taxados mais do que outros.
                        <br>
                    </div>
                    <div class="w100 img-wrapper column">
                        <img class="img" src="~/assets/landing-images/drawn1.png" alt="">
                    </div>
                    <div style="font-size:1.3rem" class="bg-grad-4 text-white text-bold q-px-sm q-py-md text-left">Como
                        fazemos isso ?
                    </div>
                    <div style="font-size:1.1rem;border-bottom-left-radius: 40px;"
                        class="bg-grad-2 text-purple-1 high-opacity text-bold q-px-sm  q-py-md text-right">Desde
                        pequenos encontros a grandes festivais, nossa plataforma se adapta às suas necessidades e
                        POTENCIALIZA seus ganhos.
                        Na Midnight Tickets, entendemos que cada evento é único. Oferecemos opções flexíveis que se
                        ajustam ao porte do seu evento, permitindo que você personalize sua experiência de acordo com
                        sua demanda
                    </div>
                </div>
                <div id="beneficios" style="border: 4px solid #984BE7;">

                    <div
                        class="w100 text-h6 text-bold bg-grey-3 text-primary text-center q-px-md q-py-sm border-bottom">
                        Veja
                        como
                        nossa Plataforma pode aumentar o Faturamento do seu Evento!!</div>
                    <div class="text-h4 text-center w100 text-white text-bold q-pt-md q-pb-md bg-grad-">
                        Vantagens</div>
                    <div style="font-size:1rem" class="q-px-md   bg-white text-left q-py-md rounded-borders">
                        🟣 <strong class="text-primary">SEM TAXA POR VENDA<br></strong> Nossa <strong>moeda
                            virtual</strong>
                        permite realizar <strong>Eventos</strong> com <strong>0% de taxa</strong> em ingressos
                        vendidos. Obtenha
                        <strong>o máximo do seu 
                            lucro</strong> e ainda <strong>GANHE CASHBACK</strong> com cada ingresso
                        não vendido
                        <br>🔵 <strong class="text-blue">LUCRO EM TEMPO REAL<br></strong> Disponibilizamos a
                        possibilidade de receber o
                        <strong>lucro de suas vendas automaticamente em tempo real na sua conta</strong> enquanto
                        acontece o seu evento
                    </div>
                    <div
                        class="w100 text-h4 text-bold bg-white text-primary text-center q-px-md rounded-borders q-py-sm border-bottom q-mt-md">
                        Benefícios</div>
                    <div style="font-size:1rem" class="q-px-md bg-grey-3 q-py-md rounded-borders border-bottom">
                        💸 <strong style="font-size:1.2rem" class="text-primary text-bold">AS MENORES TAXAS<br></strong>
                        Estamos
                        integrados ao <strong>Mercado Pago</strong> com segurança
                        e confidencialidade. Além de possuir <strong>as menores taxas de
                            transações</strong>
                        <br>
                        <br>
                        🤳🏼 <strong style="font-size:1.2rem" class="text-primary text-bold">SEM INSTALAÇÃO
                            <br></strong> Gerencie seus
                        eventos, vendas e ingressos na palma da sua mão <strong>sem
                            necessidade de
                            instalação</strong> de aplicativos. Nosso webapp é adaptativo para todos os dispositivos
                        <br>
                        <br>
                        🧑🏼‍💻 <strong style="font-size:1.2rem" class="text-primary text-bold">SUPORTE HUMANIZADO<br>
                        </strong> Nosso
                        serviço é monitorado constantemente, focado em <strong>otimizar os
                            custos</strong>
                        para todos e <strong>gratificar os usuários</strong> com nossas <strong>moedas
                            virtuais</strong>.
                        Nosso serviço de suporte é <strong>humanizado e rápido</strong> para atender o quanto antes suas
                        dúvidas
                        <br>
                        <br>
                        🖥️ <strong style="font-size:1.2rem" class="text-primary text-bold">CONSULTORIA
                            INDIVIDUAL<br></strong> Nossos
                        <strong>desenvolvedores</strong> possuem experiências
                        profisionais em
                        diversos <strong>projetos
                            nacionais e internacionais</strong> em Bancos e Software Houses, e estarão a
                        disposição para
                        suporte, <strong>sugestões de melhorias e correções
                            de bugs</strong>
                        <br>
                        <br>
                        📲 <strong style="font-size:1.2rem" class="text-primary text-bold">TECNOLOGIA DE
                            PONTA<br></strong>
                        Nosso WebApp é desenvolvido com as <strong>melhores tecnologias</strong> do mercado e hospedada
                        na nuvem com
                        serviços da AWS, <strong>garantindo segurança e escalabilidade</strong> para <strong>todos os
                            tipos de eventos e
                            usuários</strong>
                    </div>
                </div>
                <!-- <q-carousel v-model="slide" transition-prev="scale" transition-next="scale" swipeable animated
                    control-color="white" navigation autoplay="true" infinite padding arrows
                    class="bg-primary text-white shadow-1 q-mt-md">
                    <q-carousel-slide :name="1" img-src="~/assets/landing-images/login.png"
                        class="column no-wrap flex-center">
                    </q-carousel-slide>
                    <q-carousel-slide :name="2" img-src="~/assets/landing-images/evento.png"
                        class="column no-wrap flex-center">
                    </q-carousel-slide>
                    <q-carousel-slide :name="3" img-src="~/assets/landing-images/evento2.png"
                        class="column no-wrap flex-center">
                    </q-carousel-slide>
                    <q-carousel-slide v-if="isMobile" :name="4" img-src="~/assets/landing-images/evento3.png"
                        class="column no-wrap flex-center">
                    </q-carousel-slide>
                    <q-carousel-slide :name="5" img-src="~/assets/landing-images/evento4.png"
                        class="column no-wrap flex-center">
                    </q-carousel-slide>
                    <q-carousel-slide :name="6" img-src="~/assets/landing-images/evento5.png"
                        class="column no-wrap flex-center">
                    </q-carousel-slide>
                </q-carousel> -->
                <div id="form" class=" relative">
                    <div class="text-h4 text-bold q-py-md text-white text-center bg-grad-1 border-bottom q-mt-md">🚀
                        Fale
                        Conosco</div>

                    <div class="space rounded-borders q-my-md  "
                        style="border-radius: 20px;border-bottom: 8px solid #3C0783;z-index: -10">
                        <q-card class="q-pa-md collumn q-gutter-y-md rounded-borders "
                            style="border: 15px solid #6310E1; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;">
                            <div class="w100 text-center text-primary text-bold mid-opacity ">
                                ALAVANQUE seus FATURAMENTO otimizando o LUCRO de suas VENDAS com uma CONSULTORIA
                                PERSONALIZADA para a
                                SUA DEMANDA</div>
                            <div class="mid-opacity text-blue-6 text-center w100 text-bold">
                                Todos campos abaixos são opcionais
                            </div>
                            <q-input maxlength="200" filled v-model="contato.form.name" label="1.Qual é o seu nome?">
                                <template v-slot:append>
                                    <q-icon name="person" color="primary" />
                                </template>
                            </q-input>
                            <q-input maxlength="200" filled v-model="contato.form.companyName"
                                label="2.Nome Empresa/Razão Social">
                                <template v-slot:append>
                                    <q-icon name="business" color="primary" />
                                </template>
                            </q-input>
                            <q-input mask="(##) #####-####" placeholder="ex: (12) 34567-8910" type="tel" maxlength="200"
                                filled v-model="contato.form.phone" label="3.Telefone/WhatsApp">
                                <template v-slot:append>
                                    <q-icon name="phone" color="primary" />
                                </template>
                            </q-input>
                            <q-input placeholder="ex: Shows, baile funk, festival de eletrônica..." maxlength="200"
                                filled v-model="contato.form.eventType" label="4.Tipos de Eventos">
                                <template v-slot:append>
                                    <q-icon name="nightlife" color="primary" />
                                </template>
                            </q-input>
                            <q-input suffix="pessoas" mask="#####" filled v-model="contato.form.maxCapacity"
                                label="5.Capacidade máxima de público">
                                <template v-slot:append>
                                    <q-icon name="groups" color="primary" />
                                </template>
                            </q-input>
                            <q-input suffix="pessoas" mask="#####" filled v-model="contato.form.mediumEventCapacity"
                                label="6.Média de público por evento">
                                <template v-slot:append>
                                    <q-icon name="people" color="primary" />
                                </template>
                            </q-input>
                            <q-input maxlength="5" mask="#####" filled v-model="contato.form.mediumVendaIngressos"
                                placeholder="Média qtd. de Ingressos vendidos"
                                label="7.Quantidade de Ingressos Digitais ">
                                <template v-slot:append>
                                    <q-icon name="123" color="primary" />
                                </template>
                            </q-input>
                            <q-input maxlength="3" suffix="%" reverse-fill-mask mask="###" filled
                                v-model="contato.form.percentAvista" label="8.Percentual de Vendas à Vista"
                                placeholder="ex: 60%">
                                <template v-slot:append>
                                    <q-icon name="payments" color="primary" />
                                </template>
                            </q-input>
                            <q-input maxlength="9" prefix="R$" reverse-fill-mask mask="##.###,##" filled
                                v-model="contato.form.mediumProfits" placeholder="Média de faturamento por evento"
                                label="9.Lucro por evento em Ingressos Digitais">
                                <template v-slot:append>
                                    <q-icon name="paid" color="primary" />
                                </template>
                            </q-input>
                            <q-input maxlength="200" filled v-model="contato.form.localizacao" label="10.Localização"
                                placeholder="Ex: Asa Sul - Brasília, Goiânia - GO...">
                                <template v-slot:append>
                                    <q-icon name="location_on" color="primary" />
                                </template>
                            </q-input>
                            <q-btn v-if="!sendLoading" @click="sendForm()" class="q-pa-md w100" color="primary"
                                icon-right="description" label="Enviar formulário" />
                            <div class="w100 row justify-center">
                                <q-spinner-bars v-if="sendLoading" class="q-mt-md" color="primary" size="2em" />
                            </div>
                        </q-card>
                    </div>
                    <div class="space rounded-borders q-my-md ">
                        <q-btn @click="wppConsultor()" class="q-pa-md w100" color="green" icon-right="sms"
                            label="Fale Agora Com um de nossos Consultores" />
                    </div>
                    <div
                        class="w100 text-bold rounded-borders column bg-grad-2 items-center justify-center text-white q-pa-md text-center q-mt-md ">
                        <div class="column text-h5 text-white text-bold">LOGIN HOST</div>
                        <div class="text-purple-2">É Produtor de Eventos ou Subhost??</div>
                        <q-btn icon-right="admin_panel_settings" label="Faça login Aqui" dense class="q-mt-sm q-pa-md"
                            color="primary" to="/login/host" />
                    </div>
                </div>
                <div class="w100 text-white text-bold text-center q-mt-md">
                    Siga-nos no <a href="https://www.instagram.com/midnightickets" class="text-blue"
                        target="_blank">Instagram</a> e
                    acompanhe o nosso desenvolvimento!
                </div>
            </q-page>
        </q-page-container>
        <FooterComponent class=" q-mt-md" />
    </q-layout>
</template>
<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { api } from 'src/boot/axios';
import FooterComponent from "../components/FooterComponent.vue";
import { useRouter } from "vue-router";

const router = useRouter()
const $q = useQuasar()
const slide = ref(1)
const isMobile = window.innerWidth < 500
const sendLoading = ref(false)
const contato = ref({
    email: '',
    form: {
        name: '',
        phone: '',
        companyName: '',
        maxCapacity: '',
        eventType: '',
        mediumEventCapacity: '',
        mediumProfits: '',
        mediumVendaIngressos: '',
        mercadopago: false,
        percentAvista: '',
        localizacao: '',
    },
    dispositivo: window.innerWidth < 900 ? 'Mobile' : 'Desktop'
})

function wppConsultor() {
    window.open('https://wa.me/5561981748795?text=Ola,%20Gostaria%20de%20realizar%20uma%20consultoria%20para%20Potencializar%20a%20Venda%20dos%20meus%20Ingressos%20e%20Escalar%20o%20Lucro%20dos%20Meus%20Eventos%20com%20a%20Midnight%20Tickets!', '_blank');
}

const lowDownScrolling = () => {
    window.scrollTo(0, 500);
}

function navigateTo(to) {
    router.push(to)
}

async function fastEmailGetter() {
    if (!checkEmail()) {
        return false
    } else {
        lowDownScrolling()
        await sendForm('Entraremos em Contato em Breve! Continue navegando pelo site para mais informações')
    }
}

const checkEmail = () => {
    if (!contato.value.email || contato.value.email === '' || !contato.value.email.includes('@')) {
        $q.notify({
            message: 'Campo de Email inválido',
            color: 'red',
            position: 'top',
            icon: 'email',
        });
        return false
    }
    return true
}

async function sendForm(msg) {
    if (!checkEmail()) {
        return
    }
    sendLoading.value = true
    await api.post('/landing/email', contato.value).then(() => {
        $q.notify({
            message: msg || 'Formulário enviado com sucesso, em breve entraremos em contato',
            color: 'green',
            position: 'top',
            icon: 'email',
            timeout: 6000
        });
    }).catch(() => {
        $q.notify({
            message: 'Erro ao enviar formulário',
            color: 'red',
            position: 'top',
            icon: 'email',
        });
    })
        .finally(() => {
            setTimeout(() => {
                sendLoading.value = false
            }, 1000)
        })
}


function scrollBot() {
    window.scrollTo(0, document.body.scrollHeight);
}

function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight - 1890);
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
    overflow: hidden
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

.q-btn {
    transition: all 0.2s linear;
}

a {
    color: white;
    text-decoration: none;
    border-radius: 2px;
    transition: all 0.2s linear;
    font-weight: bold;
    cursor: pointer;
}

.menu-item {
    font-size: 1.2rem;
}

.q-btn:hover {
    opacity: 0.6;
}

.menu-item:hover {
    color: #6310E1;
    background: #ebd3ffde;
    filter: brightness(1.2);
    border-top-left-radius: 12px;
    border-bottom-right-radius: 12px;
}

.q-carousel {
    height: 400px;
}

@media(min-width: 1090px) {
    .q-page-container {
        padding: 0 300px;
        margin: 0 30px;
    }

    .q-carousel {
        height: 90vh;
    }

    .img {
        max-width: 620px;
    }
}

div {}
</style>