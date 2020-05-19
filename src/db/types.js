/**
* @author niansnana
* @Description 编写共享常用字符类型
* @Start_Writing_Date 2020-05-12 10:48:50
* @Last_Modified_Date 2020-05-12 10:48:50
*/
const Sequelize = require('sequelize')

module.exports = {
  STRING: Sequelize.STRING,
  DECIMAL: Sequelize.DECIMAL,
  TEXT: Sequelize.TEXT,
  INTEGER: Sequelize.INTEGER,
  BOOLEAN: Sequelize.BOOLEAN,
  FLOAT: Sequelize.FLOAT
}
