<template>
  <el-form ref="form" label-position="top" label-width="120px">
    <h5 class="subtitle"><span class="uline">打印设置</span></h5>
    <el-form-item label="内容设置：">
      <ul class="contentList">
        <li
          v-for="v in contentList"
          :key="v.number"
          @click="addText(v)"
          :class="{ active: v.active }"
        >
          {{ v.label }}
        </li>
      </ul>

    </el-form-item>

    <el-form-item label="其他设置：">
      <div class="oset">
        <el-color-picker
          title="背景色"
          v-model="state.color"
          show-alpha
          :predefine="predefineColors"
          size="small"
        ></el-color-picker>


        <el-input-number
          v-model="state.repeat"
          :min="1"
          :max="6"
          size="small"
          style="width:100px;"
        />
        <el-select
          v-model="state.icon"
          clearable
          placeholder="请选择"
          size="small"
          style="width:120px;"
        >
          <el-option
            v-for="item in iconList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="print" size="small">打印</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { getFontName, familyList, sortBy } from '/@/assets/js/util'

import { reactive, toRefs, ref, computed } from 'vue'
import list from '/@/assets/js/jizhiwengao'
import { imageSimilarityValue } from '/@/assets/js/image-similarity'
const BASE = '/data/jizhiwengao/'
const BOUNDING = [10, 10, 300, 100]
const contentList = ref(
  list
    .map((v) => {
      const item = v.split('.')[0].split('_')
      return {
        label: item[1],
        value: v,
        number: +item[0],
        httpImg: BASE + v,
        active: false,
      }
    })
    .sort(sortBy('number', true))
)

imageSimilarityValue(contentList.value[0].httpImg, BOUNDING).then((res) => {

  state.colors = res.colors
  console.log(state.colors)
})

const PAGEWIDTH = 18
const PAGEHEIGHT = 26
const GAP = 0.2
const SCALE = 0.75

const mycon = ref(null)
const selectContent = (v) => {
  mycon.value = list[v]
}

const addText = (item) => {
  item.active = !item.active
}

[0,1].forEach(i=>addText(contentList.value[i]))



const item = computed(() => ({
  width: state.size + 'cm',
  height: state.size + 'cm',
  fontSize: state.size + 'cm',
  color: state.color
}))




const content = computed(() => {
  return contentList.value.filter(v=>v.active)
})

const row = computed(() => Math.floor(PAGEHEIGHT / state.size))
const size = computed(() => PAGEWIDTH / state.repeat)

const state = reactive({
  col: 1,
  content,
  row,
  size,
  font: '',
  item,
  color: 'rgba(0,0,0,.5)',
  repeat: 2,
  colors: [],
  icon: 'icon1',
})

const print = () => window.print()



const predefineColors = ref([
  '#e00',
  '#ff8c00',
  '#ffd700',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#000',
])

const iconList = [
  {
    label: '带点米字格',
    value: 'icon1',
  },
  {
    label: '十字格',
    value: 'icon2',
  },
  {
    label: '米字格',
    value: 'icon3',
  },
]

defineExpose({
  state,
})


</script>

<style lang="scss" scoped>
.contentList {
  display: flex;
  flex-flow: row wrap;
  gap: 2px;
  li {
    border: 1px solid #ccc;
    width: 22px;
    height: 22px;
    display: block;
    text-align: center;
    font: 14px/22px arial;
    cursor: pointer;
    &.active {
      background: #333;
      color: #fff;
    }
  }
}
.oset {
  display: flex;
  gap: 5px;
}
</style>
