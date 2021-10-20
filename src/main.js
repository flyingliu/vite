import { createApp } from 'vue'
import App from './App.vue'

// import fInput from './components/f-input.vue'
// import fTd from './components/f-td.vue'

import router from './router'
const app = createApp(App)
app.use(router)
// app.component('f-input', fInput)
// app.component('f-td', fTd)

// app.directive('last', {
//   mounted(el) {

//     // Focus the element

//     const text = el.innerText
//     const eleft = el.offsetLeft
//     const Arr = ['。', '，', '《', '》', '！', '？', ',', '.', '?', '!', '、']
//     console.log(text, eleft, !eleft, Arr.includes(text))
//     if (!eleft && Arr.includes(text)) {
//       el.classList = ['isLast']
//       console.log(text, eleft)
//     }
//   }

// })

app.mount('#app')
