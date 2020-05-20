/**
* @author niansnana
* @Description user service
* @Start_Writing_Date 2020-05-12 12:16:03
* @Last_Modified_Date 2020-05-12 12:16:03
*/
const { User } = require('../db/model/index')
const { formatUser } = require('./_format')

/**
 * 查询用户信息
 * @param {String} userName 用户名
 * @param {String} password 密码
 */
async function getUserInfo (userName, password) {
  // 查询条件
  const whereOpt = {
    userName
  }
  // 如果密码存在，追加到查询条件，增加准确性
  if (password) {
    Object.assign(whereOpt, { password })
  }
  // 查询
  const result = await User.findOne({
    attributes: ['id', 'userName', 'nickName', 'gender', 'avatar', 'phone', 'createdAt'], // 精确查询
    where: whereOpt
  })
  if (result == null) {
    return result
  }
  // 格式化返回查询结果
  const formatResult = formatUser(result.dataValues)
  return formatResult
}

/**
 * 创建用户
 * @param {String} userName 用户名
 * @param {String} password 密码
 * @param {String} userName 昵称
 * @param {Number} userName 性别
 * @param {Number} userName 电话
 */
async function createUser ({ userName, password, nickName, gender = 3, phone }) {
  const result = await User.create({
    userName,
    password,
    gender,
    nickName: nickName ? nickName : userName,
    phone
  })
  return result.dataValues
}

/**
 * 更新用户信息
 * @param {*} update { newPassword, newNickName, newAvatar, newPhone } 需要修改的信息
 * @param {*} option { userName, password } 判断条件
 */
async function updateUser ({ newPassword, newNickName, newGender, newAvatar, newPhone }, { userName, password }) {
  const updateData = {}
  // 拼接需要修改的字段
  if (newPassword) {
    updateData.password = newPassword
  }
  if (newNickName) {
    updateData.nickName = newNickName
  }
  if (newGender) {
    updateData.gender = newGender
  }
  if (newAvatar) {
    updateData.avatar = newAvatar
  }
  if (newPhone) {
    updateData.phone = newPhone
  }
  // 查询条件
  const whereOpt = {
    userName
  }
  if (password) {
    whereOpt.password = password
  }
  // 开始修改
  const result = await User.update(updateData, {
    where: whereOpt
  })
  return result[0] > 0 // 修改的行数是否大于0 true || false
}

/**
 * 删除用户
 * @param {String} userName 用户名
 */
async function deleteUser (userName) {
  const result = await User.destroy({
    where: {
      userName
    }
  })
  return result > 0 // 返回 true || false
}

module.exports = {
  getUserInfo,
  createUser,
  updateUser,
  deleteUser
}
