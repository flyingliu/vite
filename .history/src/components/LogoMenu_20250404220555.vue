<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})
</script>

<template>
  <main class="logomenu">
    <h1>--{{ msg }}++</h1>
    <dl>
      <dt>创意画房</dt>
    </dl>
  </main>
</template>

<style scoped>
.logomenu {
  background: rgba(2, 2, 2, 0.4);
  text-align: center;
  font-size: 14px;
  width: 200px;
}
a {
  color: #42b983;
}
</style>
