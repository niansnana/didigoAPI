/**
* @author niansnana
* @Description 编写统一的返回状态码
* @Start_Writing_Date 2020-05-12 10:18:46
* @Last_Modified_Date 2020-05-12 10:18:46
*/
module.exports = {
  // 用户名已存在
  registerUserNameExistInfo: {
    code: 1001,
    msg: '用户名已存在'
  },
  // 用户名不存在
  registerUserNameNotExistInfo: {
    code: 1002,
    msg: '用户名可用'
  },
  registerFailInfo: {
    code: 1003,
    msg: '注册失败'
  },
  loginFailed: {
    code: 1004,
    msg: '登录失败'
  },
  isNotLogin: {
    code: 1005,
    msg: '尚未登录'
  },
  updatePassisFailed: {
    code: 1006,
    msg: '修改密码失败'
  },
  delCurUserFailed: {
    code: 1007,
    msg: '删除用户失败'
  },
  changeInfoFailInfo: {
    code: 1008,
    msg: '修改用户信息失败'
  },
  uploadFileSizeFailInfo: {
    code: 1008,
    msg: '头像上传失败'
  },
  // 商品表
  goodsIsNull: {
    code: 2001,
    msg: '查询商品表失败'
  },
  cartsAddIsFail: {
    code: 2002,
    msg: '添加购物车失败'
  },
  cartsSubIsFail: {
    code: 2003,
    msg: '删除购物车失败'
  }
}
