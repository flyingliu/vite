<template>
  <el-form-item label="字体设置">
    <div class="cc">
      <el-select
        placeholder="please select your zone"
        @change="selectData"
        v-model="props.state.fontFamily"
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
      <el-button size="small" type="primary" plain>本地字体</el-button>
      </el-upload>
      <el-button v-if="!family.isComputerFontsLoads" size="small" type="primary" plain @click="initComputerFonts">本机字体</el-button>

    </div>
  </el-form-item>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { getFontName, familyList } from '/@/assets/js/util'

const props = defineProps(['state'])

const family = reactive({
  isComputerFontsLoads: false,
  familylist: familyList.map((item) => {
    return typeof item === 'string'
      ? { label: getFontName(item), value: item, isLoad: false }
      : item
  }),
})

async function requestPremission(){
  const { state } = await navigator.permissions.query({name: "local-fonts"})
  console.log(state)
  if (state === 'granted') {
    initComputerFonts();
  }
}

function isChinese(str) {
	var filter = /[\u4E00-\u9FA5\uF900-\uFA2D]{1,}/
  return filter.test(str)
}

async function initComputerFonts() {
  const fonts = await queryLocalFonts()
  if(fonts.length) {
    family.isComputerFontsLoads = true
    const ff = fonts.filter(v=>isChinese(v.fullName))
    ff.forEach(v=>{
      const fs = family.familylist.map(v=>v.label)
      if(!fs.includes(v.fullName)) {
        family.familylist.push({
          label: v.fullName,
          value: v.family,
          isLoad: true
        })
      }
    })
  } else {
    alert('请配置本机字体访问权限')
  }
}

const selectData = (v) => {
  const curr = family.familylist.find((item) => item.value === v)
  curr && loadFonts(curr)
}

const addLocalFont = (file) => {
  const url = window.URL.createObjectURL(file.raw)
  const label = getFontName(file.name)
  const list = family.familylist
  if (list.find((v) => v.label != label)) {
    list.push({ value: url, label, isLoad: false })
  }
  loadFonts(list.find((v) => v.label == label))
}

function loadFonts(obj = {}) {
  if(obj.isLoad) {
    props.state.fontFamily = obj.label
  } else {
    const fonts = document.fonts
    const font = new FontFace(obj.label, 'url(' + obj.value + ')')
    font
      .load()
      .then((res) => {
        fonts.add(font)
        props.state.fontFamily = obj.label
        obj.isLoad = true
        return obj
      })
      .catch((err) => {
        alert('字体加载错误！')
        console.error(err)
      })
  }

}


// 生命周期钩子
onMounted(() => {
  requestPremission()
  loadFonts(family.familylist[0])
})
</script>


