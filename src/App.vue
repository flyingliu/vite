<template>
  <div class="layout">
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
  </div>
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import { ref } from 'vue'
const content = `10月10日，陕西咸阳彬州、宝鸡多地。迎来2021年下半年第一场雪。
陕。西今年的雪下得比往年都要早一些，差不多一两个月，而且气温很低，不少人已经提前穿上棉袄。
受降雪影响，太白山、红河谷景区自9日起临时性闭园，开放时间另行通知。
根据天气预报，未来一周内，宝鸡以阴天为主，部分地区有小雨，南北山区会出现雨夹雪或小雪天气，咸阳则持续阴雨天气。
此前在9月28日，黑龙江大兴安岭、呼中镇等多地都飘下了今年第一场雪。`

const changeCon = () => {
  // console.log('v',con.value)
}

const selected = ref('http://photo.guolaijie.com/css/font/luzhonglan.woff')

const familylist = [
  {
    label: '卢中南楷体',
    value: 'http://photo.guolaijie.com/css/font/luzhonglan.woff',
  },
  {
    label: '米芾行书',
    value: 'http://photo.guolaijie.com/css/font/mifu.woff2',
  },
]

const con = ref(content)

const upload = (e) => {
  const url = window.URL.createObjectURL(e.target.files[0])
  console.log('url', url)
  loadFonts(url)
}

const selectData = (v) => {
  console.log(v)

  const curr = familylist.find((item) => item.value === v)
  curr && addFont(curr)
}

async function loadFonts(url) {
  const font = new FontFace('myfont', 'url(' + url + ')')
  await font.load()
  document.fonts.add(font)
}

const addFont = async (opt = {}) => {
  const font = new FontFace(opt.label, 'url(' + opt.value + ')')
  await font.load()
  document.fonts.add(font)
}

addFont({
  label: '卢中南楷体',
  value: 'http://photo.guolaijie.com/css/font/luzhonglan.woff',
})
</script>

<style>
.subtitle {
  font: 18px/2 arial;
}

.sidelist {
  text-align: left;
}

.sidelist li {
  padding: 0px 20px 20px;
}

.label {
  padding: 0 0 10px 0;
  display: inline-block;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
dl,
dd,
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
.page {
  width: 210mm;
  height: 297mm;
  page-break-after: always;
  border-bottom: 1px solid #000;
}

.mheader {
  max-width: 18.4cm;
  margin: auto;
}
.mfooter {
  max-width: 18.4cm;
  margin: auto;
}

.con {
  width: 100%;
  margin: auto;
  max-width: 18.4cm;
  height: 24.4cm;
  display: flex;
  flex-flow: row wrap;
  gap: 0.2cm 0cm;
  border: 3px solid #000;
  justify-content: flex-start;
  align-content: flex-start;
  overflow: hidden;
  position: relative;
  font-family: 'myfont';
}
.con li {
  font-size: 0;
  display: block;
}
.con li.isLast {
  background: pink;
  width: 0;
  color: red;
}
.layout {
  display: flex;
}
.main {
  width: 21cm;
}
.aside {
  background: #eee;
  min-width: 250px;
  width: calc(100vw - 21cm);
  position: fixed;
  left: 21cm;
  top: 0;
  height: 100vh;
}
</style>
