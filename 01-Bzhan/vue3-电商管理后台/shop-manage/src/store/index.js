import { createStore } from 'vuex'
import app from './modules/app'
import getters from './getters'
// index 文件被外部识别，所以在这里将 getters 导出
export default createStore({
  modules: {
    app
  },
  getters
})
