<template>
  <div>
    this.is home！

    <el-input v-model="input" placeholder="Please input" />
  </div>

</template>

<script setup>
import { ref } from 'vue'
const input = ref(10)

</script>

<style>

</style>
