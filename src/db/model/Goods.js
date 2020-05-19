/**
* @author niansnana
* @Description 创建商品表
* @UpdateTime 2020-05-19 12:11:59
*/
const seq = require('../seq')
const { STRING, INTEGER } = require('../types')

const Goods = seq.define('goods', {
  title: {
    type: STRING,
    allowNull: false,
    comment: '商品名称'
  },
  description: {
    type: STRING,
    comment: '商品描述'
  },
  price: {
    type: INTEGER,
    allowNull: false,
    comment: '商品价格'
  },
  sales: {
    type: INTEGER,
    comment: '销量'
  },
  thumb: {
    type: STRING,
    comment: '封面图'
  },
  sort: {
    type: STRING,
    allowNull: false,
    defaultValue: 1,
    comment: '归属分类'
  },
  storeName: {
    type: INTEGER,
    allowNull: false,
    comment: '归属店铺'
  },
  collectCart: {
    type: INTEGER,
    defaultValue: 0,
    comment: '是否加入购物车'
  },
  address: {
    type: STRING,
    comment: '商品产地'
  }
})

module.exports = Goods
