<script setup>
import { ref } from 'vue'

defineProps({
  title: {
    type: String,
    default: '创意画房',
  },
  menu: {
    type: Array,
    default: () => [],
  }
})
</script>

<template>
  <main class="logomenu">
    <h1>{{title}}</h1>
    <dl>
      <dd v-for="item in menu" :key="item.name">{{item.name}}</dd>
    </dl>
  </main>
</template>

<style lang="scss" scoped>
.logomenu {
  h1 { color: #fff;
    font: 30px/1.5 'Microsoft YaHei';
  }
  text-align: left;
  padding: 10px 20px;
  background: rgba(2, 2, 2, 0.4);
  font-size: 14px;
  width: 140px;
}

a {
  color: #42b983;
}
</style>
