/**
* @author niansnana
* @Description 登录验证中间件
* @Start_Writing_Date 2020-05-12 14:42:23
* @Last_Modified_Date 2020-05-12 14:42:23
*/
const { FailModel } = require('../model/ResModel')
const { isNotLogin } = require('../model/ErrorModel')
const jwt = require('jsonwebtoken')
const { TOKEN_SECRET_KEY } = require('../conf/secretKeys')

/**
 * 接口登录验证
 * @param {Object} ctx ctx
 * @param {Object} next next
 */
async function loginCheck (ctx, next) {
  const { authorization = '' } = ctx.request.header
  const token = authorization.replace('Bearer ', '')
  try {
    const user = jwt.verify(token, TOKEN_SECRET_KEY)
    ctx.state.user = user
  } catch (err) {
    ctx.body = new FailModel(isNotLogin)
  }
  await next()
}

module.exports = {
  loginCheck
}
