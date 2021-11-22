<template>
  <div class="layout">
    <main class="main">
      <dl class="dlone">
        <dd class="page" :style="{ backgroundColor: state.colors?.[0] || '' }">
          <dl class="con" :style="{ borderColor: state.color }">
            <dd
              class="item"
              v-for="(v, n) in state.content"
              :key="n"
              :class="state.icon"
              :style="state.item"
            >
              <div><img :src="v.httpImg" :alt="v.label" /></div>
            </dd>
          </dl>
          <footer class="mfooter" :style="{ color: state.color }">
            <ul class="center">
              <li>
                {{ (state.size * 10).toFixed(1) }} MM *
                {{ (state.size * 10).toFixed(1) }} MM
              </li>
            </ul>
          </footer>
        </dd>
      </dl>
    </main>
    <aside class="aside">
      <set-grid ref="SetGridRef" />
    </aside>
  </div>
</template>
<script setup>
import { ref, reactive, toRefs, computed, onMounted } from 'vue'
import SetGrid from './SetGrid.vue'
const SetGridRef = ref(null)
const state = ref({})
onMounted(() => {
  state.value = SetGridRef.value.state
})
</script>

<style lang="scss" scoped>
$c: #395260;
$line: #999;

.dlone {
  width: 100%;
  height: 100vh;

  .page {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    flex-flow: column nowrap;
    align-items: center;
    overflow: hidden;
    .con {
      display: flex;
      flex-flow: row nowrap;
    }
  }
}

.item {
  border-width: 0.5px;
  border-style: solid;
  box-sizing: border-box;
  position: relative;
  margin: auto;
  > div {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;

    img {
      position: relative;
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
    }
  }
  &.icon1::before {
    content: '\e600';
  }
  &.icon2::before {
    content: '\e601';
  }
  &.icon3::before {
    content: '\e602';
  }
  &::before {
    z-index: 9;
    font-family: 'iconfont';
    font-size: 100%;
    line-height:1;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    margin: auto;
    width: 100%;
    height: 100%;
  }
}
</style>
