/**
* @author niansnana
* @Description goods_service
* @UpdateTime 2020-05-19 14:50:39
*/
const { Goods, Store } = require('../db/model/index')
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

module.exports = {
  getGoodsList
}
