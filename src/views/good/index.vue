<template>
  <div class="layout">
    <main class="main">
      <dl class="dl">
        <dd class="page" v-for="(page,n) in state.content" :key="n">
          <header class="mheader">
            <h1>书法练习</h1>
          </header>
          <div class="con">
            <dd class="one" :style="state.styleObj">
              <span v-for="(str, i) in page" :key="i">{{ str }}</span>
              <span class="last" :style="state.lastItem"></span>
            </dd>
          </div>
          <footer class="mfooter">
            <ul class="center">
              <li>
                {{ state.col }} * {{ state.row }} =
                {{ state.col * state.row }} |
                {{ (state.size * 10).toFixed(1) }} MM *
                {{ (state.size * 10).toFixed(1) }} MM
              </li>

              <li>字体：{{ state.font }}</li>
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

<style lang="scss">
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

}
</style>
