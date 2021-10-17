<template>
  <div class="inputwrap">
    <textarea
      class="ftext"
      :value="value"
      @input="$emit('update:value', $event.target.value)"
      @keyup="chengeCon"
    ></textarea>
  </div>
</template>
<script setup>
import { ref } from 'vue'

defineProps({
  value: String,
})
const emit = defineEmits(['change', 'update:value'])

const chengeCon = () => {
  emit('change')
}
</script>

<style scoped>
.ftext {
  width: 100%;
  height: 50vh;
  resize: none;
  font: 14px/1.5 arial;
  padding: 8px;
  box-sizing: border-box;
}
.inputwrap {
  width: 100%;
  padding: 0px;
  box-sizing: border-box;
}
a {
  color: #42b983;
}
</style>
