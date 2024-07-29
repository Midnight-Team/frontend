<template>
    <q-layout class="relative animate__animated animate__fadeIn">
        <q-header class="fixed bg-grad-3 text-white animate__animated animate__backInDown animate__slow"
            height-hint="98">
            <div style="font-size: 1rem;" class=" q-py-md w100 row no-wrap items-center  justify-evenly">
                <a @click="scrollTop()">
                    Quem Somos
                </a>
                <a href="#beneficios">
                    Vantagens
                </a>
                <a @click="scrollToBottom()">
                    Contato
                </a>
            </div>

        </q-header>
        <q-page-container>
            <q-page class="">
                <div id="home" style="border: 4px solid #984BE7"
                    class="q-mb-xl q-px-xs q-pb-xl animate__animated animate__zoomIn animate__slower">
                    <q-toolbar class="bg-grad-4">
                        <q-toolbar-title
                            class="row justify-center q-py-sm text-bold text-white rounded-borders items-center q-gutter-x-sm">
                            <q-icon size="xl" color="white" name="local_activity" />
                            <div>
                                MIDNIGHT TICKETS
                            </div>
                        </q-toolbar-title>
                    </q-toolbar>
                    <div class="space bg-grad-2 w100 text-center text-white q-py-md text-bold q-px-md high-opacity" style="font-size:1.1rem">
                        PARE de PAGAR TAXAS excessivas na VENDA de SEUS INGRESSOS e REALIZE seus EVENTOS com 0% de TAXA!!
                    </div>
                    <q-card class="text-white bg-grad-1 q-mt-md text-bold rounded-borders animate__animated animate__zoomIn animate__slower animate__delay-5s">
                        <p class="text-center q-pt-md q-px-md" style="font-size: .8rem;">Receba notificações sobre o LANÇAMENTO do nosso SERVIÇO e
                            receba VANTAGENS GRATUITAMENTE!!</p>
                        <q-input v-model="contato.email" class="bg-white" filled label="Seu melhor email">
                            <template v-slot:prepend>
                                <q-icon name="email" color="primary" />
                            </template>
                            <template v-slot:append>
                                <q-btn @click="sendForm()" color="primary" icon="send" label="Enviar" />
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
                        de seus Lucros em Venda de Ingressos Digitais</div>
                    <div class="w100 img-wrapper">
                        <img class="img"
                            src="https://images.blush.design/PJcHFUF4pMy6BXPLEFnD?w=500&auto=compress&cs=srgb" alt="">
                    </div>
                    <div style="font-size:1.3rem" class=" bg-grad-4 text-white text-bold q-px-sm q-py-md text-left">O
                        que Fazemos ?</div>
                    <div style="font-size:1.1rem"
                        class="q-mb-md bg-grad-2 text-white high-opacity text-bold q-px-sm q-py-md text-right">
                        Maximizamos seus lucros na venda de ingressos de forma escalável com serviços personalizados,
                        transparência, suporte e uma
                        interface amigável. Além de consultorias para otimizar cada vez mais suas receitas e reduzir custos
                        <br>
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
                        ajustam ao porte do seu evento, permitindo que você personalize sua experiência de acordo com sua demanda
                    </div>
                </div>
                <div id="beneficios" style="border: 4px solid #984BE7;">
                    <q-toolbar class="bg-grad-4">
                        <q-toolbar-title
                            class="row justify-center q-py-sm text-bold text-white rounded-borders items-center q-gutter-x-sm">
                            <q-icon size="xl" color="white" name="local_activity" />
                            <div>
                                MIDNIGHT TICKETS
                            </div>
                        </q-toolbar-title>
                    </q-toolbar>
                    <div class="text-h5 text-center w100 text-white text-bold q-pt-md q-pb-md bg-grad-2 q-my-md">💰 Vantagens</div>
                    <div class="w100 text-h6 text-bold bg-white text-primary text-center q-px-md q-py-sm border-bottom">
                        Veja
                        como
                        nossa Plataforma pode aumentar o Faturamento do seu Evento!!</div>
                    <div style="font-size:1rem" class="q-px-md   bg-white text-left q-py-md rounded-borders">
                        🟢 <strong class="text-green">Modalidade Grátis:</strong> Crie Eventos <strong>sem
                            custos</strong> e pague apenas <strong>6% de taxa</strong>
                        por
                        ingresso vendido. Ingressos ilimitados e uma <strong>solução simples para qualquer porte de evento</strong>.
                        <br>🟣 <strong class="text-primary">Modalidade Purplecoins:</strong> Nossa <strong>moeda virtual</strong>
                        permite realizar <strong>Eventos</strong> com com <strong>0% de taxa</strong> por ingresso vendido. Obtenha <strong>100% do
                            lucro</strong> e ainda <strong>GANHE CASHBACK</strong> com cada ingresso
                        não vendido
                        <br>🔵 <strong class="text-blue">Saque Automático:</strong> também disponibilizamos a
                        possibilidade de receber o
                        <strong>lucro de suas vendas automaticamente em tempo real na sua conta</strong> enquanto
                        acontece o seu evento
                    </div>
                    <div class="w100 img-wrapper column">
                        <img class="img" src="~/assets/landing-images/recarga.png" alt="">
                    </div>
                    <div
                        class="w100 text-h5 text-bold bg-white text-primary text-center q-px-md rounded-borders q-py-sm border-bottom q-mt-md">
                        🪙 Benefícios</div>
                    <div style="font-size:1rem" class="q-px-md bg-white q-py-md rounded-borders border-bottom">
                        💸 <strong style="font-size:1.2rem" class="text-primary text-bold">Pagamentos e Menores
                            Taxa:</strong> Estamos integrados ao <strong>Mercado Pago</strong> com segurança
                        e confidencialidade. Além de possuir <strong>as menores taxas de
                            transações</strong>
                        <br>
                        🤳🏼 <strong style="font-size:1.2rem" class="text-primary text-bold">Sem Necessidade De
                            Instalação:</strong> Gerencie seus eventos e vendas na palma da sua mão <strong>sem
                            necessidade de
                            instalação</strong> de aplicativos pra todos os tipos de usuário
                        <br>
                        🧑🏼‍💻 <strong style="font-size:1.2rem" class="text-primary text-bold">Suporte Humanizado e
                            Eficaz:</strong> Nosso serviço é monitorado constantemente, focado em <strong>otimizar os custos</strong>
                        para todos e <strong>gratificar os usuários</strong> com nossas <strong>moedas virtuais</strong> gamificadas
                        <br>
                        🖥️ <strong style="font-size:1.2rem" class="text-primary text-bold">Consultoria
                            Especializada:</strong> Nossos <strong>desenvolvedores</strong> possuem experiências profisionais em diversos <strong>projetos
                        nacionais e internacionais</strong> em Bancos e Software Houses, e estarão a
                        disposição para
                        suporte, <strong>sugestões de melhorias e correções
                        de bugs</strong>
                        <br>
                        📲 <strong style="font-size:1.2rem" class="text-primary text-bold">Tecnologia de Ponta:</strong>
                        Nosso WebApp é desenvolvido com as <strong>melhores tecnologias</strong> do mercado e hospedada na nuvem com
                        serviços da AWS, <strong>garantindo segurança e escalabilidade</strong> para <strong>todos os tipos de eventos e usuários</strong>
                    </div>
                </div>
                <div class="w100 img-wrapper column">
                    <img class="img" src="~/assets/landing-images/evento.png" alt="">
                </div>
                <div id="form" class=" relative">
                    <div class="text-h4 text-bold q-py-md text-white text-center bg-grad-1 border-bottom q-mt-md">🚀 Fale
                        Conosco</div>
                    
                    <div class="space rounded-borders q-my-md " style="border-bottom: 8px solid #3C0783;z-index: -10">
                        <q-card class="q-pa-md collumn q-gutter-y-md " style="border: 15px solid #6310E1; border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;">
                            <div class="w100 text-center text-primary text-bold mid-opacity">Preencha os campos abaixo e PARE de pagar TAXAS ABUSIVAS</div>
                            
                            <q-input maxlength="200" outlined v-model="contato.form.companyName" label="Nome da empresa"/>
                            <q-input maxlength="200" outlined v-model="contato.form.phone" label="Telefone de contato"/>
                            <q-input maxlength="200" outlined v-model="contato.email" label="Email de contato"/>
                            <q-input type="number" outlined v-model="contato.form.maxCapacity" label="Capacidade máxima de público"/>
                            <q-input type="number" outlined v-model="contato.form.mediumEventCapacity" label="Média de público por evento"/>
                            <q-input maxlength="200" outlined v-model="contato.form.eventType" label="Tipo de evento"/>
                        </q-card>
                        <q-btn @click="sendForm()" class="q-pa-md w100" color="primary" icon-right="description"
                            label="Enviar formulário" />
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
import { api } from 'src/boot/axios';
import FooterComponent from "../components/FooterComponent.vue";

const $q = useQuasar()

const contato = ref({
    email: '',
    form: {
        phone: '',
        companyName: '',
        maxCapacity: '',
        eventType: '',
        mediumEventCapacity: '',
    },
    dispositivo: window.innerWidth < 900 ? 'Mobile' : 'Desktop'
})

function wppConsultor() {
    window.open('https://wa.me/5561981748795?text=Ola,%20Gostaria%20de%20realizar%20uma%20consultoria%20para%20Otimizar%20a%20Venda%20dos%20meus%20Ingressos%20e%20Escalar%20o%20Lucro%20dos%20Meus%20Eventos%20com%20a%20Midnight%20Tickets!', '_blank');
}

async function sendForm() {    
    if (contato.value.email === '' || !contato.value.email.includes('@')) {
        $q.notify({
            message: 'Por favor, insira um email válido!',
            color: 'red',
            position: 'top',
            icon: 'email',
        });
        return
    }
    
    await api.post('/landing/email', contato.value).then(() => {
        $q.notify({
            message: 'Formulário enviado com sucesso!',
            color: 'green',
            position: 'top',
            icon: 'email',
        });
    }).catch(() => {
        $q.notify({
            message: 'Erro ao enviar formulário!',
            color: 'red',
            position: 'top',
            icon: 'email',
        });
    });
}

function scrollTop() {
    window.scrollTo(0, 0);
}

function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight - 775);
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

#contato {}
</style>