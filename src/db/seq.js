/**
* @author niansnana
* @Description 添加功能：Sequelize
* @Start_Writing_Date 2020-05-12 09:52:30
* @Last_Modified_Date 2020-05-12 09:52:30
*/
const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../conf/db')
const { host, user, password, database } = MYSQL_CONF
const { isProd } = require('../utils/env')

const conf = {
  host,
  dialect: 'mysql' // 连接数据库的类型
}

// 配置线上环境连接池
if (isProd) {
  conf.pool = {
    max: 5,
    min: 0,
    idle: 10000
  }
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq
