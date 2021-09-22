## 前端技术栈

- vue
- vue-router
- element-ui
- axios
- echarts

## 后端技术栈

- node.js
- express
- jwt
- mysql
- sequelize

## 1. 登录/退出功能

### 登录业务流程

- 在登录页面输入用户名和密码
- 调用后台接口进行验证
- 通过验证，根据后台的响应状态跳转到项目主页

### 登录业务的相关技术点

- http 是无状态的
- 通过 cookie 在客户端记录状态
- 通过 session 在服务端记录状态
- 通过 token 方式维持状态
  - （前两种是前端与后端不存在跨域问题，token 方法可用于存在跨域问题）

#### token 原理

- 客户端页面登录输入用户名和密码登录
- 服务器验证通过之后生成该用户的 token 并返回（token 由服务器生成）
- 客户端存储 token
- 后续请求携带该 token 并发送请求
- 服务器验证 token 是否存在，存在则返回数据

### element 登录验证、axios 发送请求、弹窗

- 使用 padding 的时候宽度超出了，因为宽度就是内容，加了 padding 会超出盒子原来宽度。重新设置盒子类型，box-sizing: border-box;
- 使用 el-from，:model="loginForm" 用来绑定数据，在 el-form 中用 v-model="loginForm.username" 来绑定数据
- :rules 用来绑定验证规则，需要在 el-form-item 标签后添加 prop="username"...
- prefix-icon,suffix-icon 分别用于 el-input 输入框的首部与尾部添加图标
- 在 el-form 标签中编写 auto-complete="new-password" 禁止表单自动填充

```javascript
loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在3到10个字符", trigger: "blur" }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度6到15个字符", trigger: "blur" }
        ]
      }
```

- 重置：通过 ref="loginFormRef" 给 el-form 绑定实例，调用 element 自带的 resetFields 方法可以重置表单
- 校验：使用自带方法 validate 方法对表单的提交进行验证，返回一个回调函数

```javascript
// 登录验证
login () {
  this.$refs.loginFormRef.validate(async (valid) => {
    console.log(valid); // true表示通过，false表示不通过
      const { data:res } = await this.$http.post('login', this.loginForm)
      console.log(res);
  })
}
```

- 通过 {data:res} 来解构请求返回出来的数据，并命名为 res
- axios 配置

```javascript
// 在main.js中
import axios from 'axios';
axios.defaults.baseURL = 'https://lianghj.top:8888/api/private/v1/'; // 配置请求的根路径
Vue.prototype.$http = axios; // 这样就可以通过this.$http发起axios请求
```

- element 的消息提示 message 需要全局挂载

```javascript
import { Input } from 'element-ui';
import { Message } from 'element-ui';
Vue.use(Button).use(Form).use(FormItem).use(Input);
Vue.prototype.$message = Message;
```

### 登录后 token 获取保存、路由导航

- 登录成功后的 token，保存到客户端的 sessionStorage 中
  - 项目中除了登录之外的其他 API 接口，必须在登录之后才能访问
  - token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
    - window.sessionStorage.setItem('token', res.data.token)
- 通过编程式导航跳转到后台主页，路由地址是 /home
  - this.$router.push('/home')

#### 路由导航守卫控制访问权限

- 如果用户没有登录，但是直接通过 URL 访问特定页面，需要重新导航到登录页面
- 通过 router.beforEach((to,from,next) => {}) 来挂载路由导航守卫
  - next() 放行，next('/login') 强制跳转

#### 退出功能

- 基于 token 的退出实现只需要销毁本地 token，后续请求不会携带 token，必须重新登录生成一个新的 token 才可以访问页面

```javascript
// 清空token
window.sessionStorage.clear();
// 跳转到登录页
this.$router.push('/login');
```

### 格式化文件

- 有时候自己的代码格式与 eslint 冲突了，就可以在项目下创建 .prettierrc 文件来编写格式化代码

```javascript
{
  "semi": false, // 格式化代码不再加分号
  "singleQuote": true // 双引号变成单引号
}
```

- eslint 自身也可以配置，在 .eslintrc.js 中配置，在关键词 rules 中去配置

### git 常规操作

- 查看分支： `git branch`
- 切换分支： `git checkout login`
- 切换并创建分支：`git checkout -b user`
- 推送本地分支到远程：切换到要推送的分支，`git push -u origin login`, 最后的 login 表示要推动到远程分支新起的名字
- 合并分支： 先切换到要合并到的主分支，`git checkout master`
- 然后 `git merge login`，就可以合并 login 到当前分支
- 再把本地 master 分支的代码推送到云端，因为云端已经有了，所以不需要使用 -u，直接 `git push`

### 主页布局、侧边栏数据请求

- element 中每一个标签元素，都是一种类名，<el-header>可以使用 .el-header 去修饰
- 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
- el-submenu 标签中的 index 设置动态属性，可以避免同时展开关闭的情形，但 index 只接受字符串

#### 请求拦截器添加 token

- 通过 axios 请求拦截器添加 token，保证拥有获取数据的权限

```javascript
axios.interceptors.request.use(config => {
  // 为请求头对象(headers)，添加 Token 验证的 Authorization 字段
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config; // 必须return config
});
```

- 登录的接口没有颁发 token，所以登录接口请求中的 Authorization 的值为 null
- letter-spacing 设置间距
- element 的 menu 菜单上有 collapse 可以用来设置菜单展开与折叠，通过 :collapse="true"，加引号来保证设置的是布尔值

#### 添加子页面、侧边栏路由改造

```javascript
{
    path: '/home',
    name: 'Home',
    redirect: '/welcome', // 进入home后重定向到欢迎界面
    component: () => import('../components/Home.vue'),
    children: [{
      path: '/welcome',
      component: () => import('../components/Welcome.vue')
    }]
  }
```

- 在 home 页面中，添加 <router-view> 引入 welcome 组件，这样就可以在占位符的地方显示 welcome
- element 中的 el-menu 中设置 :router="true"，可以使用 vue-router 模式，该模式会在激活导航时以 **index** 作为 path 进行路由跳转，就不用在每个二级菜单中添加 router-link 或者 router-view
- 通过 default-active 设置激活菜单的 index，如果是自定义导航路径，则需要手动设置 index 的值才能高亮，比如 :default-active="/users"，则用户列表的菜单项就会一直高亮
- 为实现点击高亮的效果，然后刷新之后仍然高亮，就需要将这个路径的值保存在 sessionStorage 中，在 created 中赋值给 default-active，然后刷新之后就可以存在

### 用户列表的开发

- 面包屑导航
- el-table 表格渲染数据，通过 border 添加边框，stripe 设置斑马纹（隔行变色）
- `<el-table-column type="index"></el-table-column>`为表格添加索引列
- 表格的作用域插槽
  - 其中 {{scope.row}} 表示该行的数据

```javascript
 <el-table-column label="状态" prop="mg_state">
  <template slot-scope="scope">
    {{scope.row.mg_state}}
  </template>
</el-table-column>
```

- Tooltip 是 element 常用的提示框，包裹在其他按钮等外面就可以使用，使用 :enterable="false"，就可以使弹出框不遮挡其他
- 渲染表格之后，修改表格中的数据之后（如 switch 开关），刷新后页面还是之前的状态，没有同步更新到后端

  - 监听 switch 的 change 事件

#### 查询

- 输入框输入内容，点击搜索查询。el-input 输入框 v-model 绑定查询字符串，搜索按钮绑定查询的接口函数
  - 优化：输入框添加 clearable，点击后清空输入框，还需要绑定 clear 事件，才可以在清空后再查询

#### 验证表单

- 验证规则

```javascript
addFormRules: {
  username: [
    { required: true, message: '请输入用户名称', trigger: 'blur' },
    { min: 3, max: 10, message: '用户名长度在3~10之间', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { validator: checkEmail, trigger: 'blur' } // 自定义验证规则
  ],
  mobile: [
    { required: true, message: '请输入手机', trigger: 'blur' },
    { validator: checkMobile, trigger: 'blur' }
  ]
}
```

- 自定义验证规则
  - 在 addFormRules 通过 validator 添加方法
  - 在 data 中，data 的 return 外面通过 var 定义验证的规则

```javascript
// 验证邮箱的规则
var checkEmail = (rule, value, cb) => {
  // 验证邮箱的正则表达式
  const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
  if (regEmail.test(value)) {
    // 合法的邮箱，直接返回 cb()
    return cb();
  }
  // 不合法，通过cb返回 new Error()
  cb(new Error('请输入合法的邮箱'));
};
// 验证手机号的规则
var checkMobile = (rule, value, cb) => {
  const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
  if (regMobile.test(value)) {
    return cb();
  }
  cb(new Error('请输入合法的手机号'));
};
```

#### 重置表单

- 有时候再表单某些项不通过的时候，会提示信息，或者填入的信息，在点击取消之后，再打开的时候，还是会显示，这时候需要对表单进行重置，主要步骤包括如下：
  - 对表单进行关闭事件监听，在 el-dialog 标签中，添加 @close 事件
  - 关闭事件中进行重置，通过 ref 获取指定的表单，然后调用自有方法 this.$refs.ruleFormRef.resetFields()

#### 提交前的预验证

```javascript
 addUser () {
  this.$refs.ruleFormRef.validate(valid => {
    if (!valid) return
    // 通过就发起添加用户的网络请求
  })
}
```

#### 删除用户信息，提示插件全局绑定

- 删除之前弹出确认提示框，提示用户是否进一步操作，防止用户误删除
- 为组件绑定 $confirm 引用，可以直接调用 this.$confirm 使用，与 message 同样的原理

```javascript
import { Message, MessageBox } from 'element-ui';
// Vue.use(Dialog) // 这种是针对普通的插件
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
```

- 封装删除函数

```javascript
// 根据id删除对应的用户
async removeUserById (id) {
  // 弹框询问是否删除
  const confirmResult = await this.$confirm('此操作将永久删除该用户，是否继续？', '删除用户', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).catch(err => err) // 捕获错误并返回
  // 如果用户确认删除，返回值为字符串 confirm
  // 如果用户取消了删除，则返回值为字符串 cancel
  // console.log(confirmResult);
  if (confirmResult !== 'confirm') {
    // 证明用户取消了， 不想删除
    return this.$message.info('已取消删除')
  }
  console.log('确认了删除');
  // 调用删除的接口
  const { data: res } = await this.$http.delete('users/' + id)
  if (res.meta.status !== 200) {
    return this.$message.error('删除用户失败！')
  }
  this.$message.success('删除用户成功！')
  // 刷新列表
  this.getUserList()
}
```

### 权限管理的开发

#### 子页面的编写

```javascript
// router.js
{
    path: '/home',
    name: 'Home',
    redirect: '/welcome',
    component: () => import('../components/Home.vue'),
    children: [{
        path: '/welcome',
        name: 'Welcome',
        component: () => import('../components/Welcome.vue')
      },
      {
        path: '/users',
        name: 'User',
        component: () => import('../components/user/User.vue')
      },
    ]
}
// Home.vue
<el-container>
  <el-main>
    <router-view></router-view>
  </el-main>
</el-container>
```
