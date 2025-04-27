<script setup>
import { ref, onMounted } from 'vue'
import { setupMobileClick, loadxmlstring } from '/@/utils/index.js'

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

const logomenu = ref(null)

const loadScene = (item) => {
  console.log('item', item, loadxmlstring)
  const name = loadxmlstring(window.krpano, item)
  krpano.actions.loadscene(name)
}

onMounted(() => {
  setupMobileClick(logomenu.value)
})
</script>

<template>
  <main class="logomenu" ref="logomenu">
    <h1 @click="showMenu = !showMenu">{{ title }}</h1>
    <dl v-if="showMenu">
      <dd v-for="item in menu" :key="item.name" @click="loadScene(item)">{{ item.name }}</dd>
    </dl>
  </main>
</template>

<style lang="scss" scoped>
// option + z 可以统一更改 rem - px, px - rem 转换
.logomenu {
  text-align: left;
  font-size: .875rem;
  width: 11.25rem;
  h1 {
    color: #fff;
    font: 1.875rem/1.5 'Microsoft YaHei';
    padding: .625rem 1.25rem;
    background: rgba(2, 2, 2, 0.4);
    margin-bottom: .125rem;
    cursor: pointer;
  }
  dl {
    padding: 0 0 1.25rem 0;
    background: rgba(2, 2, 2, 0.4);
    dd {
      padding: 0rem 1.25rem;
      font: 1.25rem/2 'Microsoft YaHei';
      color: #fff;
      &:hover {
        background: #000;
      }
    }
  }
}

a {
  color: #42b983;
}
</style>
