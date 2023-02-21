<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import lqjInput from './components/lqj-input.vue';
</script>

<template>
    <lqj-input></lqj-input>
</template>

<style lang="less">

@body_bg_color_1:#95b4e4;
@body_bg_color_2:#79abf5;

body {
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg,@body_bg_color_1 10%,@body_bg_color_2 90%);
  .app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
}
</style>

