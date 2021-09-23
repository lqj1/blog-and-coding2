import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入图标
import './assets/fonts/iconfont.css'
// 全局引入element
// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);
// 局部引入插件
import './plugins/element'
// 导入全局样式表
import './assets/css/global.css'
// 导入插件
import TreeTable from 'vue-table-with-tree-grid'
// 导入axios包
import axios from 'axios'
axios.defaults.baseURL = 'https://lianghj.top:8888/api/private/v1/' // 配置请求的根路径
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios // 这样就可以通过this.$http发起axios请求
Vue.config.productionTip = false
// 注册为全局可用组件
Vue.component('tree-table', TreeTable)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')