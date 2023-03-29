<template>
  <div class="ec-panel">
  girl {{ item }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const imageURL = "https://www.eveningwater.com/my-web-projects/js/26/img/";
const imageItems = [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg',
]
const currentIndex = ref(0)
</script>

<style lang="less" scoped>

</style>