import Vue from 'vue'
// 引入样式
import 'element-ui/lib/theme-chalk/index.css';
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  Submenu,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  MessageBox,
  Tag,
  Tree,
  Select,
  Option,
  Cascader,
  Alert,
  Tabs,
  TabPane,
  Steps,
  Step,
  CheckboxGroup,
  Checkbox,
  Upload,
  Timeline,
  TimelineItem
} from 'element-ui'
// 全局引入
Vue.use(Button).use(Form).use(FormItem).use(Input).use(Container).use(Header).use(Aside).use(Main).use(Menu).use(Submenu).use(MenuItem).use(Breadcrumb).use(BreadcrumbItem).use(Card).use(Row).use(Col).use(Table).use(TableColumn).use(Switch).use(Tooltip).use(Pagination).use(Dialog).use(Tag).use(Tree).use(Select).use(Option).use(Cascader).use(Alert).use(Tabs).use(TabPane).use(Steps).use(Step).use(CheckboxGroup).use(Checkbox).use(Upload).use(Timeline).use(TimelineItem)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm