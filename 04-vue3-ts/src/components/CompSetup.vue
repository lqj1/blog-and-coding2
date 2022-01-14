<template>
  <!-- 标题 -->
  <h1 :style="{ backgroundColor: titleInfo.color }">{{ titleInfo.value }}</h1>
  <div>counter: {{ counter }}</div>
  <div>double-counter: {{ doubleCounter }}</div>
  <!-- 新增待办 -->
  <input type="text"
         v-model="todoName"
         @keydown.enter="addTodo(newTodo(todoName))" />
  <!-- 待办事项列表 -->
  <div v-for="item in items"
       :key="item.id">{{ item.name }}:{{ item.completed }}</div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, computed, defineProps } from 'vue';
import type { PropType } from 'vue'
import type { todo, titleInfo } from '../types';
const counter = ref(1)
const doubleCounter = computed(()=>{counter.value * 2})
// const items = reactive({
//   items: [] as todo[], // 普通data中的值可以用as类型断言，这样需要使用 items.items去拿值，会影响原来模板，不建议
//   todoName: "",
// })
const items = ref([] as todo[])
const todoName = ref('')
items.value.push({
    id: 1,
    name: 'vue3',
    completed: false,
})

const newTodo = (todoName: string): todo => {
  return {
    id: items.value.length + 1,
    name: todoName,
    completed: false
  }
}
const addTodo = (todo: todo): void => {
  items.value.push(todo)
  todoName.value = ""
}
// 属性声明
defineProps({
  titleInfo: {
    // type: Object as titleInfo,  // defineComponent下的props中的值不能应该能as去类型断言
    type: Object as PropType<titleInfo>,
    required: true,
  },
})
</script>
<script lang="ts">
export default defineComponent ({
  name: 'CompSetup'
})
</script>
<style scoped></style>
