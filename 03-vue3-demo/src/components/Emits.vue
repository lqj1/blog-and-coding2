<template>
  <div @click="$emit('click')">
    <button>自定义事件</button>
  </div>
</template>

<script>
export default {
  emits: ['click'],
}
</script>

<style lang="scss" scoped>

</style>