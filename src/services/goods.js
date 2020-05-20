/**
* @author niansnana
* @Description goods_service
* @UpdateTime 2020-05-19 14:50:39
*/
const { Goods, Store } = require('../db/model/index')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
/**
 * 查询商品
 * @param {String} sort 关键词
 * @param {String} collectCart 归属用户（如果有归属，则相当于加入购物车）
 */
async function getGoodsList (sort, collectCart) {
  const WhereOpts = {}
  if (sort) {
    WhereOpts.sort = sort
  }
  if (collectCart) {
    WhereOpts.collectCart = collectCart
  }
  const result = await Goods.findAll({
    order: [
      ['id', 'desc']
    ],
    where: WhereOpts,
    include: [
      {
        model: Store,
        attributes: ['title', 'description']
      }
    ]
  })
  const GoodsData = result.map(row => row.dataValues)
  return GoodsData
}

/**
 * 查询商品详情
 * @param {Number} id 商品ID
 */
async function getGoodsDetail (id) {
  const WhereOpt = {}
  if (id) {
    WhereOpt.id = id
  }
  const result = await Goods.findOne({
    where: WhereOpt,
    include: [
      {
        model: Store,
        attributes: ['title', 'description', 'thumb', 'productScore', 'serviceScore', 'postScore']
      }
    ]
  })
  return result.dataValues
}

/**
 * 搜索商品
 * @param {String} keywords 关键词
 */
async function searchData (keywords) {
  const result = await Goods.findAndCountAll({
    attributes: ['title', 'description'],
    where: {
      title: {
        [Op.like]: '%' + keywords + '%'
      }
    }
  })
  if (result === null) {
    return result
  }
  const resultData = {
    count: result.count,
    data: result.rows
  }
  return resultData
}

/**
 * 更新商品表
 * @param {String} collectCart 修改字段
 * @param {String} userName 用户名
 */
async function updateCarts (
  {
    newTitle,
    newDescription,
    newPrice,
    newSales,
    newThumb,
    newSort,
    newStoreName,
    newCollectCart,
    newAddress
  },
  { id }
) {
  const updateData = {}
  if (newTitle) {
    updateData.title = newTitle
  }
  if (newDescription) {
    updateData.description = newDescription
  }
  if (newPrice) {
    updateData.price = newPrice
  }
  if (newSales) {
    updateData.sales = newSales
  }
  if (newThumb) {
    updateData.thumb = newThumb
  }
  if (newSort) {
    updateData.sort = newSort
  }
  if (newStoreName) {
    updateData.storeName = newStoreName
  }
  if (newCollectCart) {
    updateData.collectCart = newCollectCart
  }
  if (newAddress) {
    updateData.address = newAddress
  }
  const whereOpt = {
    id
  }
  const result = await Goods.update(updateData, {
    where: whereOpt
  })
  return result[0] > 0
}

module.exports = {
  getGoodsList,
  getGoodsDetail,
  updateCarts,
  searchData
}
