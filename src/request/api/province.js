/**
 * province模块接口列表
 */

import service from '../http' // 导入http中创建的axios实例

//api接口配置
export const queryUserRegion = params => {
  return service.get('/api/list', params).then(res => res.data)
};

export const queryList = params => {
  return service.get('/api/list', params).then(res => res.data)
};

export const queryChart = params => {
  return service.get('/api/list', params).then(res => res.data)
};
