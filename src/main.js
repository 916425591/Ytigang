// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'//引入路由设置
import jsonp from 'vue-jsonp';
import Vuex from 'vuex' // 引入状态管理框架
import store from './store/index';
import $ from 'jquery'  //引入
import axios from 'axios' // 引入http管理
import echarts from 'echarts' // 引入http管理
import ElementUI from 'element-ui'//引入elementui
import 'element-ui/lib/theme-chalk/index.css'//引入elementui
import './assets/css/foot-awesomeweb.css'//字体包
import '@/style/index.scss' // global css
Vue.config.productionTip = false

Vue.prototype.$http = axios //全局变量
Vue.prototype.$echarts = echarts //全局变量
Vue.use(jsonp);
Vue.use(ElementUI);
Vue.use(Vuex);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
