<template>
  <div class="index">
    <div class="mleft">
      <h3 class="logo iconfont">&#xe611;&#xe607;&#xe608;&#xe610;</h3>
      <h1>百日练字</h1>
    </div>

    <dl>
      <dd>
        <i class="aicon iconfont">&#xe60d;</i>
        <h3>作文对照临写</h3>
        <p>可自己设置字体！</p>
      </dd>
      <dd>
        <i class="aicon iconfont">&#xe60d;</i>
        <h3>作文对照临写</h3>
        <p>可自己设置字体！</p>
      </dd>
    </dl>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const input = ref(10)
</script>

<style lang="scss">
.index {
  display: flex;
  gap: 20px;
}
.mleft {
  width: 200px;
}
</style>
