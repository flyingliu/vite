<template>
  <el-form ref="form" label-position="top" label-width="120px">
    <h5 class="subtitle"><span class="uline">打印设置</span></h5>
    <el-form-item label="内容设置：">
      <el-input
        type="textarea"
        v-model="mycon"
        :autosize="{ minRows: 4, maxRows: 6 }"
      ></el-input>
      <el-select
        placeholder="please select your zone"
        @change="selectContent"
        v-model="currCon"
        size="small"
      >
        <el-option
          v-for="item in contentList"
          :value="item.value"
          :label="item.label"
        ></el-option>
      </el-select>
    </el-form-item>

    <s-fonts ref="sFonts" :state="state"></s-fonts>

    <el-form-item label="列数：">
      <el-slider v-model="state.col" :max="25" :min="3"></el-slider>
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

        <el-input-number
          v-model="state.repeat"
          :min="1"
          :max="state.col"
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
import { reactive, toRefs, ref, computed } from 'vue'
import list from '/@/assets/js/shengzi'
import sFonts from '/@/components/s-fonts.vue'


const contentList = Object.keys(list).map((key) => ({
  label: key,
  value: key,
}))

const PAGEWIDTH = 18
const PAGEHEIGHT = 26
const GAP = 0.2
const SCALE = 0.75


const currCon = ref('古诗二首')
const selectContent = (v) => {
  mycon.value = list[v]
}




const styleObj = computed(() => ({
  font: state.size * SCALE + 'cm/' + state.size + 'cm ' + state.fontFamily,
}))

const item = computed(() => ({
  width: state.size + 'cm',
  height: state.size + 'cm',
}))

const mycon = ref(list[currCon.value])

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
  fontFamily: '',
  styleObj,
  item,
  color: '#e00',
  colorFont: '#000',
  repeat: 6,
  icon: 'icon0',
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
    label: '混合格子',
    value: 'icon0',
  },
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

<style class="scss" scoped>
.oset {
  display: flex;
  gap: 5px;
}
</style>
