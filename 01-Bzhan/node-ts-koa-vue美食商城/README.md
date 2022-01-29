## 前端技术栈

- vue
- vue-router
- ES6
- TS
- echarts

## 后端技术栈

- node.js
- Koa
- jwt
- mysql
- sequelize

## 项目启动方式

### 01. 安装 mysql 与启动后台服务

### 02. 启动前端服务

# 项目实现与知识点

## ts 基础

### 基础

1. 基础类型

- Number、Boolean、String、Null、Undefined、Object、Symbol
  - 其中前 5 种属于基本数据类型，Object 属于引用数据类型（类似的还有 Array,Function），而 Symbol 属于 ES6 新增的基本类型
  - Symbol 值是由 Symbol 函数调用产生的
    - `var s1 = Symbol();`
  - 相同 Symbol 函数返回的值是唯一的
  - Symbol 可以接受字符串作为参数，即使是相同的参数返回值也是不一样的
    - `Symbol('lqj')!=Symbol('lqj')`
