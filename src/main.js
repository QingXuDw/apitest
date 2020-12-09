import Vue from 'vue'
import App from './App.vue'
import router from './router'

//导入ElementUI相关内容
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 导入全局样式表
import "./assets/css/global.css"

//引入axios
import axios from 'axios'
axios.defaults.withCredentials = false
axios.defaults.crossDomain = true


Vue.prototype.$axios = axios

//全局api
import api from './assets/config/api.js'
Vue.prototype.$api = api

//富文本编辑器 
import quillEditor from 'vue-quill-editor'
Vue.use(quillEditor);
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import store from './store'

//拦截器 发送请求前,会发送一个token
axios.interceptors.request.use(config => {
  var temp;
  console.log(config);
  if ((temp = window.sessionStorage.getItem("token")) != null) {
    config.headers.token = window.sessionStorage.getItem('token');
  }
  return config;
});

//md5加密
import md5 from 'js-md5'
Vue.prototype.$md5 = md5

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
