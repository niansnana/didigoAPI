/**
* @author niansnana
* @Description 创建店铺表
* @UpdateTime 2020-05-19 12:32:25
*/
const seq = require('../seq')
const { STRING, FLOAT } = require('../types')

const Store = seq.define('store', {
  title: {
    type: STRING,
    allowNull: false,
    comment: '店铺名称'
  },
  description: {
    type: STRING,
    comment: '店铺描述'
  },
  thumb: {
    type: STRING,
    comment: '店铺头像'
  },
  productScore: {
    type: FLOAT,
    allowNull: false,
    comment: '宝贝描述评价'
  },
  serviceScore: {
    type: FLOAT,
    allowNull: false,
    comment: '宝贝描述评价'
  },
  postScore: {
    type: FLOAT,
    allowNull: false,
    comment: '物流服务评价'
  }
})

module.exports = Store
