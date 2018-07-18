// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css'
import myUtils from './api/myUtils'

Vue.use(ElementUI)
Vue.config.productionTip = false
require('./../mock/index')
Vue.prototype.$echarts = echarts
Vue.prototype.myUtils = myUtils

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
