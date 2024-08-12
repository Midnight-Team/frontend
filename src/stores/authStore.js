// src/stores/authStore.ts
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: sessionStorage.getItem('userLogado') == undefined ? false : true
  }),
  actions: {
    login() {
      this.isAuthenticated = true;
      sessionStorage.setItem('userLogado', 'true');
    },
    async logout() {
      await api.post('/logout', {login: this.getInfoLogin(), senha: this.getInfoPassword()})
        .then(() => {
          this.isAuthenticated = false;
          sessionStorage.removeItem('userLogado');
        })
        .catch(err => {
          console.error(err);
          alert('Erro ao fazer logout');
        })
    },
    getInfoNome() {
      const userLogado = sessionStorage.getItem('userLogado');
      if (userLogado) {
        const user = JSON.parse(userLogado);
        return user.nome;
      }
      return null; // Ou um valor padrão, se necessário
    },
    getInfoRazao() {
      const userLogado = sessionStorage.getItem('userLogado');
      if (userLogado) {
        const user = JSON.parse(userLogado);
        return user.nome_razao;
      }
      return null; // Ou um valor padrão, se necessário
    },
    getInfoLogin(){
      const userLogado = sessionStorage.getItem('userLogado');
      if (userLogado) {
        const user = JSON.parse(userLogado);
        console.log(user.login);
        return user.login;
      }
      return null; // Ou um valor padrão, se necessário
    },
    getInfoId(){
      const userLogado = sessionStorage.getItem('userLogado');
      if (userLogado) {
        const user = JSON.parse(userLogado);
        return user.id;
      }
      return null; // Ou um valor padrão, se necessário
    },
    getInfoEmail(){
      const userLogado = sessionStorage.getItem('userLogado');
      if (userLogado) {
        const user = JSON.parse(userLogado);
        return user.email;
      }
      return null; // Ou um valor padrão, se necessário
    },
    getInfoImg(){
      const userLogado = sessionStorage.getItem('userLogado');
      if (userLogado) {
        const user = JSON.parse(userLogado);
        return user.img;
      }
      return null; // Ou um valor padrão, se necessário
    },
    getInfoPurpleCoins(){
      const userLogado = sessionStorage.getItem('userLogado');
      if (userLogado) {
        const user = JSON.parse(userLogado);
        return user.purpleCoins;
      }
      return null; // Ou um valor padrão, se necessário
    },
    getInfoSubCoins(){
      const userLogado = sessionStorage.getItem('userLogado');
      if (userLogado) {
        const user = JSON.parse(userLogado);
        return user.subCoins;
      }
      return null; // Ou um valor padrão, se necessário
    },
    getInfoRole(){
      const roleUserLogado = sessionStorage.getItem('role');
      if (roleUserLogado) {
        const role = JSON.parse(roleUserLogado);
        return role;
      }
      return null; // Ou um valor padrão, se necessário
    },
    getInfoSaldo(){
      const userLogado = sessionStorage.getItem('userLogado');
      if (userLogado) {
        const user = JSON.parse(userLogado);
        return user.saldo;
      }
      return null; // Ou um valor padrão, se necessário
    },
    setInfoPurpleCoins(purpleCoins){
      const userLogado = sessionStorage.getItem('userLogado');
      if (userLogado) {
        const user = JSON.parse(userLogado);
        user.purpleCoins = purpleCoins;
        sessionStorage.setItem('userLogado', JSON.stringify(user));
      }
    },
    setInfoSubCoins(subCoins){
      const userLogado = sessionStorage.getItem('userLogado');
      if (userLogado) {
        const user = JSON.parse(userLogado);
        user.subCoins = subCoins;
        sessionStorage.setItem('userLogado', JSON.stringify(user));
      }
    },
  }
});