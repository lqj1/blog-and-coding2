import Vue from 'vue'
// 引入样式
import 'element-ui/lib/theme-chalk/index.css';
import {
  Button
} from 'element-ui'
import {
  Form,
  FormItem
} from 'element-ui'
import {
  Input
} from 'element-ui'
import {
  Message
} from 'element-ui'
Vue.use(Button).use(Form).use(FormItem).use(Input)
Vue.prototype.$message = Message