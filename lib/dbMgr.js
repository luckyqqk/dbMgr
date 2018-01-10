var mysql = require('mysql');
/**
 * 数据库sql的执行
 * date:16/12/5
 * @author wuqingkai
 * @todo 将来做分库(暂未想分库实现).目前用连接池直连数据库,若遇瓶颈,请增加缓存更新以及批量更新.
 */
var DBMgr = function(app, opts) {
    this.app = app;
    this.opts = opts || {};
    this.database = this.opts.database;
    this.name = this.opts.database + "-dbMgr";
};

module.exports = DBMgr;

DBMgr.prototype.start = function(cb) {
    this.pool = mysql.createPool(this.opts);
    cb();
};

DBMgr.prototype.stop = function(cb) {
    cb();
};

DBMgr.prototype.query = function(sql, valueArray, cb) {
    this.pool.query(sql, valueArray, cb);
};