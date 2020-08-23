/**
 * article模块接口列表
 */

import base from './base' // 导入接口域名列表
import service from '../http' // 导入http中创建的axios实例
import qs from 'qs' // 根据需求是否导入qs模块

// const article = {
//   list: () => {
//     return service.get(`${base.mock}/api/list`).then(res => {
//       console.log(res.data)
//     })
//   }
// }
// export default article


//api接口配置
export const article = params => {
  return service.get('/api/list', params).then(res => res.data)
};
