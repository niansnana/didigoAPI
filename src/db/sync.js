/**
* @author niansnana
* @Description 同步到数据库
* @Start_Writing_Date 2020-05-12 10:58:41
* @Last_Modified_Date 2020-05-12 10:58:41
*/
const seq = require('./seq')
require('./model/index')

// 测试连接
seq.authenticate().then(() => {
  console.log('auth is ok')
}).catch(() => {
  console.log('auth is fail')
})

// 同调
seq.sync({ force: true }).then(() => {
  console.log('sync ok')
  process.exit()
})
