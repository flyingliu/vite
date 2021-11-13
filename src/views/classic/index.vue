<template>
  <div class="layout">
    <main class="main">
      <dl class="dl">
        <dd class="page" v-for="(page, n) in state.content" :key="n">
          <header class="mheader">
            <h1>书法练习</h1>
          </header>
          <div class="con" :style="{ borderColor: state.color }">
            <dd class="one" :style="state.styleObj">
              <ul
                v-for="(str, i) in page"
                :key="i"
                :style="{ color: state.color }"
              >
                <li
                  class="item"
                  v-for="(k, n) in state.col"
                  :key="k"
                  :style="state.item"
                  :class="state.icon"
                >
                  <div
                    v-if="n % state.repeat === 0"
                    :style="{ color: state.colorFont }"
                  >
                    {{ str }}
                  </div>
                </li>
              </ul>
            </dd>
          </div>
          <footer class="mfooter" :style="{ color: state.color }">
            <ul class="center">
              <li>
                {{ state.col }} * {{ state.row }} =
                {{ state.col * state.row }} |
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

<style lang="scss">
$c: #395260;
$line: #999;
.one {
  padding: 0px;
  ul {
    display: flex;
    flex: row nowrap;
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
    z-index: 9;
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
    font-family: 'iconfont';
    font-size: 100%;
    line-height: 1.35;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    margin: auto;
    width: 100%;
    height: 100%;
  }
}
.one span {
  border: 0.5px solid #333;
}
.one span.last {
  border: 1px solid #333;
}
</style>
