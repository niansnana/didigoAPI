/**
* @author niansnana
* @Description 对密码进行加密
* @Start_Writing_Date 2020-05-12 10:42:46
* @Last_Modified_Date 2020-05-12 10:42:46
*/
const crypto = require('crypto')
const { CRYPTO_SECRET_KEY } = require('../conf/secretKeys')

/**
 * 编写加密函数
 * @param {String} content 对内容进行加密
 */
function _md5 (content) {
  const md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex') // 同时进行16进制转换
}

/**
 * 调用加密函数对明文密码加密
 * @param {String} content 输入的明文密码
 */
function doCrypto (content) {
  const str = `password=${content}&key=${CRYPTO_SECRET_KEY}`
  return _md5(str)
}

module.exports = doCrypto
