<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <main class="herewrap">
    <h1>--{{ msg }}++</h1>
    <p>
      Recommended IDE setup:<a
        href="https://code.visualstudio.com/"
        target="_blank"
        >VSCode</a
      >+<a href="https://github.com/johnsoncodehk/volar" target="_blank"
        >Volar</a
      >
    </p>
    <p>
      <a href="https://vitejs.dev/guide/features.html" target="_blank"
        >Vite Documentation</a
      >|<a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
    </p>
    <button type="button" @click="count++">count is: {{ count }}</button>
    <p>
      Edit<code>components/HelloWorld.vue</code>to test hot module replacement.
    </p>
  </main>
</template>

<style scoped>
.herewrap {
  background: rgba(2,2,2, .4);
  text-align: center;
  font-size: 14px;
  height: 100px;
}
a {
  color: #42b983;
}
</style>
