<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <!-- 提示区域 -->
      <el-alert title="添加商品信息" type="info" center show-icon :close="false"></el-alert>
      <!-- 步骤条 -->
      <el-steps :space="200" :active="activeIndex - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- Tab区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position="top">
        <el-tabs :tab-position="'left'" style="height: auto;" v-model="activeIndex" :before-leave="beforeTabLeave"
          @tab-click="tabClicked">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader v-model="addForm.goods_cat" :options="catelist" :props="cateProps" @change="handleChange"
                clearable>
              </el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <!-- 渲染表单的item项 -->
            <el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item.attr_id">
              <!-- 复选框组 -->
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox :label="cb" v-for="(cb,i) in item.attr_vals" :key="i" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item :label="item.attr_name" v-for="item in onlyTableData" :key="item.attr_id">
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
          <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '0', // 激活的step的项
      addForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        // 商品所属的分类数组
        goods_cat: []
      }, // 添加商品的表单对象
      addFormRules: {
        goods_name: [
          {
            required: true, message: '请输入商品名称', trigger: 'blur'
          }
        ],
        goods_price: [
          {
            required: true, message: '请输入商品价格', trigger: 'blur'
          }
        ],
        goods_weight: [
          {
            required: true, message: '请输入商品重量', trigger: 'blur'
          }
        ],
        goods_number: [
          {
            required: true, message: '请输入商品数量', trigger: 'blur'
          }
        ],
        goods_cat: [
          {
            required: true, message: '请选择商品分类', trigger: 'blur'
          }
        ]
      }, // 验证对象
      catelist: [], // 商品分类列表
      // 级联选择器属性定义
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        expandTrigger: 'hover'
      },
      manyTableData: [], // 动态参数列表数据
      onlyTableData: [], // 静态属性列表数据
    }
  },
  created () {
    this.getCateList()
  },
  methods: {
    // 获取所有商品分类数据
    async getCateList () {
      const { data: res } = await this.$http.get(`categories`)
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类数据失败！')
      }
      this.catelist = res.data
      // console.log('res', res);
    },
    // 级联选择器选中项变化触发函数
    handleChange () {
      // goods_cat是数组
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = []
      }
    },
    // 切换标签页前的判断
    beforeTabLeave (activeName, oldActiveName) {
      // activeName: 即将进入的标签页的name
      // oldActiveName: 离开的标签页的name
      if (oldActiveName === '0' && this.addForm.goods_cat.length !== 3) {
        // 没有选择第三级标签，不符合条件，不让进入下一个选项
        this.$message.error('请先选择商品分类！')
        return false
      }
    },
    async tabClicked () {
      // console.log('tab', this.activeIndex);

      if (this.activeIndex === '1') {
        // 访问的是动态参数面板
        const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, {
          params: {
            sel: 'many', // 获取动态参数
          }
        })
        if (res.meta.status !== 200) {
          return this.$message.error('获取动态参数列表失败！')
        }
        // console.log('res', res);
        res.data.forEach(item => {
          item.attr_vals = item.attr_vals.length === 0 ? [] : item.attr_vals.split(' ')
        })
        this.manyTableData = res.data
      } else if (this.activeIndex === '2') {
        // 访问的是静态商品属性面板
        const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, {
          params: {
            sel: 'only' // 获取静态属性
          }
        })
        if (res.meta.status !== 200) {
          return this.$message.error('获取静态属性列表失败！')
        }
        console.log('res', res);
        this.onlyTableData = res.data
      }
    }
  },
  computed: {
    cateId () {
      // 存在三级分类id，传数组的最后一项
      if (this.addForm.goods_cat.length === 3) {
        return this.addForm.goods_cat[2]
      }
      return null // 没有三级分类id
    }
  }
}
</script>

<style lang="less" scoped>
.el-checkbox {
  margin: 0 5px 0 0;
}
</style>