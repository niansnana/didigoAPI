/**
* @author niansnana
* @Description goods_controller
* @UpdateTime 2020-05-19 14:47:55
*/
const {
  getGoodsList
} = require('../services/goods')
const { SuccessModel, FailModel } = require('../model/ResModel')
const { goodsIsNull } = require('../model/ErrorModel')

/**
 * 查询商品数据
 * @param {String} sort 关键词
 * @param {String} collectCart 归属用户
 */
async function GoodsList (sort, collectCart) {
  const result = await getGoodsList(sort, collectCart)
  if (result) {
    return new SuccessModel(result)
  } else {
    return new FailModel(goodsIsNull)
  }
}

module.exports = {
  GoodsList
}
