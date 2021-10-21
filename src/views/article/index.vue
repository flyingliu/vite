<template>
  <div class="layout">
    <main class="main">
      <dl class="dl">
        <dd class="page" v-for="(page, index) in abc" :key="index">
          <header class="mheader">
            <h1>书法练习</h1>
          </header>
          <ul class="con" :style="styleObj">
            <li v-for="(t, index) in page" :key="index">
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
      <h5 class="subtitle"><span class="uline">打印设置</span></h5>
      <ul class="sidelist">
        <li>
          <label class="label">内容设置：</label>
          <div class="licon">
            <f-input v-model:value="mycon" @change="changeCon"></f-input>
          </div>
        </li>
        <li>
          <label class="label">字体设置：</label>
          <div class="licon">
            <input type="file" accept="*" @change="upload" />
            <select @change="selectData($event.target.value)">
              <option disabled value="">Please select one</option>
              <option v-for="item in family.familylist" :value="item.value">{{
                item.label
              }}</option>
            </select>
          </div>
        </li>
        <li>
          <label class="label">列数设置：</label>
          <div class="licon">
            <input type="number" v-model="col" />
          </div>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from '/@/components/HelloWorld.vue'
import { getFontName, familyList } from '/@/assets/js/util'
import fInput from '/@/components/f-input.vue'
import fTd from '/@/components/f-td.vue'
import { ref, reactive, computed } from 'vue'
const content = `10月10日，陕西咸阳彬州、宝鸡多地。迎来2021年下半年第一场雪。
陕。西今年的雪下得比往年都要早一些，差不多一两个月，而且气温很低，不少人已经提前穿上棉袄。
受降雪影响，太白山、红河谷景区自9日起临时性闭园，开放时间另行通知。
根据天气预报，未来一周内，宝鸡以阴天为主，部分地区有小雨，南北山区会出现雨夹雪或小雪天气，咸阳则持续阴雨天气。
此前在9月28日，黑龙江大兴安岭、呼中镇等多地都飘下了今年第一场雪。`

const changeCon = () => {
  console.log('v', con.value)
}

const upload = (e) => {
  const url = window.URL.createObjectURL(e.target.files[0])
  const label = getFontName(e.target.files[0].name)
  const list = family.familylist
  if (list.find((v) => v.label != label)) {
    list.push({ value: url, label })
  }
  loadFonts(list.find((v) => v.label == label))
}

const family = reactive({
  familylist: familyList.map((item) => {
    return typeof item === 'string'
      ? {
          label: getFontName(item),
          value: item,
        }
      : item
  }),
  curr: {},
})

const selectData = (v) => {
  family.curr = family.familylist.find((item) => item.value === v) || {}
  console.log(v, family.curr)
  loadFonts(family.curr)
}

const fonts = document.fonts

function loadFonts(obj = {}) {
  console.log('obj', obj)
  const font = new FontFace(obj.label, 'url(' + obj.value + ')')
  font
    .load()
    .then((res) => {
      fonts.add(font)
      styleObj.fontFamily = obj.label
      family.curr = obj
    })
    .catch((err) => {
      alert('字体加载错误！')
      console.error(err)
    })
}

const formatStr = (val, col) => {
  const Arr = ['。', '，', '”', '》', '！', '？', ',', '.', '?', '!']
  const str = []
  console.log('===col', col)
  val.split('').map((v, i) => {
    if (Arr.includes(v) && !(str.length % col) && val.length > col) {
      str[str.length - 1] = str[str.length - 1] + v
    } else {
      str.push(v)
    }
  })
  return str
}

// 字符串分页处理，每个字符串编号

const pageArr = (arr, col = 5, row = 5) => {
  const pageAll = [[]]
  arr.forEach((item, index) => {
    const pageIndex = Math.floor(index / (row * col))
    pageAll[pageIndex]
      ? pageAll[pageIndex].push(item)
      : (pageAll[pageIndex] = [item])
  })
  pageAll[pageAll.length - 1].length = row * col
  return pageAll
}

// 单元格处理

const my = computed(() => (v = '') => v.split(''))

const getPage = (val, col, row) => {
  const newval = formatStr(val, col)
  return pageArr(newval, col, row)
}
const mycon = ref(content)

const PAGEWIDTH = 18
const PAGEHEIGHT = 26
const GAP = 0.2

const row = ref(4)

const col = ref(11)

const abc = computed(() => {
  const itemWidth = PAGEWIDTH / col.value
  styleObj.gridTemplateColumns =
    'repeat(' + col.value + ', ' + itemWidth + 'cm)'
  row.value = Math.floor(PAGEHEIGHT / (itemWidth * 2 + GAP))
  styleObj.gridTemplateRows =
    'repeat(' + row.value + ', ' + itemWidth * 2 + 'cm)'
  styleObj.font = itemWidth * 0.618 + 'cm/' + itemWidth + 'cm arial'
  return getPage(mycon.value, col.value, row.value)
})

const styleObj = reactive({
  gridTemplateColumns: 'repeat(5, 20%)',
  gridTemplateRows: 'repeat(4, 25%)',
  font: '',
})

loadFonts(family.familylist[0])
</script>

<style lang="scss">
.subtitle {
  font: 18px/1.6 arial;
}
.uline {
  content: '';
  display: inline-block;
  border-bottom: 3px solid #333;
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

.dl {
  padding: 10px;
}

.page {
  width: 210mm;
  height: 297mm;
  page-break-after: always;
  text-align: center;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);
  margin-bottom: 10px;
}

.mheader {
  max-width: 18.4cm;
  padding: 0.5cm 0;
  margin: auto;
}
.mfooter {
  max-width: 18.4cm;
  margin: auto;
}

.con {
  margin: auto;
  border: 3px solid #000;
  overflow: hidden;
  position: relative;
  display: inline-grid;
  padding: 10px;
  grid-gap: 0.2cm 0;
}
.con li {
  display: block;
}

.layout {
  display: flex;

}
.main {
  width: 22cm;
  height: 100vh;
  overflow-y: auto;
}
.aside {
  background: #eee;
  width: calc(100% - 22cm);
  height: 100vh;
}
@media print {
  .dl {
    padding: 0;
  }

  .page {
    border-bottom: 0px solid #000;
    // box-shadow: unset;
    box-shadow: unset;
    page-break-after: always;
  }
  .aside {
    display: none;
  }
}
</style>
