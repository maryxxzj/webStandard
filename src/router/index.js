import Vue from 'vue'
import Router from 'vue-router'
import menus from '@/config/menuConfig'

Vue.use(Router)
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

let routes = []
menus.forEach((item) => {
  if (item.sub) {
    item.sub.forEach((sub) => {
      routes.push({
        path: `/${sub.id}`,
        name: sub.name,
        // component: () => import(`@/components/${sub.id}`) // 因文件在不同的目录结构下，所以component 通过传参形式来写
        component: () => import(`@/${sub.component}`)
      })
    })
  } else {
    routes.push({
      path: `/${item.id}`,
      name: item.name,
      // component: () => import(`@/components/${item.id}`)
      component: () => import(`@/${item.component}`)
    })
  }
})

export default new Router({
  routes: routes
})
