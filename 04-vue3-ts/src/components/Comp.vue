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

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { todo, titleInfo } from '../types';
export default defineComponent({
  props: {
    titleInfo: {
      // type: Object as titleInfo,  // defineComponent下的props中的值不能应该能as去类型断言
      type: Object as PropType<titleInfo>,
      required: true,
    },
  },
  data() {
    return {
      counter: 1,
      items: [] as todo[], // 普通data中的值可以用as类型断言
      todoName: "",
    };
  },
  created() {
    this.items.push({
      id: 1,
      name: 'vue3',
      completed: false,
    });
  },
  computed: {
    doubleCounter(): number {
      return this.counter * 2;
    },
  },
  methods: {
    newTodo(todoName: string): todo {
      return {
        id: this.items.length + 1,
        name: todoName,
        completed: false
      }
    },
    addTodo(todo: todo): void {
      this.items.push(todo)
      this.todoName = ""
    }
  }
});
</script>

<style scoped></style>
