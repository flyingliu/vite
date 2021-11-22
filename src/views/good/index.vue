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
              <span v-for="(str, i) in page" :key="i" :style="{ color: state.colorFont,borderColor: state.color }">{{ str }}</span>
              <span class="last" :style="{...state.lastItem,borderColor: state.color}">
                <div :style="{ color: state.colorFont }">{{state.subcon}}</div>
              </span>
            </dd>
          </div>
          <footer class="mfooter">
            <ul class="center">
              <li :style="{ color: state.color }">
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
      <set-grid @getGrid="getGrid" />
    </aside>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, computed } from 'vue'
import SetGrid from './SetGrid.vue'

let state = ref({})

const getGrid = (data) => {
  state.value = data
}
</script>

<style lang="scss" scoped>
$c: #395260;
.one {
  display: grid;
  direction: rtl;
  grid-auto-flow: column;
  padding: 20px;
}

.one span {
  border: 0.5px solid #333;
}

.one span.last {
  grid-row-start: 1;
  border: 1px solid #333;
  font-size: 0.7em;
  line-height: 1.4;
  justify-items: center;
  align-items: center;
  display: flex;
  overflow: hidden;
  div {
    margin: auto;
    justify-content: center;
    padding: 0 0 2em 0;
  }
}
</style>
