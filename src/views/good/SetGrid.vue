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

    <el-form-item label="单元格尺寸：">
      <el-slider
        v-model="state.size"
        :max="5"
        :min="0.5"
        step="0.1"
        :marks="marks"
      ></el-slider>
    </el-form-item>

    <el-form-item label="列数：">
      <el-slider v-model="state.col" :max="25" :min="3"></el-slider>
    </el-form-item>

    <el-form-item label="行数：">
      <el-slider v-model="state.row" :max="25" :min="3"></el-slider>
    </el-form-item>
    <el-form-item label="其他设置：">
      <div class="oset">
        <el-color-picker v-model="state.color" size="small"></el-color-picker>
        <el-select
          v-model="state.class"
          clearable
          placeholder="请选择"
          size="small"
        >
          <el-option
            v-for="item in [{ label: 'ss', value: 'aa' }]"
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
import { getFontName, familyList } from '/@/assets/js/util'

import { reactive, toRefs, ref, computed } from 'vue'

const SCALE = 0.72

const family = reactive({
  familylist: familyList.map((item) => {
    return typeof item === 'string'
      ? { label: getFontName(item), value: item }
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
  gridTemplateColumns: 'repeat(' + (state.col + 1) + ', ' + state.size + 'cm)',
  gridTemplateRows: 'repeat(' + state.row + ', ' + state.size + 'cm)',
  font: state.size * SCALE + 'cm/' + state.size + 'cm ' + state.font,
}))

const lastItem = computed(() => ({
  gridRowEnd: state.row + 1,
}))

const mycon = ref(
  `孤山寺北贾亭西水面初平云脚低几处早莺争暖树谁家新燕啄春泥乱花渐欲迷人眼浅草才能没马蹄最爱湖东行不足绿杨阴里白沙堤
相见时难别亦难，东风无力百花残。春蚕到死丝方尽，蜡炬成灰泪始干。晓镜但愁云鬓改，夜吟应觉月光寒。蓬山此去无多路，青鸟殷勤为探看。`
)

const marks = {
  1: '1CM',
  1.4: '1.4',
  2: '2CM',
  3: '3CM',
}

const content = computed(() => {
  let str = mycon.value
  let arr = str.split('\n')
  let reg = /\p{Unified_Ideograph}/gu
  let len = state.row * state.col
  return arr.filter(Boolean).map((item) => {
    let itemArr = item.match(reg)
    return itemArr.length >= len
      ? itemArr.splice(0, len)
      : [...itemArr, ...Array(len - itemArr.length).fill('')]
  })
})

const state = reactive({
  content,
  row: 14,
  col: 4,
  size: 1.6,
  font: '',
  color: '#333333',
  class: '',
  styleObj,
  lastItem,
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

<style class="scss">
.oset {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
}
</style>
