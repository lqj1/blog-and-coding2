<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import Child from './components/Child.vue';
import { useUsersStore } from './store/user';
const store = useUsersStore()
// const name = ref<string>(store.name)
// const age = ref<number>(store.age)
// const sex = ref<string>(store.sex)
// 解构赋值不使用 ref，则非响应式，点击修改了之后，store改变页面不会改变
// const { name, age, sex } = store

// 利用pinia的storeToRefs函数，将sstate中的数据变为了响应式的。
const { name, age, sex, counter } = storeToRefs(store)
console.log('store: ', store);

const changeName = () => {
  store.name = 'name changed'
  console.log('new store: ', store);
}

// 直接调用store的$reset()，将store重置为最初始的状态
const resetStore = () => {
  store.$reset()
}

// 批量更改数据的方法
// 这种方法需要将所有的字段列出
const patchStore = () => {
  store.$patch({
    name: 'lisa',
    age: 20,
    sex: '女',
  })
}

// pinia提供的$patch方法还可以接收一个回调函数，
// 它的用法有点像我们的数组循环回调函数了。
const patchStore2 = () => {
  store.$patch( state => {
    // state.items.push({ name: 'shoes', quantity: 1})
    // state.hasChanged = true
    state.age = 18,
    // 新增属性
    state.counter = 666
    console.log('state: ', state);
  })
}

// 整个替换
const replaceState = () => {
  store.$state = {
    name: 'whole',
    age: 28
  }
}

const saveName = () => {
  store.saveName('my name is lll');
}
</script>

<template>
  <img alt="Vue logo" src="./assets/vue.svg" />    
  <p>姓名：{{ name }}</p>
  <p>年龄：{{ age }}</p>
  <p>性别：{{ sex }}</p>
  <p>计数：{{ counter }}</p>
  <button @click="changeName">更换姓名</button>
  <button @click="resetStore">重置store</button>
  <button @click="patchStore">批量更改store</button>
  <button @click="patchStore2">优化批量更改store</button>
  <button @click="replaceState">直接替换state</button>
  <button @click="saveName">使用 action</button>
  
  <p> getters使用 </p>
  <p>新年龄: {{ store.getAddAge }}</p>
  <p>调用其他getter: {{ store.getNameAndAge }}</p>
  <p>新年龄+传参: {{ store.getAddAgeParam(5) }}</p>
  
  
  <!-- 子组件 -->
  <Child></Child>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
