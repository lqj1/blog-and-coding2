<template>
  <div class="ec-panel">
  girl {{ item }}
  </div>

  <form-create
    v-model="child.actPartRuleForm"
    :rule="child.fields"
    :option="option"
    label-width="120px"
    :ref="child.actPartRuleRef"
  >
    <template v-slot:type-file-upload="scope" >
      <file-upload :scope="scope"></file-upload>
    </template>
    <template v-slot:type-img-uploda="scope" >
      <img-upload :scope="scope"></img-upload>
    </template>
    <template v-slot:type-file="scope" >
      <multi-img-upload :scope="scope"></multi-img-upload>
    </template>
  </form-create>



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