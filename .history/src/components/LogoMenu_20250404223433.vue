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
  },
})
const showMenu = ref(false)
</script>

<template>
  <main class="logomenu">
    <h1 @click="showMenu = !showMenu">{{ title }}</h1>
    <dl v-if="showMenu">
      <dd v-for="item in menu" :key="item.name">{{ item.name }}</dd>
    </dl>
  </main>
</template>

<style lang="scss" scoped>
.logomenu {
  text-align: left;
  padding: 10px 20px;
  background: rgba(2, 2, 2, 0.4);
  font-size: 14px;
  width: 140px;
  h1 {
    color: #fff;
    font: 30px/1.5 'Microsoft YaHei';
  }
  dl {
    dd {
      font: 20px/2 'Microsoft YaHei';
      color: #fff;
    }
  }
}

a {
  color: #42b983;
}
</style>
