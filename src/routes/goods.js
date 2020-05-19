/**
* @author niansnana
* @Description 商品路由
* @UpdateTime 2020-05-19 14:43:38
*/
const router = require('koa-router')()
const {
  GoodsList
} = require('../controller/goods')

router.prefix('/goods')

// 查询所有商品
router.get('/list', async (ctx, next) => {
  const { sort, collectCart } = ctx.request.query
  ctx.body = await GoodsList(sort, collectCart)
})

module.exports = router
