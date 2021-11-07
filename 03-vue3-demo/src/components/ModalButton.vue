<template>
  <div>
    <button @click="modalOpen=true">弹出模态窗口</button>
    <!-- 要传送的dom -->
    <teleport to="body">
      <div v-if="modalOpen"
           class="modal">这是一个弹窗，我的父元素是body</div>
      <button @click="modalOepn=false"></button>
    </teleport>
  </div>
</template>

<script>
export default {
  data () {
    return {
      modalOpen: true
    }
  },
  setup () {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>