<template>
    <form id="form-checkout">
      <div id="form-checkout__cardNumber" class="container"></div>
      <div id="form-checkout__expirationDate" class="container"></div>
      <div id="form-checkout__securityCode" class="container"></div>
      <input type="text" id="form-checkout__cardholderName" placeholder="Titular do cartão" />
      <select id="form-checkout__issuer"></select>
      <select id="form-checkout__installments"></select>
      <select id="form-checkout__identificationType"></select>
      <input type="text" id="form-checkout__identificationNumber" placeholder="Número do documento" />
      <input type="email" id="form-checkout__cardholderEmail" placeholder="E-mail" />
      
      <button type="submit" id="form-checkout__submit">Pagar</button>
      <progress value="0" class="progress-bar">Carregando...</progress>
    </form>
</template>

<script setup>
import { api } from 'boot/axios';
import { onMounted } from 'vue';

const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

onMounted(async () => {
  try {
    await loadScript('https://sdk.mercadopago.com/js/v2');
    const mp = new window.MercadoPago(process.env.MP_PUBLIC_KEY);
    const cardForm = mp.cardForm({
      amount: "100.5",
      iframe: true,
      form: {
        id: "form-checkout",
        cardNumber: {
          id: "form-checkout__cardNumber",
          placeholder: "Número do cartão",
        },
        expirationDate: {
          id: "form-checkout__expirationDate",
          placeholder: "MM/YY",
        },
        securityCode: {
          id: "form-checkout__securityCode",
          placeholder: "Código de segurança",
        },
        cardholderName: {
          id: "form-checkout__cardholderName",
          placeholder: "Titular do cartão",
        },
        issuer: {
          id: "form-checkout__issuer",
          placeholder: "Banco emissor",
        },
        installments: {
          id: "form-checkout__installments",
          placeholder: "Parcelas",
        },
        identificationType: {
          id: "form-checkout__identificationType",
          placeholder: "Tipo de documento",
        },
        identificationNumber: {
          id: "form-checkout__identificationNumber",
          placeholder: "Número do documento",
        },
        cardholderEmail: {
          id: "form-checkout__cardholderEmail",
          placeholder: "E-mail",
        },
      },
      callbacks: {
        onFormMounted: error => {
          if (error) return console.warn("Form Mounted handling error: ", error);
          console.log("Form mounted");
        },
        onSubmit: async event => {
          event.preventDefault();

          const {
            paymentMethodId: payment_method_id,
            issuerId: issuer_id,
            cardholderEmail: email,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType,
          } = cardForm.getCardFormData();

          try {
            const response = await fetch("http://localhost:3333/api/process_payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                token,
                issuer_id,
                payment_method_id,
                transaction_amount: Number(amount),
                installments: Number(installments),
                description: "Descrição do produto",
                payer: {
                  email,
                  identification: {
                    type: identificationType,
                    number: identificationNumber,
                  },
                },
              }),
            });
            
            const result = await response.json();
            console.log(result);

          } catch (error) {
            console.error('Error processing payment:', error);
          }
        },
        onFetching: (resource) => {
          console.log("Fetching resource: ", resource);

          // Animate progress bar
          const progressBar = document.querySelector(".progress-bar");
          progressBar.removeAttribute("value");

          return () => {
            progressBar.setAttribute("value", "0");
          };
        }
      },
    });
  } catch (error) {
    console.error('Failed to load MercadoPago script:', error);
  }
});
</script>

<style scoped>
#form-checkout {
  display: flex;
  flex-direction: column;
  gap: .5rem;
}

.container, select, input {
  height: 36px;
  cursor: pointer;
  border: 1px solid rgb(118, 118, 118);
  border-radius: 6px;
  padding: .5rem;
}

.progress-bar {
  width: 100%;
  height: 1rem;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  padding: .5rem;
  cursor: pointer;
  transition: .5s all linear;
}

button:hover {
  opacity: .6;
}
</style>
