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
