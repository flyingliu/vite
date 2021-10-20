<template>
  <div class="td">
    <span>
      {{ text }}
    </span>
    <span> </span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  text: String,
})

const count = ref(0)
</script>

<style scoped>
.td {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(1, 100%);
  grid-template-rows: repeat(2, 50%);
  align-items: start;
}
span {
  width: 100%;
  height: 100%;
  display: block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
a {
  color: #42b983;
}
</style>
