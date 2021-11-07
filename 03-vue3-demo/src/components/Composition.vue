<template>
  <div>
    <p>counter: {{counter}}</p>
    <p>double: {{ doubleCounter}}</p>
    <p>msg2: {{msg2}}</p>
    <p ref="desc"></p>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted, onUnmounted, toRefs, watch } from 'vue'
export default {
  setup () {
    // counter相关的模块
    const { counter, doubleCounter } = useCounter()
    // 使用元素引用
    const desc = ref(null)
    // 侦听器
    watch(counter, (val, olaVal) => {
      const p = desc.value
      p.textContent = `counter change from ${olaVal} to ${val}`
    })
    const msg2 = ref('some message')
    return { counter, doubleCounter, msg2, desc }
  }
}
function useCounter () {
  const data = reactive({
    counter: 1,
    doubleCounter: computed(() => data.counter * 2)
  })
  let timer
  onMounted(() => {
    timer = setInterval(() => {
      data.counter++
    }, 1000);
  })
  onUnmounted(() => {
    clearInterval(timer)
  })
  // 将reactive中每一个变成ref，这样在调用的时候就可以解构出来
  return toRefs(data)
}
</script>

<style lang="scss" scoped>

</style>