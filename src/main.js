// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import '../static/css/reset.css'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import store from './store/store'
import {setCookie , getCookie, delCookie} from './cookie/cookie'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap'

//地区选择器组件
import VDistpicker from 'v-distpicker';
Vue.component('v-distpicker', VDistpicker);

import Datepicker from 'vuejs-datepicker';
Vue.component('Datepicker', Datepicker);

import BootstrapVue from 'bootstrap-vue';
Vue.use(BootstrapVue);
import 'bootstrap-vue/dist/bootstrap-vue.css'

import editor from './editor/init.js'
import 'font-awesome/css/font-awesome.min.css'

import QS from 'qs'
Vue.prototype.qs = QS;

Vue.use(Element)
Vue.use(Vuex)
Vue.use(editor)

Vue.config.productionTip = false
Vue.prototype.$axios=axios
// Vue.prototype.domainName='http://119.29.176.47:9001'
Vue.prototype.domainName='/api'
Vue.prototype.setCookie = setCookie;
Vue.prototype.getCookie = getCookie;
Vue.prototype.delCookie = delCookie;

//添加请求拦截器
axios.interceptors.request.use(config=>{
  if(getCookie('token')){
    if(config.url != this.domainName+ '/user/login'){
        let arr = getCookie('token').split('.')[1];
      if (JSON.parse(atob(arr)).exp - (Date.parse(new Date()) / 1000) < 0) {
          alert('请重新登录');
          store.dispatch('exit');
      } 
    }
  };          
  if(store.state.token){
      // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = `Bearer ${store.state.token}`;
  }
  return config;
},err=>{
  //请求错误时做些事
  console.log('请求失败');
  return Promise.reject(err);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
