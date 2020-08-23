/**
 * 跨域请求devServer代理配置
 1：先在项目的根目录下新建 vue.config.js 文件
 2：在module.exports内设置devServer来处理代理
 * **/
module.exports = {
  devServer: {
    proxy: {  //proxy 中可以写多个代理地址, proxy匹配规则是根据正则匹配
      // '/user': {
      //   //要访问的跨域的api的域名
      //   target: 'http://www.user.com',
      //   ws: true,
      //   secure: false, //使用http协议设置为false，https协议设置为true
      //   changOrigin: true,
      //   pathRewrite: {  // pathRewrite：不写只能修改代理的域名，如果写可以修改代理的域名和后边的路径
      //     '^/api': ''
      //   }
      // },
      // '/order': {
      //   target: 'http://www.order.com',
      //   ws: true,
      //   secure: false,
      //   changOrigin: true,
      // },
      // '/pay': {
      //   target: 'http://www.pay.com',
      //   ws: true,
      //   secure: false,
      //   changOrigin: true,
      // },
      // '/api': {
      //   target: 'http://127.0.0.1:8080',
      //   ws: true,
      //   secure: false,
      //   changOrigin: true,
      // },
    }
  }
}

