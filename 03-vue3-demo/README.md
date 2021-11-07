## 03-vue3-demo

> 来源于B站，开课吧课程

https://www.bilibili.com/video/BV1VK4y1o7GS?p=4&spm_id_from=pageDriver

### 1. 技术栈

### 2.  vue2->vue3

##### 2.1 composition api

- 将某一个模块封装成函数，然后在setup中调用
- 在元素中使用 `ref` 来指定dom，然后在setup中可以修改其中的内容

```js
<template>
  <h1>{{ msg }}</h1>
  <p>counter: {{counter}}</p>
  <p>double: {{ doubleCounter}}</p>
  <p>msg2: {{msg2}}</p>
  <p ref="desc"></p>
</template>
export default {
  setup () {
  	 // counter相关的模块
    const { counter, doubleCounter } = useCounter()
    // 使用元素引用
    const desc = ref(null)
    // 侦听器
    watch(counter, (val, olaVal) => {
      const p = desc.value
      p.textContent = `counter change from ${olaVal} to ${val}`
    })
    const msg2 = ref('some message')
    return { counter, doubleCounter, msg2, desc }
  }
}
function useCounter () {
  const data = reactive({
    counter: 1,
    doubleCounter: computed(() => data.counter * 2)
  })
  let timer
  onMounted(() => {
    timer = setInterval(() => {
      data.counter++
    }, 1000);
  })
  onUnmounted(() => {
    clearInterval(timer)
  })
  // 将reactive中每一个变成ref，这样在调用的时候就可以解构出来
  return toRefs(data)
}
```

##### 2.2 Teleport

- 一般用于模态框，代码以及定义在子组件上，通过teleport最终挂载到body元素上，和`id="#app"`是平级的
- 其中，`to="body"`表示挂载到body上

```html
<template>
  <div>
    <button @click="modalOpen=true">弹出模态窗口</button>
    <!-- 要传送的dom -->
    <teleport to="body">
      <div v-if="modalOpen"
           class="modal">这是一个弹窗，我的父元素是body</div>
      <button @click="modalOepn=false"></button>
    </teleport>
  </div>
</template>
```

### 3. Fragments and Emits

#### 3.1 fragments

- `fragments`使得`template`模板中可以出现多个根节点的情况

```html
<template>
  <header></header>
  <main v-bind="$attrs"></main>
  <footer></footer>
</template>
```

#### 3.2 Emits Component Option

vue3中组件发送的自定义事件需要定义在emits选项中：

- 如果自定义事件名称和原生一样，事件会触发两次，比如click
- 更好地指示组件工作方式
- 对象形式事件校验
- **但一般还是建议不要取跟原生一样的 自定义事件名字**

```html
// 父组件
<template>
  <Emits @click="onClick"></Emits>
</template>
import Emits from './Emits.vue'
export default {
  components: {
    Emits
  },
  methods: {
    onClick () {
      console.log('click me!');
    }
  }
}

// 子组件
<template>
  <div @click="$emit('click')">
    <h3>
        <button>自定义事件</button>
    </h3>
  </div>
</template>
<script>
export default {
  emits: ['click']  // 如果没有这句代码，点击button控制台会输出两次 'click me!'
}
</script>
```

### 4. 自定义渲染器 custom renderer

- 这个api可以用来自定义渲染逻辑，可以告诉vue将来怎么将vnode变成真实node