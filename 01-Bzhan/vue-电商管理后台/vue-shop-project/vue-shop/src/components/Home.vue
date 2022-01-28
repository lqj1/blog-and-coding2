<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/heima.png"
             alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info"
                 @click="logout">登出</el-button>
    </el-header>
    <el-container>
      <!-- 侧标栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button"
             @click="toggleCollapse">
          |||
        </div>
        <!-- 侧边栏菜单区 -->
        <el-menu background-color="#333744"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 unique-opened
                 :collapse="isCollapse"
                 :collapse-transition="false"
                 :router="true"
                 :default-active="activePath">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id+''"
                      v-for="item in menulist"
                      :key="item.id">
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/'+subItem.path"
                          v-for="subItem in item.children"
                          :key="subItem.id"
                          @click="saveNavState('/'+subItem.path)">
              <template slot="title">
                <!-- 图标 -->
                <i class="el-icon-menu"></i>
                <!-- 文本 -->
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 左侧菜单数据
      menulist: [],
      // 通过:key绑定的id去对应图标，其实不太推荐
      iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao',
      },
      isCollapse: false, // 菜单栏的折叠与展开
      activePath: '' // 被激活的链接地址
    }
  },
  created () {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    // 获取所有的侧边栏菜单
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.menulist = res.data
      // console.log('res', res)
    },
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 点击切换菜单折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 保存菜单项链接的激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #FFF;
    font-size: 20px;
    > div {
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
      }
    }
  }
  .el-aside {
    background-color: #333744;
    .el-menu {
      border-right: none;
    }
    .toggle-button {
      background-color: #4A5064;
      font-size: 10px;
      line-height: 24px;
      color: #FFF;
      text-align: center;
      letter-spacing: 0.2em ;
      cursor: pointer;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
}
.iconfont {
  margin-right: 10px;
}
</style>