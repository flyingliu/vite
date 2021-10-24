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
            <ul>
              <li>{{col}} * {{row}} = {{ col * row}} | {{(styleObj.itemWidth * 10).toFixed(1)}} MM * {{(styleObj.itemWidth * 10).toFixed(1)}} MM</li>
              <li>字体：{{family.curr.label}}</li>
              
            </ul>
            
          </footer>
        </dd>
      </dl>
    </main>
    <aside class="aside">
      <el-form
        ref="form"
        :model="data"
        label-position="top"
        label-width="120px"
      >
        <h5 class="subtitle"><span class="uline">打印设置</span></h5>
        <el-form-item label="内容设置：">
          <el-input
            type="textarea"
            v-model="mycon"
            :autosize="{ minRows: 4, maxRows: 6 }"
          ></el-input>
        </el-form-item>
        <el-form-item label="字体设置">
          <div class="cc">
            <el-select
              placeholder="please select your zone"
              @change="selectData"
              v-model="styleObj.fontFamily"
              size="small"
            >
              <el-option
                v-for="item in family.familylist"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
            <el-upload
              class="upload-demo"
              action="#"
              :on-change="handleChange"
              :http-request="() => {}"
              :file-list="[]"
              :show-file-list="false"
            >
              <el-button size="small" type="primary" plain
                >加载本地字体</el-button
              >
            </el-upload>
          </div>
        </el-form-item>

        <el-form-item label="列数设置：">
          <el-slider v-model="col" :max="25" :min="3"></el-slider>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="print" size="small">打印</el-button>
        </el-form-item>
      </el-form>
    </aside>
  </div>
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
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
  console.log('v')
}

const print = () => {
  window.print()
}

const handleChange = (file) => {
  console.log('+++', file)
  const url = window.URL.createObjectURL(file.raw)
  const label = getFontName(file.name)
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
      console.log('obj++', obj)
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
  styleObj.itemWidth = itemWidth
  return getPage(mycon.value, col.value, row.value)
})

const styleObj = reactive({
  gridTemplateColumns: 'repeat(5, 20%)',
  gridTemplateRows: 'repeat(4, 25%)',
  font: '',
  itemWidth: ''
})

loadFonts(family.familylist[0])

const data = reactive({
  name: mycon.value,
  region: '122',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: 'dd',
})
</script>

<style lang="scss">
$c: #395260;
.cc {
  display: flex;
  align-items: center;
  gap: 10px;
}

.el-form--label-top {
  .el-form-item__label {
    position: relative;
    padding: 0 0 0px 0;
    font-weight: bold;
    &::after {
      width: 4em;
      height: 0px;
      position: absolute;
      content: '';
      background: $c;
      left: 0;
      bottom: 10px;
    }
  }
}

.subtitle {
  font: 18px/1.6 arial;
  padding-bottom: 20px;
  .uline {
    content: '';
    display: inline-block;
    border-bottom: 3px solid #333;
  }
}

.sidelist {
  text-align: left;
  li {
    padding: 0px 20px 20px;
  }
}

.label {
  padding: 0 0 10px 0;
  display: inline-block;
}

.dl {
  padding: 10px;
  margin: auto;
  .page {
    width: 21cm;
    height: 297mm;
    page-break-after: always;
    text-align: center;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);
    margin: 10px auto 30px;

    .mheader {
      max-width: 18.4cm;
      padding: 0.5cm 0;
      margin: auto;
      height: 1.5cm;
      box-sizing: border-box;
      h1 { display: none;}
    }
    .mfooter {
      max-width: 18.4cm;
      margin: auto;
      padding: 10px 0 0 0;
      ul {
        display: flex;
        font-size: 12px;
        gap: 10px;
        justify-content: space-between;
      }
    }
  }
}

.con {
  margin: auto;
  border: 3px solid #000;
  overflow: hidden;
  position: relative;
  display: inline-grid;
  padding: 10px;
  grid-gap: 0.2cm 0;
  li {
    display: block;
  }
}

.layout {
  display: flex;
  .main {
    width: 22cm;
    height: 100vh;
    overflow-y: auto;
  }
  .aside {
    background: #eee;
    width: calc(100% - 22cm);
    height: 100vh;
    padding: 20px;
    box-sizing: border-box;
  }
}

@media print {
  .layout {
    display: flex;
    .main {
      width: 100%;
      text-align: center;
      height: unset;
    }
    .aside {
      display: none;
    }
  }
  .dl {
    padding: 0;
    margin: auto;
    .page {
      border-bottom: 0px solid #000;
      box-shadow: unset;
      page-break-after: always;
      margin: 0;
    }
  }

  .aside {
    display: none;
  }
}
</style>
