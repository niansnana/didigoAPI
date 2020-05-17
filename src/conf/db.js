/**
* @author niansnana
* @Description 配置数据库连接
* @Start_Writing_Date 2020-05-12 09:57:57
* @Last_Modified_Date 2020-05-12 09:57:57
*/

const { isProd } = require('../utils/env')

let MYSQL_CONF = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '3306',
  database: 'didigo'
}

// 线上环境
if (isProd) {
  MYSQL_CONF = {
    host: '47.102.197.151',
    user: 'root',
    password: 'nian0210',
    port: '3306',
    database: 'didigo'
  }
}

module.exports = {
  MYSQL_CONF
}
