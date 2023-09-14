<template>
  <div class="container">
    <div v-for="n in 100" :key="n">
      <!-- 在渲染组件的时候，我们可以利用 defer 函数来进行 if 判断 -->
      <!-- <Test></Test> -->
      <Test v-if="defer(n)"></Test>
    </div>
  </div>
</template>

<script setup>
import Test from './Test.vue';
// 导入一个我已经写好的函数
import { useDeferFrame } from './useDeferFrame.js';
// 这个函数返回一个方法
const defer = useDeferFrame();
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(4, 20%);
  grid-gap: 5px;
}
</style>