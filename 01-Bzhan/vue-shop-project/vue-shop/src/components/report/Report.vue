<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 2. 为Echarts准备一个具备大小（高宽）的Dom -->
      <div id="main" style="width: 600px;height: 400px"></div>
    </el-card>
  </div>
</template>

<script>
// 1. 导入 echarts
import echarts from 'echarts'
export default {
  data () {
    return {

    }
  },
  created () {

  },
  methods: {

  },
  // 此时，页面上的元素已经被渲染完毕了
  mounted () {
    // 3. 基于准备好的dom,初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))
    // 4. 准备数据和配置项
    var option = {
      title: {
        text: 'Echarts 入门实例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    }
    // 5. 展示数据
    myChart.setOption(option)
  }
}
</script>

<style lang="less" scoped>

</style>