import { createApp, h } from 'vue'
import App from './App.vue'
import fInput from './components/f-input.vue'
import fTd from './components/f-td.vue'
const app = createApp(App)
app.component('f-input', fInput)
app.component('f-td', fTd)

app.directive('last', {
  mounted(el) {

    // Focus the element

    const text = el.innerText
    const eleft = el.offsetLeft
    const Arr = ['。', '，', '《', '》', '！', '？', ',', '.', '?', '!', '、']
    console.log(text, eleft, !eleft, Arr.includes(text))
    if (!eleft && Arr.includes(text)) {
      el.classList = ['isLast']
      console.log(text, eleft)
    }
  }

})

app.component('button-counter', {
  data() {
    return {
      count: 0
    }
  },

  render() {
    return h('button', {
      onClick: () => this.count++
    }, `You clicked me ${ this.count } times.`)
  }

})
app.mount('#app')
