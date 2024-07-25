<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
console.log(window.location.href)

export default defineComponent({
  name: 'App'
})
alert('🛠️ App em Desenvolvimento, acesso disponível apenas para navegação de teste!! 🟣')
</script>
