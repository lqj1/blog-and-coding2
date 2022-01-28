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

## 项目启动方式

### 01. 安装 mysql 与启动后台服务

1. 下载 phpStudy2016 版本，启动 mysql，然后导入`vueShop-api-server-master/db`下的 mydb 文件，也就是还原，还原的库名也是叫 mydb，数据库名字为 root，密码为 123456

1. 成功后在 phpStudy 软件安装目录下的`MySQL/data`下有 mydb 的文件夹，下面就是各个数据表
2. 进入vueShop-api-server-master文件夹，运行 `npm install` 安装相关依赖，然后启动 `node app.js` 后端服务

### 02. 启动前端服务

1.  进入 vue-shop 文件夹，执行`npm install`安装相关依赖，然后启动`npm run serve`前端服务

# 前端项目实现过程

1. 初始化项目`vue create vue-shop`
2. 运行`vue ui`报错`Error: ENOENT: no such file or directory, scandir '..\node_modules\@vue\cli-services\locales'`
   - Node.js v17.4.0, npm 8.3.1
   - 解决方法：在提示的插件下面去手动创建 locales 文件夹，可解决
3. **推荐使用 Node.js v16 版本**

## 1. 登录/退出功能

### 登录业务流程

- 在登录页面输入用户名和密码
- 调用后台接口进行验证
- 通过验证，根据后台的响应状态跳转到项目主页

### 登录业务的相关技术点

http 是无状态的

- 通过 cookie 在客户端记录状态
- 通过 session 在服务端记录状态
- 通过 token 方式维持状态
  - 前两种是前端与后端不存在跨域问题才可以使用，token 方法可用于存在跨域问题


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
- 删除本地分支 `git branch -d user`
- 删除远程分支 `git push origin --delete user`

### 主页布局、侧边栏数据请求

- element 中每一个标签元素，都是一种类名，<el-header>可以使用 .el-header 去修饰
- 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
- el-submenu 标签中的 index 设置动态属性，可以避免同时展开关闭的情形，但 index 只接受字符串

#### 请求拦截器添加 token

- 通过 axios 请求拦截器添加 token，保证拥有获取数据的权限

```javascript
axios.interceptors.request.use(config => {
    // 为请求头对象(headers)，添加 Token 验证的 Authorization 字段
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config  // 必须 return config
})
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

- 面包屑导航  `el-breadcrumb`
- el-table 表格渲染数据，通过 border 添加边框，stripe 设置斑马纹（隔行变色）
- `<el-table-column type="index"></el-table-column>`为表格添加索引列
- 表格的作用域插槽
  - 其中 {{scope.row}} 表示该行的数据

```html
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
  - 在 el-form 标签中添加 :rules="addFormRules"
  - 在 addFormRules 通过 validator 添加（方法/函数）
  - 在 data 中，data 的 return 外面通过 var 定义验证的规则


```javascript
data() {
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
}

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

#### el-tree 组件

```javascript
<el-tree :data="rightslist" :props="treeProps" show-checkbox node-key="id" default-expand-all :default-checked-keys="defKeys" ref="treeRef"></el-tree>
```

- `:data`定义数据
- `:props`定义数据格式, 如下的 authName 表示标签名字，children 表示子节点

```javascript
treeProps: {
  label: 'authName',
  children: 'children'
},
```

- `default-checked-keys` 表示勾选的节点
- `node-key` 用来标识节点的唯一性
- `getCheckedKeys` 获取所有已选中的节点
- `getHalfCheckedkeys` 获取半选中的节点

### 分类管理的开发

#### git 操作

- 创建并切换到新的分支：`git checkout -b goods_cate`
- 将分支推送到云端：`git push -u origin goods_cate`
  - 如果远端没有该分支，就需要添加 -u

#### 开始开发

- 插件 vue-table-with-tree-grid

```javascript
// main.js
// 导入插件
import TreeTable from 'vue-table-with-tree-grid';
// 注册为全局可用组件
Vue.component('tree-table', TreeTable);
```

#### vue-table-with-tree-grid 插件

```javascript
<tree-table class="treeTable" :data="catelist" :columns="columns" :selection-type="false" :expand-type="false" show-index index-text="#" border :show-row-hover="false">
  // <!-- 是否有效 -->
  <template slot="isok" slot-scope="scope">
    <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color: lightgreen"></i>
    <i class="el-icon-error" v-else style="color: red"></i>
  </template>
  // <!-- 排序 -->
  <template slot="order" slot-scope="scope">
    <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
    <el-tag size="mini" v-else-if="scope.row.cat_level === 1">二级</el-tag>
    <el-tag size="mini" v-else="scope.row.cat_level === 2">三级</el-tag>
  </template>
  // <!-- 操作 -->
  <template slot="opt" slot-scope="scope">
    <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
    <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
  </template>
</tree-table>
```

- `·data`数据
- `columns`表格各列的配置
  - label: 列标题

```javascript
// 在data中
columns: [
  {
    label: '分类名称', // 列标题
    prop: 'cat_name', // 属性名
  },
  {
    label: '是否有效',
    type: 'template', // 表示将当前列定义为模板列
    // 表示当前列用的模板名称
    template: 'isok',
  },
  {
    label: '排序',
    type: 'template', // 表示将当前列定义为模板列
    // 表示当前列用的模板名称
    template: 'order',
  },
  {
    label: '操作',
    type: 'template', // 表示将当前列定义为模板列
    // 表示当前列用的模板名称
    template: 'opt',
  },
];
```

- selection-type: 是否为多选类型表格

#### 分页

- 使用 element 提供的插件

```js
// data
queryInfo: { // 查询条件
  type: 3,
  pagenum: 1,
  pagesize: 5
  total: null // 通过请求后端数据赋值
},
// template
<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
  :current-page="queryInfo.pagenum" :page-sizes="[3, 5, 10, 15]" :page-size="queryInfo.pagesize"
  layout="total, sizes, prev, pager, next, jumper" :total="queryInfo.total">
</el-pagination>
// js
// 监听pagesize改变
handleSizeChange (newSize) {
  this.queryInfo.pagesize = newSize
  // 数据发生变化后重新请求
  this.getCateList()
},
// 监听pagenum改变
handleCurrentChange (newPage) {
  this.queryInfo.pagenum = newPage
  this.getCateList()
}
```

### 分类管理（可用于淘宝京东等的左侧）

### element 的级联选择器 el-cascader

```javascript
<el-cascader v-model="selectKeys" expand-trigge="hover" :options="parentsCateList" :props="cascaderProps" @change="handleChange"></el-cascader>
```

- 其中 `options` 表示数据
- `expand-trigge="hover"`: 展开方式--**已经弃用**
- 由于可以将各个级别的标签都选上，所以 v-model 绑定了 selectKeys 的数组
- `props` 用来指定配置对象
  - value: 指定选项的值为选项对象的某个属性值
  - label: 指定选项标签为选项对象的某个属性值
  - children: 指定选项的子选项为选项对象的某个属性值
  - disabled: 指定选项的禁用为选项对象的某个属性值
  - expandTrigger: 'hover': 指定展开方式
- `clearable`: 清空选项
- `change-on-select`: 是否允许选择任意一级选项

```javascript
cateProps: {
  value: 'cat_id',
  label: 'cat_name',
  children: 'children',
  expandTrigger: 'hover'
},
```

#### 弹出框的取消

- 注意需要给弹出框的取消绑定事件 `@close`, 并清空输入框中的填入的值

### 参数管理

#### 分类

- 静态参数和动态参数：静态参数指的是商品的尺寸、颜色等，静态参数就是该手机或其他的品牌型号等不可更改的参数
- 警告框, `el-alert`

```javascript
//  <!-- 头部的警告区 -->
<el-alert title="注意：只允许为第三级分类设置相关参数" type="warning" :closable="false" show-icon></el-alert>
```

- Tab 标签页, `el-tab`

- 展开行添加数据
  - 在展开行通过作用域插槽的方式接收数据

```javascript
//  <!-- 展开行 -->
<el-table-column type="expand">
  <template slot-scope="scope">
    <el-tag v-for="(item,i) in scope.row.attr_vals" :key="i">{{item}}</el-tag>
  </template>
</el-table-column>
```

#### 数组分割考虑的 bug

- 在对某个字符串进行分割的时候，需要考虑空字符串的时候，这时候分割会返回一个包含空字符串的数组
- 所以需要对其进行判断，当是空字符串的时候，就返回空数组

#### 动态编辑标签

- 对于表格中，同一个布尔值控制的变量，有时候会出现一变化，所有都变化，这时候可以在获取数据的时候，通过循环给每个数据设置一个布尔值，后期通过模板中的 `scope.row.value` 来控制每一条数据
- `this.$nextTick`: 当页面上的元素被重新渲染之后，才会执行回调函数中的代码

```javascript
// 点击按钮，展示文本输入框
showInput (row) {
  // 这里让文本显示，但是页面中展示的还是原来的按钮，而不是文本框
  row.inputVisible = true
  // 让文本框自动获得焦点
  this.$nextTick(_ => {
    this.$refs.saveTagInput.$refs.input.focus();
  });
}
```

- 比如上面的代码，如果不放在 nextTick 中，有时候可能页面中还没有渲染出 input，就获取不到那个元素

### 商品列表开发

#### git 操作

- 创建新分支 `git checkout -b goods_list`
- 记得推送到云端 `git push -u origin goods_list`

#### 全局过滤器

- 在 main.js 中配置全局过滤器
- 全局格式化时间的过滤器

```javascript
// main.js
Vue.filter('dataFormat', function (originVal) {
  // 根据给定时间得到时间对象
  const dt = new Date(originVal);
  const y = dt.getFullYear();
  // 日期需要加1，加空格变为字符串，padStart保持2位，不足前面补0
  const m = (dt.getMonth() + 1 + '').padStart(2, '0');
  const d = (dt.getDate() + '').padStart(2, '0');
  const hh = (dt.getHours() + '').padStart(2, '0');
  const mm = (dt.getMinutes() + '').padStart(2, '0');
  const ss = (dt.getSeconds() + '').padStart(2, '0');
  // return `yyyy-mm-dd hh:mm:ss`
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
});
// 在vue文件中使用
<el-table-column label="商品创建时间">
  <template slot-scope="scope">
    {{scope.row.add_time | dataFormat}}
  </template>
</el-table-column>
```

#### 步骤条 el-step

- 引入 Steps、Step

```javascript
<el-steps :space="200" :active="1" finish-status="success" align-center>
  <el-step title="基本信息"></el-step>
  <el-step title="商品参数"></el-step>
  <el-step title="完成"></el-step>
</el-steps>
```

- active 是激活的项

#### 居左显示的 tab

```javascript
<el-tabs :tab-position="'left'" style="height: 200px;">
  <el-tab-pane label="用户管理">用户管理</el-tab-pane>
  <el-tab-pane label="配置管理">配置管理</el-tab-pane>
  <el-tab-pane label="角色管理">角色管理</el-tab-pane>
  <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
</el-tabs>
```

#### 步骤条与 tab 面板联动

```javascript
// <!-- 步骤条 -->
// 这里减去0可以将字符串变成数字
<el-steps :space="200" :active="activeIndex-0" finish-status="success" align-center>
  <el-step title="基本信息"></el-step>
  <el-step title="商品参数"></el-step>
  <el-step title="商品属性"></el-step>
  <el-step title="商品图片"></el-step>
  <el-step title="商品内容"></el-step>
  <el-step title="完成"></el-step>
</el-steps>
// <!-- Tab区域 -->
 <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position="top">
  <el-tabs :tab-position="'left'" style="height: 200px;" v-model="activeIndex">
    <el-tab-pane label="基本信息" name="0">
      <el-form-item label="商品名称" prop="goods_name">
        <el-input v-model="addForm.goods_name"></el-input>
      </el-form-item>
       <el-form-item label="商品价格" prop="goods_price">
        <el-input v-model="addForm.goods_price" type="number"></el-input>
      </el-form-item>
    </el-tab-pane>
    <el-tab-pane label="商品参数" name="1">
      //  <!-- 渲染表单的item项 -->
      <el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item.attr_id">
        // <!-- 复选框组 -->
        <el-checkbox-group v-model="item.attr_vals">
          <el-checkbox :label="cb" v-for="(cb,i) in item.attr_vals" :key="i"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-tab-pane>
    <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
    <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
    <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
  </el-tabs>
</el-form>
```

- 让两个组件共用一个 activeIndex，就可以实现联动切换
- tab 中`v-model`绑定的属性是与 `name` 属性 对应
- `form`包裹`el-tabs`再包裹`el-form-item`(**重要**)
- `label-position="top"`可以设置**标签文本**和**input 输入**上下显示
- `type="number"` 控制输入框只能输入数字
- el-tag 的事件`:before-leave`

```javascript
// 切换标签页前的判断
beforeTabLeave (activeName, oldActiveName) {
  // activeName: 即将进入的标签页的name
  // oldActiveName: 离开的标签页的name
  if (oldActiveName === '0' && this.addForm.goods_cat.length !== 3) {
    // 没有选择第三级标签，不符合条件，不让进入下一个选项
    this.$message.error('请先选择商品分类！')
    return false
  }
}
```

- `@tab-click` tab 被选中时触发的事件
- `border`可以给`el-checkout`添加样式

#### 上传图片

```javascript
<el-upload :action="uploadURL" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList"
  list-type="picture" :headers="headerObj" :on-success="handleSuccess">
  <el-button size="small" type="primary">Click to upload</el-button>
  <template #tip>
    <div class="el-upload__tip">
      jpg/png files with a size less than 500kb
    </div>
  </template>
</el-upload>

// 处理图片预览效果
handlePreview () {},
// 处理移除图片的操作
handleRemove (file) {
  // file是将要移除图片的信息，包括临时路径
  // 1. 获取将要删除的图片的临时路径
  const filePath = file.response.data.tmp_path
  // 2. 从 pics 数组中，找到这个图片对应的索引值
  const i = this.addForm.pics.findIndex(item => item.pic === filePath)
  // 3. 调用数组的 splice 方法，把图片信息对象从pics数组中移除
  this.addForm.pics.splice(i,1)

}
// 监听图片上传成功事件，可以拿到服务器传的临时路径
handleSuccess (res) {
  // 1. 拼接得到图片信息对象
  const picInfo = { pic: res.data.tmp_path }
  // 2. 将图片信息对象push到数组中
  this.addForm.pics.push(picInfo)
}
```

- `:file-list="fileList"` 文件列表
- ` list-type="picture"` 预览图片的呈现方式
- 我们曾经在 main.js 中定义了请求头中携带 token 信息

```javascript
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config;
});
```

- 而 `el-upload` 组件在内部自己封装了一套请求方式，但没有调用 axios，所以这里的请求不会有 token 发送
- 在 `el-upload` 中有 header 的属性，可以在这里添加 token 信息
  - data 中定义如下：

```javascript
headerObj: {
  Authorization: window.sessionStorage.getItem('token')
}, // 图片上传组件的headers请求头对象
```

### 商品内容

- 安装编辑工具， vue-quill-edit
- `npm install vue-quill-editor –save`
- `main.js` 中导入

```javascript
// 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor';
// 导入对应的样式
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
// 注册为全局可用组件
Vue.use(VueQuillEditor);
// vue 文件，通过标签直接使用，v-model绑定数据
<quill-editor v-model="addForm.goods_introduce"></quill-editor>;
```

#### 提交表单的深拷贝

```javascript
add () {
  this.$refs.addFormRef.validate(valid => {
    if (!valid) {
      return this.$message.error('请填写必要的表单项！')
    }
    // 执行添加的业务逻辑
    // 由于这里修改了goods_cat之后，之前级联选择器绑定的数据就变成了字符串，所以就会报错
    // 这里需要提交的表单数据 addForm 进行深拷贝
    // 使用了包 lodash 的 cloneDeep
    this.addForm.goods_cat = this.addForm.goods_cat.join(',')
  })
}
```

- 安装 lodash, `npm i --save lodash`
- 在 vue 文件中引入, `import _ from 'lodash'`
