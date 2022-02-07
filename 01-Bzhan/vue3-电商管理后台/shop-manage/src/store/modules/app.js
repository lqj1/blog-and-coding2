// import { createStore } from 'vuex'
// import app from './modules/app'
// import getters from './getters'
// export default createStore({
//   modules: {
//     app
//   },
//   getters
// })
import { login as loginApi } from '@/api/login'
import router from '@/router'
export default {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem('token') || ''
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    }
  },
  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginApi(userInfo)
          .then((res) => {
            commit('setToken', res.token) // 成功之后设置token
            router.replace('/') // 成功后跳转首页
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
