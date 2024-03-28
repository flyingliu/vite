<template>
  <div>

    <x-ell ref="xell" :rows="rows" :list="list">颜真卿:争座位帖</x-ell>
    <button popovertarget="imgBook">点击显示图片</button>
    <img id="imgBook" popover src="https://qiniu.easywe.net/shufa/yanzhenqing/zhengzuowei/988_%E6%96%BC.jpg" />

<zxx-info></zxx-info>
  </div>
</template>

<style>
x-ell {
  display: block;
  width: 200px;
}
.title {
  color: red;
}
</style>
<script setup>
import './TodoInput.js'
import './x-ell.js'
import './module.js'
import './array.js'
  import { ref } from 'vue'
    const rows = ref('2')
    const list = ref(window.zhengzuowei)
    const setRows = () => {
      rows.value = '3'
    }
</script>

