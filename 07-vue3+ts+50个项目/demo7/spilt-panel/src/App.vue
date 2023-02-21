<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import { computed } from '@vue/reactivity'
import { ref } from 'vue'
import Title from './components/Title.vue'

const BASE_URL = "https://eveningwater.com/my-web-projects/js/65/images/";
const splitList = [
   {
      text:"Shirahoshi",
      type:"left",
      href:"https://baike.baidu.com/item/%E7%99%BD%E6%98%9F/34180?fromtitle=%E7%99%BD%E6%98%9F%E5%85%AC%E4%B8%BB&fromid=4377673&fr=aladdin"
   },
   {
     text:"Zanilia",
     type:"right",
     href:"https://baike.baidu.com/item/%E8%B5%B5%E4%B8%BD%E9%A2%96/10075976?fr=aladdin"
   }
] 
const getPanelBg = computed(()=>(type:string) => `url(${BASE_URL + type + '.png'})`)
const parentClass = ref('')
const onMouseEnterHandler = (type: string) => {
  parentClass.value = 'hover-' + type;
}
const onMouseLeaveHandler = () => {
  parentClass.value = '';
}
</script>

<template>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" /> -->
  <div class="sp-container" :class="parentClass">
    <div class="sp-panel"
      v-for="(item,index) in splitList"
      :key="item.type + index"
      :class="`sp-${item.type}-panel`"
      :style="{backgroundImage: getPanelBg(item.type)}"
      @mouseenter="onMouseEnterHandler(item.type)"
      @mouseleave="onMouseLeaveHandler"
    >
      <!-- <Title class="sp-title" level="3">the {{ item.type }} panel</Title> -->
      <a :href="item.href" target="_blank" rel="noopener noreferrer" class="sp-link"> {{ item.text }} </a>
    </div>
  </div>

</template>

<style scoped>

</style>
