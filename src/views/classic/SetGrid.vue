<template>
  <el-form ref="form" label-position="top" label-width="120px">
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
          v-model="state.font"
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
          :on-change="addLocalFont"
          :http-request="() => {}"
          :file-list="[]"
          :show-file-list="false"
        >
          <el-button size="small" type="primary" plain>加载本地字体</el-button>
        </el-upload>
      </div>
    </el-form-item>

    <!-- <el-form-item label="单元格尺寸：">
      <el-slider
        v-model="state.size"
        :max="5"
        :min="0.5"
        step="0.1"
        :marks="marks"
      ></el-slider>
    </el-form-item> -->

    <el-form-item label="列数：">
      <el-slider v-model="state.col" :max="25" :min="3"></el-slider>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="print" size="small">打印</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { getFontName, familyList } from '/@/assets/js/util'

import { reactive, toRefs, ref, computed } from 'vue'
const PAGEWIDTH = 18
const PAGEHEIGHT = 26
const GAP = 0.2

const family = reactive({
  familylist: familyList.map((item) => {
    return typeof item === 'string'
      ? {
          label: getFontName(item),
          value: item,
        }
      : item
  }),
})

const selectData = (v) => {
  const curr = family.familylist.find((item) => item.value === v)
  curr && loadFonts(curr)
}

const addLocalFont = (file) => {
  const url = window.URL.createObjectURL(file.raw)
  const label = getFontName(file.name)
  const list = family.familylist
  if (list.find((v) => v.label != label)) {
    list.push({ value: url, label })
  }
  loadFonts(list.find((v) => v.label == label))
}

function loadFonts(obj = {}) {
  const fonts = document.fonts
  const font = new FontFace(obj.label, 'url(' + obj.value + ')')
  font
    .load()
    .then((res) => {
      fonts.add(font)
      state.font = obj.label
      return obj
    })
    .catch((err) => {
      alert('字体加载错误！')
      console.error(err)
    })
}

const styleObj = computed(() => ({
  font: state.size * 0.618 + 'cm/' + state.size + 'cm ' + state.font,
}))

const item = computed(() => ({
  width: state.size + 'cm',
  height: state.size + 'cm',
}))

const mycon = ref(
  `孤山寺北贾亭西水面初平云脚低几处早莺争暖树谁家新燕啄春泥乱花渐欲迷人眼浅草才能没马蹄最爱湖东行不足绿杨阴里白沙堤`
)

const marks = {
  1: '1CM',
  1.4: '1.4',
  2: '2CM',
  3: '3CM',
}

function chunk(arr, size) {
  return Array.from({
    length: Math.ceil(arr.length / size),
  }).map((item, index) => arr.slice(index * size, (index + 1) * size))
}

const content = computed(() => {
  let len = state.row
  let str = mycon.value
  let arr = chunk(str, len)
  return arr.filter(Boolean).map((item) => {
    let itemArr = item.split('')
    return itemArr.length >= len
      ? itemArr.splice(0, len)
      : [...itemArr, ...Array(len - itemArr.length).fill('')]
  })
})

const row = computed(() => Math.floor(PAGEHEIGHT / state.size))
const size = computed(() => PAGEWIDTH / state.col)

const state = reactive({
  col: 12,
  content,
  row,
  size,
  font: '',
  styleObj,
  item,
})

let emit = defineEmits(['getGrid'])

const fn = () => emit('getGrid', state)

const print = () => window.print()

const init = () => {
  loadFonts(family.familylist[0])
  fn()
}

init()
</script>

<style class="scss"></style>
