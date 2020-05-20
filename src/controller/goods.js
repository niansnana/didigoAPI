/**
* @author niansnana
* @Description goods_controller
* @UpdateTime 2020-05-19 14:47:55
*/
const {
  getGoodsList,
  getGoodsDetail,
  updateCarts,
  searchData
} = require('../services/goods')
const { SuccessModel, FailModel } = require('../model/ResModel')
const {
  goodsIsNull,
  cartsAddIsFail,
  searchGoodsIsNull
} = require('../model/ErrorModel')

/**
 * 查询商品数据
 * @param {String} sort 关键词
 * @param {String} collectCart 归属用户
 */
async function goodsList (sort, collectCart) {
  const result = await getGoodsList(sort, collectCart)
  if (result) {
    return new SuccessModel(result)
  } else {
    return new FailModel(goodsIsNull)
  }
}

/**
 * 获取商品详情
 * @param {Number} id 商品ID
 */
async function goodsDetail (id) {
  const result = await getGoodsDetail(id)
  if (result) {
    return new SuccessModel(result)
  } else {
    return new FailModel(goodsIsNull)
  }
}

/**
 * 将购物车加入当前用户
 * @param {String} collectCart 修改字段
 * @param {String} userName 用户名
 */
async function addCarts (ctx, { title, description, price, sales, thumb, sort, storeName, collectCart, address }) {
  const { id } = ctx.request.body
  const result = await updateCarts(
    {
      newTitle: title,
      newDescription: description,
      newPrice: price,
      newSales: sales,
      newThumb: thumb,
      newSort: sort,
      newStoreName: storeName,
      newCollectCart: collectCart,
      newAddress: address
    },
    {
      id
    }
  )
  if (result) {
    return new SuccessModel()
  }
  return new FailModel(cartsAddIsFail)
}

/**
 * 通过关键词搜索商品
 * @param {String} keywords 关键词
 */
async function getSearchData (keywords) {
  const result = await searchData(keywords)
  if (result) {
    return new SuccessModel(result)
  } else {
    return new FailModel(searchGoodsIsNull)
  }
}

module.exports = {
  goodsList,
  goodsDetail,
  addCarts,
  getSearchData
}
