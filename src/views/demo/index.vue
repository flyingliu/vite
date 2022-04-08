<template>
  <div>
    abc
  </div>
</template>

<script setup>
import { Cache } from '~/assets/js/util.js'
import { getCurrentInstance } from 'vue'

const api = {
  good: () => {

      return new Promise((res, rej) => {
        return rej({
          code: 404,
          data: {
            name: 'flying',
          },
          msg: 'success',
        })
      })
    }
}

const instance = getCurrentInstance()

const _this = instance.appContext.config.globalProperties

const cache = new Cache(_this, { api })

cache.api('good', {}).then((res) => {
  console.log(
    '%c [ res ]-34',
    'font-size:13px; background:pink; color:#bf2c9f;',
    res
  )
}).catch(err=>{
  console.log('%c [ err ]-39', 'font-size:13px; background:pink; color:#bf2c9f;', err)
  
})
</script>

<style lang="scss" scoped></style>
