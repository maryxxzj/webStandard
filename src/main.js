import Vue from 'vue'
// 引入ElementUI组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入CSS reset： Normalize.css
import 'normalize.css'
// 引入vue-awesome图标库：font-awesome
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

import router from './router'
import store from './store/index'
import App from './App'
import axios from 'axios'

Vue.config.productionTip = false

// 引入mock数据
process.env.Mock && require('../mock/mock')

Vue.use(ElementUI)
Vue.component('icon', Icon)
Vue.prototype.$http = axios;  //axios挂载到Vue原型上

/* eslint-disable */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
