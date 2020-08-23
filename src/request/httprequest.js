/*  axios封装 —— 请求拦截、响应拦截、错误统一处理  */
import axios from 'axios'   // 引入axios
import QS from 'qs' // 引入qs模块，用来序列化post类型的数据
import router from '../router'
import store from '../store/index' // 需使用vuex的状态对象

// 环境的切换
if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = 'https://127.0.0.1:8080'
} else if (process.env.NODE_ENV == 'debug') {
  axios.defaults.baseURL = 'https://www.ceshi.com'
} else if (process.env.NODE_ENV == 'production') {
  axios.defaults.baseURL = 'https://www.production.com'
}

// 通过axios.defaults.timeout设置默认的请求超时时间
axios.defaults.timeout = 10000

// post请求头的设置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
//请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = store.state.token
    token && (config.headers.Authorization = token)
    return config
  },
  error => {
    return Promise.error(error)
  })
// 响应拦截器
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据，否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是2开头的的情况，可以跟后台开发人员协商好统一的错误状态码， 然后根据返回的状态码进行一些操作。
  error => {
    if (error.response.status) {
      errorHandle(error.response.status, error.response.data.message)
      return Promise.reject(error.response)
    }
  })

// 请求失败后的错误统一处理
const errorHandle = (status, otherMsg) => {
  switch (status) {
    // 401: 未登录，未登录则跳转登录页面，并携带当前页面的路径，在登录成功后返回当前页面。
    case 401:
      toLogin()
      break

    // 403 token过期，登录过期对用户进行提示， 清除本地token和清空vuex中token对象，跳转登录页面
    case 403:
      tip('登录过期，请重新登录')
      // 清除token
      localStorage.removeItem('token')
      store.commit('loginSuccess', null)
      // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
      setTimeout(() => {
        toLogin()
      }, 1000)
      break

    // 404请求不存在
    case 404:
      tip('网络请求不存在')
      break
    // 其他错误，直接抛出错误提示
    default:
      tip(otherMsg)
  }
}
// 提示函数 —— 禁止点击蒙层、显示一秒后关闭
const tip = msg => {
  this.$message({
    message: msg,
    duration: 1000,
    type: 'info'
  })
}

// 跳转登录页 —— 携带当前页面路由，在登录页面完成登录后返回当前页面
const toLogin = () => {
  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

/**
 * 封装get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @returns {Promise}
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

/**
 * 封装post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params
 * @returns {Promise}
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    // axios.post(url, JSON.stringify(params))
    axios.post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.data)
      })
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(res => {
        resolve(res.data);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(res => {
        resolve(res.data);
      }, err => {
        reject(err)
      })
  })
}
