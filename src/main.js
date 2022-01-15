import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
// import './assets/css/index.scss'
import ElementPlus from 'element-plus'
import '/@/assets/js/color-thief.js'
import router from './router'
const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.component('button-counter', {
  data() {
    return {
      count: 0
    }
  },
  template: `
    <button @click="count++">
      You clicked me {{ count }} times.
    </button>`
})
app.mount('#app')
