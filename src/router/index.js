import Vue from 'vue'
import VueRouter   from 'vue-router'
import store from '../store/index.js'
Vue.use(VueRouter)

// export default new Router({
//   mode: "history",
let routerConfig= [
    {
      path: '/',
      name: 'Login',
      component: resolve => require(['@/view/Login'], resolve) // 登陆
    },
    {//默认页面
      path: '/info',
      name: 'info.1',
      component: resolve => require(['@/view/home/info'], resolve),
      children:[
        {
          path: '/',
          name: '车位状态图.1',
          component: resolve => require(['@/view/home/parkingState'], resolve) // 车辆状态图
        },
        {
          path: '/vehicleUsing',
          name: '车位利用率.2',
          component: resolve => require(['@/view/home/vehicleUsing'], resolve) // 车辆利用率
        },
        {
          path: '/backWhite',
          name: '黑白名单.3',
          component: resolve => require(['@/view/home/backWhite'], resolve) // 黑白表
        },
        {
          path: '/theCarLog',
          name: '停车日志.4',
          component: resolve => require(['@/view/home/theCarLog'], resolve) // 车辆利用率
        },
        {
          path: '/lighting',
          name: '照明系统.6',
          component: resolve => require(['@/view/home/lighting'], resolve) // 照明系统
        },
        {
          path: '/environment',
          name: '环境系统.7',
          component: resolve => require(['@/view/home/environment'], resolve) // 环境系统
        },
        //系统管理
        {
          path: '/system/general',
          name: '通用设置.9',
          component: resolve => require(['@/view/home/system/general'], resolve) // 通用设置
        },
        {
          path: '/system/information',
          name: '部门信息管理.10',
          component: resolve => require(['@/view/home/system/information'], resolve) // 部门信息管理
        },
        {
          path: '/system/authorization',
          name: '角色管理与授权.11',
          component: resolve => require(['@/view/home/system/authorization'], resolve) // 部门管理与授权
        },
        {
          path: '/system/personnel',
          name: '人员管理与授权.12',
          component: resolve => require(['@/view/home/system/personnel'], resolve) // 人员管理与授权
        },
        {
          path: '/system/sensitiveLog',
          name: '敏感日志操作.13',
          component: resolve => require(['@/view/home/system/sensitiveLog'], resolve) // 敏感信息操作
        },
        {
          path: '/system/parkingSpace',
          name: '车位管理.14',
          component: resolve => require(['@/view/home/system/parkingSpace'], resolve) // 车辆管理
        }
      ]
    }
  ]
// })

const router= new VueRouter({
  mode: "history",
  base: __dirname,
  routes:routerConfig
});

router.beforeEach((to, from, next) => {
  let index=to.name.lastIndexOf('.');
  let sidebar=to.name.substring(index+1,to.name.length)
  store.state.sidebarNumber=sidebar
  store.state.sidebarName=to.name.substring(0,index)
  if(sidebar ==store.state.sidebarNumber ){
    next()
  }
});

export default router
