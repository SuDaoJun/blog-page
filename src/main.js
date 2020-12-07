import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// 组件库
import uView from "uview-ui";
Vue.use(uView);
// 全局存储
import store from '@/store';
let vuexStore = require("@/store/store.mixin.js");
Vue.mixin(vuexStore);

//引入全局组件
//导航栏
import NavHeader from '@/components/NavHeader'
Vue.component('nav-header',NavHeader)

App.mpType = 'app'

const app = new Vue({
  store,
  ...App
})

// 路由跳转
import route from '@/utils/route.js'
Vue.use(route, app)

// 这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpRequest from '@/utils/httpRequest.js'
Vue.use(httpRequest, app)

// http接口API抽离，免于写url或者一些固定的参数
import api from '@/utils/api.js'
Vue.use(api, app)

app.$mount()
