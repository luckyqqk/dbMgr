/**
 * 数据库sql的执行
 * date:16/12/5
 * @author wuqingkai
 * @todo 将来做分库(暂未想分库实现).目前用连接池直连数据库,若遇瓶颈,请增加缓存更新以及批量更新.
 */
var DBMgr = function(opts) {
    var mysql = require('mysql');
    this.pool = mysql.createPool(opts);
    this.database = opts.database;
    this.name = opts.database + "-dbMgr";
};

module.exports = DBMgr;
var pro = DBMgr.prototype;

pro.query = function(sql, valueArray, cb) {
    this.pool.query(sql, valueArray, cb);
};