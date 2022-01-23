import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/Login.vue';
import Home from '../components/Home.vue';
Vue.use(VueRouter);

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/home', component: Home },
];

const router = new VueRouter({
  routes,
});
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    // 访问登录页，直接放行
    return next();
  }
  // 获取token，判断是否存在
  const tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) {
    // 不存在就跳转到登录页
    return next('/login');
  }
  next();
});
export default router;
