/**  vuex配置  **/
import Vue from 'vue'
import Vuex from 'vuex'
import fa from 'element-ui/src/locale/lang/fa'

Vue.use(Vuex)
// 定义属性（数据）
var state = {
  token: '2222',
  keepAlive: [],
  network: false
}
// 定义getters
var getters = {
  keepAlive: state => state.keepAlive
}
// 定义actions，要执行的操作，如流程判断、异步请求等
const actions = {}
// 定义mutations，处理状态（数据）的改变
const mutations = {
  getToken (state) {
    if (sessionStorage.getItem('token')) {
      state.token = sessionStorage.getItem('token')
      console.log(state.token)
    }
  },
  setKeepAlive: (state, keepAlive) => {
    state.keepAlive = keepAlive
  }
}

// 创建store对象
const store = new Vuex.Store({
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
})

// 导出store对象
export default store
