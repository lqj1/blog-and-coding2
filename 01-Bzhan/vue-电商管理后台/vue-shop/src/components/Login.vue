<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png"
             alt="">
      </div>
      <!-- 登录表单区 -->
      <el-form ref="loginFormRef"
               :model="loginForm"
               :rules="loginRule"
               label-width="0px"
               class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username"
                    prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password"
                    prefix-icon="iconfont icon-3702mima"
                    type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary"
                     @click="login">登录</el-button>
          <el-button type="info"
                     @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 这是表单验证规则对象
      loginRule: {
        username: [
          {
            required: true, message: '请输入登录名称', trigger: 'blur'
          },
          {
            min: 3, max: 10, message: '长度在3-10个字符之间'
          }
        ],
        password: [
          {
            required: true, message: '请输入登录密码',
            trigger: 'blur'
          }
        ],
      }
    }
  },
  methods: {
    // 点击重置登录表单
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields();
    },
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        // 验证通过会返回 true, 否则返回false
        if (!valid) return;
        const { data: res } = await this.$http.post('login', this.loginForm)
        console.log('res', res);
        if (res.meta.status !== 200) {
          return this.$message.error('登录失败！')
        }
        this.$message.success('登录成功！')
        // 将登陆成功之后的 token 保存到客户端的 sessionStorage 中
        window.sessionStorage.setItem('token', res.data.token)
        // 跳转到后台主页，路由地址是 /home
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color:#2b4b6b;
  height: 100%;
}
.login_box {
  height: 300px;
  width: 450px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content:flex-end;
}
</style>