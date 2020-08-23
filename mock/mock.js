/* 桩数据 mock */
import Mock from 'mockjs' // 引入mockjs
const Random = Mock.Random // 获取 mock.Random 对象

// Mock.setup({
//   timeout: 1000  //设置请求延时时间
// })
// mock一组数据
const produceData = function () {
  let articles = []
  for (let i = 0; i < 50; i++) {
    let newArticleObject = {
      title: Random.csentence(5, 30), //  Random.csentence( min, max )
      thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Random.cname(), // Random.cname() 随机生成一个中文姓名
      date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    }
    articles.push(newArticleObject)
  }
  return articles
}
// 拦截ajax请求，配置mock的数据
Mock.mock('/api/list', 'get', produceData)
