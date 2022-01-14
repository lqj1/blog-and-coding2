<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from './components/HelloWorld.vue'
import { defineComponent } from 'vue'
import Comp from './components/Comp.vue'
import CompSetup from './components/CompSetup.vue'
</script>
<script lang="ts">
export default defineComponent({
  name: 'App',
});
</script>
<template>
  <img alt="Vue logo"
       src="./assets/logo.png" />
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <CompSetup :title-info="{value: '待办事项2', color:'green'}"></CompSetup>
  <Comp :title-info="{value: '待办事项1', color:'blue'}"></Comp>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
