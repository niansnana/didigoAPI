/**
* @author niansnana
* @Description 配置默认格式
* @Start_Writing_Date 2020-05-12 12:21:50
* @Last_Modified_Date 2020-05-12 12:21:50
*/
const { DEFAULT_AVATAR } = require('../conf/constant')

function _formatUserAvatar (obj) {
  if (obj.avatar === null) {
    obj.avatar = DEFAULT_AVATAR
  }
  return obj
}

function formatUser (list) {
  if (list === null) {
    return list
  }
  if (list instanceof Array) {
    return list.map(_formatUserAvatar)
  }
  return _formatUserAvatar(list)
}

module.exports = {
  formatUser
}
