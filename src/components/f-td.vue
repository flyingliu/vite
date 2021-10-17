<template>
  <div class="td">
    <span>
      {{ text }}
    </span>
    <span> </span>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  text: String,
})

const count = ref(0)
</script>

<style scoped>
.td {
  width: 1cm;
  display: block;
}
span {
  width: 1cm;
  height: 1cm;
  display: block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 0.7cm;
  line-height: 1cm;
}
a {
  color: #42b983;
}
</style>
