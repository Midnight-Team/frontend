<template>
    <q-layout class="relative animate__animated animate__fadeIn bg-grad-7">
        <q-header class="fixed bg-glass-2 text-white animate__animated animate__backInDown animate__slow shadow-1"
            height-hint="98">
            <div style="font-size: 1rem;" class=" q-py-md w100 row no-wrap items-center  justify-evenly">
                <a v-if="!isMobile" @click="scrollBot()" class="menu-item row items-center" id="title-menu">
                    <q-icon class="q-pr-xs" name="local_activity" size="xl" /> Midnight Tickets
                </a>
                <a v-else @click="scrollBot()" class="menu-item row items-center">
                    <q-icon name="local_activity" size="65px" />
                </a>
                <div class="row items-center no-wrap q-gutter-x-sm">
                    <a v-if="!isMobile" class="menu-item q-mr-md q-px-md" href="#vantagens">
                        Vantagens
                    </a>
                    <a v-if="isMobile" class="menu-item" @click="scrollToVantagem()">
                        <q-btn icon="redeem" color="secondary"></q-btn>
                    </a>
                    <a v-if="!isMobile" class="menu-item q-mr-md q-px-md" href="#contato">
                        Contato
                    </a>
                    <a v-if="isMobile" class="menu-item" @click="scrollToBottom()">
                        <q-btn icon="contact_support" color="secondary"></q-btn>
                    </a>
                    <q-btn glossy dense class="menu-item text-bold bg-primary q-pa-md text-purple-1 row items-center"
                        style="border-radius:8px" @click="navigateTo('/login')">
                        Entrar
                        <q-icon name="login" size="md" />
                    </q-btn>
                </div>
            </div>

        </q-header>
        <q-page-container>
            <div class="w100 row justify-center q-mt-md relative" style="overflow: hidden ">
                <div class="animate__animated animate__zoomInDown animate__delay-1s animate__slower row no-wrap justify-center q-px-sm  w100" style="overflow: hidden ;z-index: 9;">
                    <q-btn glossy to="/login/host" color="secondary" class="animate__animated text-primary animate__fadeInLeft  animate__delay-3s animate__slower q-pa-xl rounded-borders" 
                    icon-right="nightlife"
                        label="Sou Produtor!" />
                    <q-btn glossy to="/login" @click="scrollBot()"  class="animate__animated animate__fadeInRight bg-primary q-ml-sm text-white animate__delay-3s animate__slower q-pa-xl rounded-borders"
                     icon-right="confirmation_number"
                        label="Quero Ingressos!" />
                </div>
            </div>
            <q-page class="">
                <div id="home" style="border: 8px solid #692EDD;border-radius: 8px;"
                    class="q-mt-md q-mb-md animate__animated animate__zoomIn animate__slower ">
                    <q-toolbar class="bg-grad-4">
                        <q-toolbar-title
                            class="row justify-center q-py-sm text-bold text-white rounded-borders items-center q-gutter-x-sm">
                            <div id="title" class="text-center">
                                MIDNIGHT <br v-if="isMobile">TICKETS
                            </div>
                            <q-icon v-if="!isMobile" size="xl" color="white" name="local_activity" />
                        </q-toolbar-title>
                    </q-toolbar>
                    <div class="text-shadow space bg-grad-2 w100 text-center text-grey-4 q-py-md text-bold q-px-md "
                        style="font-size:1rem">
                        REALIZE seus EVENTOS com 0% de TAXA e PARE de PAGAR TRIBUTOS excessivos na VENDA de SEUS INGRESSOS!!
                    </div>
                    <div class="row justify-center  q-mx-md">
                        <q-card id="email-card"
                            class="text-white bg-grad-1 q-mt-md text-bold rounded-borders animate__animated animate__zoomIn animate__slower animate__delay-3s">
                            <p class="text-center q-pt-md q-px-md high-opacity" style="font-size: .8rem;">DIGITE seu EMAIL e ALAVANQUE o seu FATURAMENTO em INGRESSOS</p>
                            <q-input :inputStyle="{fontWeight: 'bold', color:'#6310E1'}" v-model="contato.email" type="email" class="bg-white" filled
                                label="Email">
                                <template v-slot:prepend>
                                    <q-icon name="email" color="primary" />
                                </template>
                                <template v-slot:append>
                                    <q-btn @click="fastEmailGetter()" color="primary" icon="send" label="Enviar" />
                                </template>
                            </q-input>
                        </q-card>
                    </div>
                    <div class="w100 img-wrapper">
                        <img class="img"
                            src="https://images.blush.design/UKjlMI8EIiiOMVntZau4?w=920&auto=compress&cs=srgb" alt="">
                    </div>
                    <div style="font-size:1.3rem" class=" bg-grad-4 text-white text-bold q-px-sm q-py-md text-left">Quem
                        Somos ?</div>
                    <div style="font-size:1.1rem"
                        class=" bg-grad-2 text-white high-opacity text-bold q-px-sm q-py-md text-right text-shadow">
                        Somos
                        um
                        Aplicativo Web de Bilheteria Online e Monitoramento de Eventos focados na Escalabilidade
                        de seus Lucros em Venda de Ingressos Digitais.</div>
                    <div class="w100 img-wrapper">
                        <img class="img"
                            src="https://images.blush.design/PJcHFUF4pMy6BXPLEFnD?w=500&auto=compress&cs=srgb" alt="">
                    </div>
                    <div style="font-size:1.3rem" class=" bg-grad-4 text-white text-bold q-px-sm q-py-md text-left">O
                        que Fazemos ?</div>
                    <div style="font-size:1.1rem"
                        class="text-shadow q-mb-md bg-grad-2 text-white high-opacity text-bold q-px-sm q-py-md text-right">
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
                    <div id="vantagens" style="font-size:1.1rem;"
                        class="text-shadow bg-grad-2 text-white high-opacity  text-bold q-px-sm  q-py-md text-right">
                        Desde
                        pequenos encontros a grandes festivais, nossa plataforma se adapta às suas necessidades e
                        POTENCIALIZA seus ganhos.
                         Oferecemos opções flexíveis que se
                        ajustam ao porte do seu evento, permitindo que você personalize sua experiência de acordo com
                        sua demanda.
                    </div>
                </div>
                <div  class="rounded-borders" style="border: 4px solid #692EDD;">
                    <!-- <div style="letter-spacing:1px"
                        class="text-shadow text-h6 w100 text-bold text-blue-4 text-center q-px-md q-py-sm border-bottom">
                        Veja como
                        nossa Plataforma pode aumentar o Faturamento do seu Evento!!</div> -->
                    <div id="title" class="text-h4 bg-white text-primary text-center w100 border-bottom text-bold q-pt-md q-pb-md">
                        Vantagens</div>
                    <div style="font-size:1.1rem"
                        class="text-shadow q-px-md bg-grey-4 text-left q-py-md rounded-borders">
                        🟣 <strong class="text-primary">SEM TAXA POR VENDA<br></strong> Nossa <strong>moeda
                            virtual</strong>
                        permite realizar <strong>Eventos</strong> com <strong>0% de taxa</strong> em ingressos
                        vendidos. Obtenha
                        o <strong>máximo do seu
                            lucro</strong> e ainda <strong>GANHE CASHBACK</strong>
                        <br>🟣 <strong class="text-primary">LUCRO EM TEMPO REAL<br></strong> Disponibilizamos a
                        possibilidade de receber o
                        <strong>lucro de suas vendas automaticamente em tempo real na sua conta</strong> enquanto
                        acontece o seu evento<br>
                        🟣 <strong class="text-primary">AJUSTES DE LOTES GRATUITOS<br></strong>
                        Realize <strong>ajustes de lotes</strong> e <strong>preços</strong> dos seus ingressos sem custo adicional. <strong>Altere</strong> o valor dos seus ingressos a <strong>qualquer momento</strong>
                        <br>
                        🟣 <strong class="text-primary">NOVAS FUNCIONALIDADES PERIODICAMENTE<br></strong> 
                        Estamos sempre <strong>inovando</strong> e <strong>adicionando novas funcionalidades</strong> para <strong>otimizar</strong> a <strong>experiência</strong> dos nossos <strong>usuários</strong> e <strong>produtores</strong>
                    </div>
                    <div id="title"
                        class="w100 text-h4 text-bold bg-white text-primary text-center q-px-md rounded-borders q-py-sm border-bottom" style="border:4px solid #692EDD">
                        Benefícios</div>
                    <div style="font-size:1.1rem"
                        class="text-shadow q-px-md bg-grey-4 q-py-md rounded-borders border-bottom">
                        💸 <strong style="font-size:1.2rem" class="text-primary text-bold">LIBERTE-SE das TAXAS<br></strong>
                        Estamos
                        integrados ao <strong>Mercado Pago</strong> com segurança
                        e confidencialidade. Integrado a todos os métodos de pagamentos, existe a possibilidade de <strong>Taxa 0</strong> na venda de ingressos
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
                        serviço é monitorado constantemente, focado em <strong>otimizar o tráfego de dados. </strong>
                        O Suporte é <strong>humanizado</strong> e <strong>ágil</strong> para atender suas necessidades o quanto antes
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
                        Nosso App Web é desenvolvido com as <strong id="contato">melhores tecnologias</strong> do mercado
                        e hospedada
                        na nuvem, <strong>garantindo segurança e escalabilidade</strong>. Nosso foco é a <strong>Usabilidade</strong> de todos os tipos de usuários: <strong>produtores, organizadores de eventos e compradores de ingressos digitais</strong>
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
                <div class=" relative">
                    <div class="text-h4 text-bold q-py-md text-white text-center bg-grad-4 border-bottom q-mt-md">🚀
                        Fale
                        Conosco</div>

                    <div class="space rounded-borders q-my-md  "
                        style="border-radius: 20px;border-bottom: 8px solid #3C0783;z-index: -10">
                        <q-card class="q-pa-md collumn q-gutter-y-md rounded-borders "
                            style="border: 15px solid #6310E1; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;">
                            <div class="text-shadow w100 text-center text-primary text-bold mid-opacity ">
                                ALAVANQUE seus FATURAMENTO otimizando o LUCRO de suas VENDAS com uma CONSULTORIA
                                PERSONALIZADA para a
                                SUA DEMANDA</div>
                            <div class="mid-opacity text-blue-6 text-center w100 text-bold">
                                Todos campos abaixos são opcionais
                            </div>
                            <q-input :inputStyle="{fontWeight: 'bold', color:'#6310E1'}" maxlength="200" filled v-model="contato.form.name" label="1.Qual é o seu nome?">
                                <template v-slot:append>
                                    <q-icon name="person" color="primary" />
                                </template>
                            </q-input>
                            <q-input :inputStyle="{fontWeight: 'bold', color:'#6310E1'}" maxlength="200" filled v-model="contato.form.companyName"
                                label="2.Nome da Empresa">
                                <template v-slot:append>
                                    <q-icon name="business" color="primary" />
                                </template>
                            </q-input>
                            <q-input :inputStyle="{fontWeight: 'bold', color:'#6310E1'}" mask="(##) #####-####" placeholder="(12) 34567-8910" type="tel" maxlength="200"
                                filled v-model="contato.form.phone" label="3.Telefone/WhatsApp">
                                <template v-slot:append>
                                    <q-icon name="phone" color="primary" />
                                </template>
                            </q-input>
                            <q-input :inputStyle="{fontWeight: 'bold', color:'#6310E1'}" placeholder="Shows, baile funk, festival de rock..." maxlength="200"
                                filled v-model="contato.form.eventType" label="4.Tipos de Eventos">
                                <template v-slot:append>
                                    <q-icon name="nightlife" color="primary" />
                                </template>
                            </q-input>
                            <q-input :inputStyle="{fontWeight: 'bold', color:'#6310E1'}" suffix="pessoas" mask="#####" filled v-model="contato.form.maxCapacity"
                                label="5.Capacidade máxima de público">
                                <template v-slot:append>
                                    <q-icon name="groups" color="primary" />
                                </template>
                            </q-input>
                            <q-input :inputStyle="{fontWeight: 'bold', color:'#6310E1'}" suffix="pessoas" mask="#####" filled v-model="contato.form.mediumEventCapacity"
                                label="6.Média de público por evento">
                                <template v-slot:append>
                                    <q-icon name="people" color="primary" />
                                </template>
                            </q-input>
                            <q-input :inputStyle="{fontWeight: 'bold', color:'#6310E1'}" maxlength="5" mask="#####" filled v-model="contato.form.mediumVendaIngressos"
                                placeholder="Média de Ingressos vendidos online"
                                label="7.Quantidade de Ingressos Digitais ">
                                <template v-slot:append>
                                    <q-icon name="confirmation_number" color="primary" />
                                </template>
                            </q-input>
                            <q-input :inputStyle="{fontWeight: 'bold', color:'#6310E1'}" maxlength="3" suffix="%" reverse-fill-mask mask="###" filled
                                v-model="contato.form.percentAvista" label="8.Percentual de Vendas à Vista"
                                >
                                <template v-slot:append>
                                    <q-icon name="payments" color="primary" />
                                </template>
                            </q-input>
                            <q-input :inputStyle="{fontWeight: 'bold', color:'#6310E1'}" maxlength="9" prefix="R$" reverse-fill-mask mask="##.###,##" filled
                                v-model="contato.form.mediumProfits" placeholder="Média de faturamento por evento"
                                label="9.Lucro por evento em Ingressos Digitais">
                                <template v-slot:append>
                                    <q-icon name="paid" color="primary" />
                                </template>
                            </q-input>
                            <q-input :inputStyle="{fontWeight: 'bold', color:'#6310E1'}" maxlength="200" filled v-model="contato.form.localizacao" label="10.Localização">
                                <template v-slot:append>
                                    <q-icon name="location_on" color="primary" />
                                </template>
                            </q-input>
                            <q-btn v-if="!sendLoading" @click="sendForm()" class="q-pa-md w100" color="primary"
                                icon-right="description" label="Enviar"  />
                            <div class="w100 row justify-center">
                                <q-spinner-bars v-if="sendLoading" class="q-mt-md" color="primary" size="2em" />
                            </div>
                        </q-card>
                    </div>
                    <div class="space rounded-borders q-my-md ">
                        <q-btn @click="wppConsultor()" class="q-pa-md w100" color="green" icon-right="sms"
                            label="Fale Agora Com um de nossos Consultores" glossy />
                    </div>
                    <div
                        class="w100 text-bold rounded-borders column bg-grad-2 items-center justify-center text-white q-pa-md text-center q-mt-md ">
                        <div class="column text-h5 text-white text-bold">LOGIN HOST</div>
                        <div class="text-purple-2">É Produtor de Eventos ou Possui Acesso Externo??</div>
                        <q-btn icon-right="admin_panel_settings" label="Faça login Aqui" style="border-radius:12px" glossy dense class="q-mt-sm q-pa-lg "
                            color="dark" to="/login/host" />
                    </div>
                </div>
                <div class="w100 text-secondary text-purple-1 text-bold text-center q-mt-md">
                    Siga-nos no <a href="https://www.instagram.com/midnightickets" class="text-secondary"
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
    window.scrollTo(0, document.body.scrollHeight- 830);
}

function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight - 1920);
}
function scrollToVantagem() {
    window.scrollTo(0, document.body.scrollHeight - 3740);
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
    border-bottom: 4px solid #692EDD;
}

.img-wrapper {
    z-index: 99 !important;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}

.img,
img {
    width: 100%;
    max-width: 800px;
    height: auto;
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
    font-size: 1.1rem;
}

.q-btn:hover {
    opacity: 0.8;
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

@media(min-width: 1300px) {
    .q-page {
        padding: 0 15vw;
        margin: 0 30px;
    }
    .q-page-container{
        padding: 0 100px;
    }

    #email-card {
        width: 60% !important;
    }

    .q-carousel {
        height: 90vh;
    }

    .img {
        max-width: 620px;
    }
}

.high-opacity {
    opacity: 0.8;
}
</style>