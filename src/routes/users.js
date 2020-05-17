const router = require('koa-router')()
const {
  isExist,
  register,
  login,
  userInfo,
  deleteCurUser,
  changeInfo,
  changeAvatar,
  changePassword,
  logout
} = require('../controller/user')
// const { loginCheck } = require('../middlewares/loginChecks')

router.prefix('/user')

// 查询用户名是否存在
router.post('/isExist', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await isExist(userName)
})

// 创建用户
router.post('/register', async (ctx, next) => {
  const { userName, password, gender, phone } = ctx.request.body
  ctx.body = await register({ userName, password, gender, phone })
})

// 修改用户信息
router.patch('/changeInfo', async (ctx, next) => {
  const { nickName, gender, avatar, phone } = ctx.request.body
  console.log('请求体', ctx.request.body)
  ctx.body = await changeInfo(ctx, { nickName, gender, avatar, phone })
})

// 修改用户密码
router.patch('/changePassword', async (ctx, next) => {
  const { password, newPassword } = ctx.request.body
  const { userName } = ctx.session.userInfo
  ctx.body = await changePassword(userName, password, newPassword)
})

// 修改用户头像（连接七牛云
router.post('/upload', async (ctx, next) => {
  const { userName } = ctx.request.body
  ctx.body = await changeAvatar(userName)
})

// 删除用户
router.delete('/delete', async (ctx, next) => {
  const { userName } = ctx.session.userInfo
  ctx.body = await deleteCurUser(userName)
})

// 登录
router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  ctx.body = await login(userName, password)
})

// 查询用户信息
router.get('/detail/', async (ctx, next) => {
  const { userName } = ctx.query
  ctx.body = await userInfo(userName)
})

// 退出登录
router.post('/logout', async (ctx, next) => {
  ctx.body = await logout()
})

module.exports = router
