import { h } from 'vue'
import '../assets/css/test.css'
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  render() {
    return h('input', {
      onClick: $target => {
        console.log($target)},
      modelValue: this.modelValue,
      'onUpdate:modelValue': value => this.$emit('update:modelValue', value)
    })
  }
}
