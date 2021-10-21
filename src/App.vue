<template>
  <router-view></router-view>
  <!-- <div class="layout">
    <main class="main">
      <dl class="dl">
        <dd class="page">
          <header class="mheader"><h1>书法练习</h1></header>
          <ul class="con">
            <li v-for="(t, index) in con" :key="index" v-last>
              <f-td :text="t"></f-td>
            </li>
          </ul>
          <footer class="mfooter">
            <sub>{{ new Date() }}</sub>
          </footer>
        </dd>
      </dl>
    </main>
    <aside class="aside">
      <h5 class="subtitle">打印设置</h5>
      <ul class="sidelist">
        <li>
          <label class="label">内容设置：</label>
          <div class="licon">
            <f-input v-model:value="con" @change="changeCon"></f-input>
          </div>
        </li>
        <li>
          <label class="label">字体设置：</label>
          <div class="licon">
            <input type="file" accept="*" @change="upload" />
            <select
              v-model="selected"
              @change="selectData($event.target.value)"
            >
              <option disabled value="">Please select one</option>
              <option v-for="item in familylist" :value="item.value">{{
                item.label
              }}</option>
            </select>
          </div>
        </li>
      </ul>
    </aside>
  </div> -->
</template>

<script setup></script>

<style>
#app {
  min-width: 1200px;
}
/* unset */
body,
html {
  margin: 0;
  padding: 0;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}
dl,
dd,
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
