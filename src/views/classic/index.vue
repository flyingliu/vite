<template>
  <div class="layout">
    <main class="main">
      <dl class="dl">
        <dd class="page" v-for="(page, n) in state.content" :key="n">
          <header class="mheader">
            <h1>书法练习</h1>
          </header>
          <div class="con">
            <dd class="one" :style="state.styleObj">
              <ul v-for="(str, i) in page" :key="i">
                <li class="item" v-for="k in state.col" :key="k" :style="state.item">
                  <div>{{ str }}</div></li>
              </ul>
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
$line: #999;
.one {
  padding: 0px;
  ul {
    display: flex;
    flex: row nowrap;
  }
}

.item {
  border:.5px solid #333;
  box-sizing: border-box;
  position: relative;
  margin: auto;
  >div {position: relative; z-index: 9;}
  &::before,&::after {
    content:'';
    display: block;
        position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    transform: rotate(45deg);
    background-image: 
      linear-gradient(to bottom, transparent 50%, $line 50%), // 上面的会覆盖下面的。
      linear-gradient(to right, transparent 50%, $line 50%); // 上面的会覆盖下面的。
    background-repeat: repeat-y,repeat-x; // 可以单独定义重复类型
    background-size: 2px 5%,5% 2px; // 可以单独定义大小
    background-position: center;
  }
  &::after {
    transform:unset;
  }
}
.one span {
  border: 0.5px solid #333;
}
.one span.last {
  border: 1px solid #333;
}
</style>
