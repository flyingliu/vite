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
      <el-button @click="reset" size="small">重置</el-button>
      <el-button type="primary" @click="autoPlay" size="small">{{
        isAutoPlay ? '暂停播放' : '自动播放'
      }}</el-button>

      <el-input-number
        v-model="state.repeat"
        :min="1"
        :max="6"
        size="small"
        style="width:100px; margin: 0 10px;"
      />
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

const setBg = (item) => {
  item = item || contentList.value[0]
  imageSimilarityValue(item.httpImg, BOUNDING).then((res) => {
    state.colors = res.colors
    console.log(state.colors)
  })
}

const PAGEWIDTH = 18
const PAGEHEIGHT = 26
const GAP = 0.2
const SCALE = 0.75

const mycon = ref(null)
const content = ref([])
const isAutoPlay = ref(false)
const addText = (item, isAutoPlay) => {
  if (isAutoPlay) {
    reset()
    item.active = true
    content.value = [item]
    return false
  }
  if (!item.active) {
    item.active = true
    content.value.push(item)
  } else {
    item.active = false
    content.value = content.value.filter((v) => v !== item)
  }

  setBg(item)
}

const currIndex = ref(0)
const PLAYITEM = 2000
let timer

const autoPlay = () => {
  if (isAutoPlay.value) {
    isAutoPlay.value = false
    clearInterval(timer)
    return
  }

  isAutoPlay.value = true

  const len = contentList.value.length - 1

  timer = setInterval(() => {
    if (currIndex.value < len) {
      addText(contentList.value[currIndex.value], true)
      currIndex.value++
    } else {
      currIndex.value = 0
    }
    console.log('currIndex.value', currIndex.value)
  }, PLAYITEM * state.repeat)
}

;[0, 1].forEach((i) => addText(contentList.value[i]))

const item = computed(() => ({
  width: state.size + 'cm',
  height: state.size + 'cm',
  fontSize: state.size + 'cm',
  color: state.color,
}))

const reset = () => {
  contentList.value.forEach((v) => (v.active = false))
  content.value = []
}

const row = computed(() => Math.floor(PAGEHEIGHT / state.size))
const size = computed(() => PAGEWIDTH / (content.value.length || 1))

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
