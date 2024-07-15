<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
console.log(window.location.href)

export default defineComponent({
  name: 'App'
})
</script>
