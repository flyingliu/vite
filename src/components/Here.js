import { h, ref, reactive } from 'vue'
import child from './Kinput'
import '../assets/css/test.css'

export default {
  setup() {
    const readersNumber = ref(0)
    const book = reactive({ title: 'Vue 3 Guide' })
    // 请注意，我们需要在这里显式地使用 ref 值
    return () => h('div', {
      class: 'abc',
      onClick: function () {
        console.log('book.title', book.title, this)
    }}, [h(child), h(child)])
  }
}
