// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入初始化样式文件
import '@/styles/common.scss'

// import { useIntersectionObserver } from '@vueuse/core'

// // 测试接口函数
// import { getCategory } from "@/apis/testAPI"
// getCategory().then(res => {
//   console.log('res: ', res)
// })

// 引入懒加载指令插件并注册
import { lazyPlugin } from "@/directives";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)

app.mount('#app')

// // 定义全局指令，使用 v-img-lazy
// app.directive('img-lazy', {
//   mounted (el, binding) {
//     // el:指令绑定的元素
//     // binding: binding.value 指令等于号后面绑定的表达式的值，图片url
//     console.log('el: ', el)
//     console.log('binding.value: ', binding.value)

//     useIntersectionObserver(
//       el,
//       ([{ isIntersecting }]) => {
//         console.log('isIntersecting: ', isIntersecting)
//         // isIntersecting 判断图片是否进入视口区域
//         if (isIntersecting) {
//           // 进入了视口区域
//           el.src = binding.value
//         }
//       },
//     )
//   }
// })

