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

    <dl>
      <dd v-for="item in menu" :key="item.name">
        <a :href="item.url">{{item.name}}</a>
      </dd>
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
