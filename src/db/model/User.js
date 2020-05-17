/**
* @author niansnana
* @Description 创建用户表
* @Start_Writing_Date 2020-05-12 10:48:16
* @Last_Modified_Date 2020-05-12 10:48:16
*/
const seq = require('../seq')
const { STRING, DECIMAL } = require('../types')

const User = seq.define('user', {
  userName: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '用户名且唯一'
  },
  password: {
    type: STRING,
    allowNull: false,
    comment: '密码'
  },
  nickName: {
    type: STRING,
    allowNull: false,
    comment: '昵称'
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    defaultValue: 3,
    comment: '性别（1：男，2：女，3：保密）'
  },
  avatar: {
    type: STRING,
    comment: '头像'
  },
  phone: {
    type: STRING,
    allowNull: false,
    comment: '电话'
  }
})

module.exports = User
