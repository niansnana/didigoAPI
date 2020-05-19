/**
* @author niansnana
* @Description 添加功能
* @Start_Writing_Date 2020-05-12 11:00:09
* @Last_Modified_Date 2020-05-12 11:00:09
*/
const User = require('./User')
const Goods = require('./Goods')
const Store = require('./Store')

// 外键
Goods.belongsTo(Store, {
  foreignKey: 'storeName'
})

module.exports = {
  User,
  Goods,
  Store
}
