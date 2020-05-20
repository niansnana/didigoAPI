/**
* @author niansnana
* @Description 商品路由
* @UpdateTime 2020-05-19 14:43:38
*/
const router = require('koa-router')()
const {
  goodsList,
  goodsDetail,
  addCarts
} = require('../controller/goods')

router.prefix('/goods')

// 查询所有商品
router.get('/list', async (ctx, next) => {
  const { sort, collectCart } = ctx.request.query
  ctx.body = await goodsList(sort, collectCart)
})

// 查询单个商品
router.get('/detail', async (ctx, body) => {
  const { id } = ctx.request.query
  ctx.body = await goodsDetail(id)
})

// 加入购物车
router.patch('/update', async (ctx, next) => {
  const { title, description, price, sales, thumb, sort, storeName, collectCart, address } = ctx.request.body
  ctx.body = await addCarts(ctx, { title, description, price, sales, thumb, sort, storeName, collectCart, address })
})

module.exports = router
