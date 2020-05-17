/**
* @author niansnana
* @Description 编写通用返回结果
* @Start_Writing_Date 2020-05-12 10:18:46
* @Last_Modified_Date 2020-05-12 10:18:46
*/
class baseModel {
  constructor({ code, data, msg }) {
    this.code = code
    if (data) {
      this.data = data
    }
    if (msg) {
      this.msg = msg
    }
  }
}

// 返回成功
class SuccessModel extends baseModel {
  constructor(data = {}) {
    super({
      code: 200,
      data
    })
  }
}

// 返回失败
class FailModel extends baseModel {
  constructor({ code, msg }) {
    super({
      code,
      msg
    })
  }
}

module.exports = {
  SuccessModel,
  FailModel
}
