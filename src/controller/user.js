/**
* @author niansnana
* @Description user controller
* @Start_Writing_Date 2020-05-12 12:14:49
* @Last_Modified_Date 2020-05-12 12:14:49
*/
const { getUserInfo, createUser, deleteUser, updateUser } = require('../services/user')
const { SuccessModel, FailModel } = require('../model/ResModel')
const {
  registerUserNameExistInfo,
  registerUserNameNotExistInfo,
  registerFailInfo,
  loginFailed,
  updatePassisFailed,
  delCurUserFailed,
  changeInfoFailInfo
} = require('../model/ErrorModel')
const doCrypto = require('../utils/cryp')
const jwt = require('jsonwebtoken')
const { TOKEN_SECRET_KEY } = require('../conf/secretKeys')

/**
 * 查询用户名是否存在
 * @param {String} userName 用户名
 */
async function isExist (userName) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    // 用户名重复
    return new SuccessModel(userInfo)
  } else {
    // 用户名不存在
    return new FailModel(registerUserNameNotExistInfo)
  }
}

/**
 * 注册用户
 * @param {String} userName 用户名
 * @param {String} password 用户名
 * @param {String} gender 性别
 * @param {String} phone 用户名
 */
async function register ({ userName, password, gender, phone }) {
  const userInfo = await getUserInfo(userName)
  if (userInfo) {
    return new FailModel(registerUserNameExistInfo) // 用户名已经存在
  }
  try {
    await createUser({
      userName,
      password: doCrypto(password),
      gender,
      phone
    })
    return new SuccessModel()
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new FailModel(registerFailInfo)
  }
}

/**
 * 登录
 * @param {String} userName 用户名
 * @param {String} password 密码
 */
async function login (userName, password) {
  // 获取用户信息
  const userInfo = await getUserInfo(userName, doCrypto(password))
  if (!userInfo) {
    return new FailModel(loginFailed)
  }
  // 登录成功
  let token
  if (userInfo) {
    token = jwt.sign(userInfo, TOKEN_SECRET_KEY, { expiresIn: '7h' })
  }
  const result = {
    code: 200,
    data: userInfo.userName,
    token: token
  }
  return result
  // return new LoginModel({ userInfo, token })
}

/**
 * 查询用户信息
 * @param {String} userName 用户名
 */
async function userInfo (userName) {
  const userInfo = await getUserInfo(userName)
  return new SuccessModel(userInfo)
}

/**
 * 修改用户信息
 * @param {Function} ctx xtx
 * @param {String} nickName 昵称
 * @param {String} phone 电话
 * @param {String} avatar 头像
 */
async function changeInfo (ctx, { nickName, gender, avatar, phone }) {
  const { userName } = ctx.request.body
  // if (!nickName) {
  //   nickName = userName
  // }
  const result = await updateUser(
    {
      newNickName: nickName,
      newGender: gender,
      newAvatar: avatar,
      newPhone: phone
    },
    {
      userName
    }
  )
  if (result) {
    return new SuccessModel()
  }
  return new FailModel(changeInfoFailInfo)
}

async function changeAvatar (userName) {
  // 算了，最后弄吧，好麻烦（刚刚发现一个bug）
}

/**
 * 修改用户密码
 * @param {String} userName 用户名
 * @param {String} password 密码
 * @param {String} newPassword 新密码
 */
async function changePassword (userName, password, newPassword) {
  const result = await updateUser(
    {
      newPassword: doCrypto(newPassword)
    },
    {
      userName,
      password: doCrypto(password)
    }
  )
  if (result) {
    return new SuccessModel()
  }
  return new FailModel(updatePassisFailed)
}

/**
 * 删除当前用户
 * @param {String} userName 用户名
 */
async function deleteCurUser (userName) {
  const result = await deleteUser(userName)
  if (result) {
    return new SuccessModel()
  }
  return new FailModel(delCurUserFailed)
}

/**
 * 退出登录
 */
async function logout () {
  return new SuccessModel()
}

module.exports = {
  isExist,
  register,
  login,
  userInfo,
  changeInfo,
  changeAvatar,
  changePassword,
  deleteCurUser,
  logout
}
