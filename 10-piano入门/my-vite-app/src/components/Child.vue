<template>
  <h1>我是child组件</h1>
  <p>姓名：{{ name }}</p>
  <p>年龄：{{ age }}</p>
  <p>性别：{{ sex }}</p>
</template>

<script setup lang="ts">
import { useUsersStore } from '../store/user';
import { storeToRefs } from 'pinia';
const store = useUsersStore()
// const { name, age, sex } = store
const { name, age, sex } = storeToRefs(store)

</script>

<style scoped>

</style>