## Vue 3 + Typescript + Vite

### 1. 类型定义

#### 1.1 data中的类型定义和props中的类型定义

```js
type Todo = {
  id: number;
  name: string;
  completed: boolean;
}
type titleInfo = {
  value: string;
  color: string;
}
export default defineComponent({
  props: {
    titleInfo: {
      type: Object as titleInfo,  // defineComponent下的props中的值不能应该能as去类型断言
      required: true
    }
  },
  data() {
    return {
      counter: 1,
      items: [] as Todo[]  // 普通data中的值可以用as类型断言
    };
  },
})
```

defineComponent下的props中的值不能应该能as去类型断言

原因是props下的任何一个属性都不是自定义类型，而是泛型，需要用propType对类型作约束

#### 1.2 types.d.ts存放类型

- 一般在`src`目录下新建`types.d.ts`文件来存放类型并导出

```ts
export type todo = {
  id: number;
  name: string;
  completed: boolean;
}
export type titleInfo = {
  value: string;
  color: string;
}
```

- 然后再引入：`import { todo, titleInfo } from '../types'`

#### 1.3 computed和methods中的类型定义

- 计算属性关心返回值，所以约束返回值类型
-  method两者都关心，所以**形参和返回值**都要约束

```js
<template>
  <!-- 新增待办 -->
  <input type="text"
         v-model="todoName"
         @keydown.enter="addTodo(newTodo(todoName))" />
</template>
export default defineComponent({
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
})
```

#### 1.4 composition api 中使用ts