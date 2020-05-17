/**
* @author niansnana
* @Description 编写不同的环境
* @Start_Writing_Date 2020-05-12 09:53:19
* @Last_Modified_Date 2020-05-12 09:53:19
*/
const ENV = process.env.NODE_ENV

module.exports = {
  /**
   * Dev：开发环境
   * Prod：线上环境
   */
  isDev: ENV === 'dev',
  notDev: ENV !== 'dev',
  isProd: ENV === 'production',
  notProd: ENV !== 'production'
}
