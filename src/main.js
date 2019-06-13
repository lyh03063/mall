import Vue from 'vue'
Vue.config.productionTip = false

import space from './components/space/index.js';   //默认情况下找的是index文件
Vue.use(space);   //必须有install
import VueRouter from 'vue-router'
Vue.use(VueRouter)


// var VueTouch = require('vue-touch')
// Vue.use(VueTouch, { name: 'v-touch' })
import confirmOrder from "./page/confirmOrder";

import Home from "./page/home";
import login from "./page/login";
import commodityList from "./page/commodityList";
import commodityDetail from "./page/commodityDetail";
import cart from "./page/cart";
import memberCenter from "./page/memberCenter";
import memberSetting from "./page/memberSetting";
import pswModify from "./page/pswModify";
import memberAddress from "./page/memberAddress";
import memberOrder from "./page/memberOrder";
import memberOrderDetail from "./page/memberOrderDetail";
import register from "./page/register";
import listAdded from "./components/list-address/listAdded";
import listAddModify from "./components/list-address/listAddModify";









// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/login', component: login },
    { path: '/home', component: Home },
    { path: '/commodityList', component: commodityList },
    { path: '/commodityDetail', component: commodityDetail },
    { path: '/cart', component: cart },
    { path: '/confirmOrder', component: confirmOrder },
    { path: '/memberCenter', component: memberCenter },
    { path: '/memberSetting', component: memberSetting },
    { path: '/pswModify', component: pswModify },
    { path: '/memberAddress', component: memberAddress },
    { path: '/memberOrder', component: memberOrder },
    { path: '/memberOrderDetail', component: memberOrderDetail },
    { path: '/register', component: register },
    { path: '/listAdded', component: listAdded },//新增收货地址
    { path: '/listAddModify', component: listAddModify },//修改删除收货地址
  ]
})




// var VueTouch = require('vue-touch')
// Vue.use(VueTouch, { name: 'v-touch' })

// var VueTouch = require('vue-touch')
// Vue.use(VueTouch, { name: 'v-touch' })




import axios from "axios";
window.axios = axios;

import Vuex from 'vuex'//导入vuex模块
Vue.use(Vuex)//应用组件

const store = new Vuex.Store({//定义Vuex的存储对象
  state: {
    activeMenuIndex: "2",//当前激活的菜单index
    listState: {//存放列表的共享状态，

    },
    cartData: [],//用于存放购物车的总数据
  },
  mutations: {//变更事件
    //----wxd-----购物车去确认之后转移到确认订单的数据
    cartBalanceFun(state, param) {
      console.log("cartBalanceFun--param", param);
    },
    // JumpDetail(state, param){

    // },

    //----wxd-----购物车初始化
    init(state) {
      if (window.localStorage.cartData) {
        state.cartData = JSON.parse(localStorage.cartData);
      }

      console.log("init--this.cartData", state.cartData);
    },


    //----wxd-----购物车去确认之后转移到确认订单的数据
    cartBalanceFun(state, param) {
      console.log("cartBalanceFun--param", param);
    },

    //----wxd-----购物车插件---立即购买
    goCartFun(state, param) {
      console.log("goCartFun--param", param);
    },


    initListState(state, param) {//改变列表的初始状态值
      console.log("param", param);

      state.listState[param.listIndex] = param.objState;
      //对listState进行整个对象的变更（深拷贝），因为listState是有注册的，可以触发响应
      let str = JSON.stringify(state.listState)//对象转换成字符串
      state.listState = JSON.parse(str)//字符串转换成对象
    },
    changeActiveMenu(state, activeMenuIndex) {//改变聚焦菜单
      state.activeMenuIndex = activeMenuIndex
    },
    openDialogAdd(state, listIndex) {//打开新增弹窗事件
      state.listState[listIndex].isShowDialogAdd = true;
    },
    closeDialogAdd(state, listIndex) {//关闭新增弹窗事件
      state.listState[listIndex].isShowDialogAdd = false;
    },
    openDialogDetail(state, param) {//打开详情弹窗事件
      state.listState[param.listIndex].isShowDialogDetail = true;
      // state.listState[param.listIndex].tableDataDetail.forEach(doc => {
      //   //遍历详情弹窗的表格数据
      //   doc.itemValue = param.row[doc.field]; //修改itemValue
      // });
      state.listState[param.listIndex].row = param.row;//将行数据保存到vuex


    },
    closeDialogDetail(state, listIndex) {//关闭详情弹窗事件
      state.listState[listIndex].isShowDialogDetail = false;
    },
  }
})

Vue.prototype.$store = store//让vue实例中可访问$store
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);


import Main from './main.vue'
new Vue({
  render: h => h(Main),
  router,
}).$mount('#app')