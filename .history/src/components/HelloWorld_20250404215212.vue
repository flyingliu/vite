<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <main class="logomenu">
    <h1>--{{ msg }}++</h1>
    
  </main>
</template>

<style scoped>
.logomenu {
  background: rgba(2,2,2, .4);
  text-align: center;
  font-size: 14px;
  width: 200px;
}
a {
  color: #42b983;
}
</style>
