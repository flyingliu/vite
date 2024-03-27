<template>
  <el-form ref="form" label-position="top" label-width="120px">
    <h5 class="subtitle"><span class="uline">打印设置</span></h5>
    <el-form-item label="内容设置：">
      <el-input
        type="textarea"
        v-model="mycon"
        :autosize="{ minRows: 4, maxRows: 6 }"
        style="margin-bottom:10px;"
      ></el-input>
      <el-input
        type="text"
        size="small"
        v-model="state.subcon"
      ></el-input>
    </el-form-item>



    <s-fonts ref="sFonts" :state="state"></s-fonts>

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
        <el-color-picker
          v-model="state.color"
          show-alpha
          :predefine="predefineColors"
          size="small"
        ></el-color-picker>

        <el-color-picker
          v-model="state.colorFont"
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
</template>

<script setup>
import { reactive, toRefs, ref, computed } from 'vue'
import sFonts from '/@/components/s-fonts.vue'


const SCALE = 0.72

const styleObj = computed(() => ({
  gridTemplateColumns: 'repeat(' + (state.col + 1) + ', ' + state.size + 'cm)',
  gridTemplateRows: 'repeat(' + state.row + ', ' + state.size + 'cm)',
  font: state.size * SCALE + 'cm/' + state.size + 'cm \'' + state.fontFamily,
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
  subcon: '二零二一年十月 某某',
  row: 14,
  col: 4,
  size: 1.6,
  font: '',
  fontFamily: '',
  color: '#666',
  colorFont: '#000',
  class: '',
  styleObj,
  lastItem,
})

let emit = defineEmits(['getGrid'])

const fn = () => emit('getGrid', state)

const print = () => window.print()

const init = () => {
 
  fn()
}

init()
</script>

<style class="scss">
.oset {
  display: flex;
  gap: 5px;
}
</style>
