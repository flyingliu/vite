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
              <f-td :text="t" :border-color="data.color"></f-td>
            </li>
          </ul>
          <footer class="mfooter">
            <ul>
              <li :style="{color: data.color}">
                {{ col }} * {{ row }} = {{ col * row }} |
                {{ (styleObj.itemWidth * 10).toFixed(1) }} MM *
                {{ (styleObj.itemWidth * 10).toFixed(1) }} MM
              </li>
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
    <el-form-item label="其他设置：">
      <div class="oset">
        <el-color-picker
          title="背景色"
          v-model="data.color"
          show-alpha
          :predefine="predefineColors"
          size="small"
        ></el-color-picker>

        <el-color-picker
          title="字体颜色"
          v-model="data.colorFont"
          show-alpha
          :predefine="predefineColors"
          size="small"
        ></el-color-picker>
      </div>
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

const SCALE = 0.72


const content = `  庆历四年春，滕子京谪守巴陵郡。越明年，政通人和，百废具兴，乃重修岳阳楼，增其旧制，刻唐贤今人诗赋于其上，属予作文以记之。
予观夫巴陵胜状，在洞庭一湖。衔远山，吞长江，浩浩汤汤，横无际涯，朝晖夕阴，气象万千，此则岳阳楼之大观也，前人之述备矣。然则北通巫峡，南极潇湘，迁客骚人，多会于此，览物之情，得无异乎？
若夫淫雨霏霏，连月不开，阴风怒号，浊浪排空，日星隐曜，山岳潜形，商旅不行，樯倾楫摧，薄暮冥冥，虎啸猿啼。登斯楼也，则有去国怀乡，忧谗畏讥，满目萧然，感极而悲者矣。
至若春和景明，波澜不惊，上下天光，一碧万顷，沙鸥翔集，锦鳞游泳，岸芷汀兰，郁郁青青。而或长烟一空，皓月千里，浮光跃金，静影沉璧，渔歌互答，此乐何极！登斯楼也，则有心旷神怡，宠辱偕忘，把酒临风，其喜洋洋者矣。
嗟夫！予尝求古仁人之心，或异二者之为，何哉？不以物喜，不以己悲，居庙堂之高则忧其民，处江湖之远则忧其君。是进亦忧，退亦忧。然则何时而乐耶？其必曰“先天下之忧而忧，后天下之乐而乐”乎！噫！微斯人，吾谁与归？
时六年九月十五日。`

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

function loadFonts(obj = {}) {
  const fonts = document.fonts
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

const data = reactive({
  name: mycon.value,
  region: '122',
  date1: '',
  date2: '',
  delivery: false,
  color: '#999',
  colorFont: '#000',
  type: [],
  resource: '',
  desc: 'dd',
})

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
  styleObj.font = itemWidth * SCALE + 'cm/' + itemWidth + 'cm arial'
  styleObj.itemWidth = itemWidth
  styleObj.color = data.colorFont
  styleObj.borderColor = data.color
  return getPage(mycon.value, col.value, row.value)
})

const styleObj = reactive({
  gridTemplateColumns: 'repeat(5, 20%)',
  gridTemplateRows: 'repeat(4, 25%)',
  font: '',
  itemWidth: '',
  color: '',
  borderColor: ''
})

loadFonts(family.familylist[0])


</script>

<style lang="scss"></style>
