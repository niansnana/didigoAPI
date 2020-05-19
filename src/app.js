const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const jwtKoa = require('koa-jwt')

const { TOKEN_SECRET_KEY } = require('./conf/secretKeys')

// 解决跨域
app.use(cors({
  origin: function (ctx) {
    if (ctx.url === '/test') {
      return false
    }
    // return 'http://127.0.0.1:8080' // 允许的域名请求
    return '*' // 允许所有域名请求
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

// 接口路由
const users = require('./routes/users') // 用户表
const goods = require('./routes/goods') // 商品表

// error handler
onerror(app)

app.use(async (ctx, next) => {
  await next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        data: null,
        message: 'token无效'
      }
    } else {
      throw err
    }
  })
})

app.use(jwtKoa({
  secret: TOKEN_SECRET_KEY
}).unless({
  // 忽略验证文件
  path: ['/user/login', '/user/register', '/user/isExist', '/user/logout', '/goods/list']
}))

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(users.routes(), users.allowedMethods())
app.use(goods.routes(), goods.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
