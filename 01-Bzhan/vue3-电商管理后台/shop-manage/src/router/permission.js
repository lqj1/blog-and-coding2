// import router from './index'
// import store from '@/store'

// const whiteList = ['/login']
// router.beforeEach((to, from, next) => {
//   if (store.getters.token) {
//     if (to.path === '/login') {
//       next('/')
//     } else {
//       next()
//     }
//   } else {
//     if (whiteList.includes(to.path)) {
//       next()
//     } else {
//       next('/login')
//     }
//   }
// })

import router from './index'
import store from '@/store' // 一般会找 index.js 文件
const whiteList = ['/login'] // 登录白名单
// 拦截器
router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    if (to.path === '/login') {
      // 有token，且在登录页就跳转到首页
      next('/')
    } else {
      // 不是登录页，放行
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      // 如果在白名单页面中，放行
      next()
    } else {
      // 否则到登录页
      next('/login')
    }
  }
})
