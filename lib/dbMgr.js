/**
 * 数据库sql的执行
 * date:16/12/5
 * @author wuqingkai
 * @todo 将来做分库(暂未想分库实现).目前用连接池直连数据库,若遇瓶颈,请增加缓存更新以及批量更新.
 */
var DBMgr = function(opts) {
    this.pool = createMysqlPool(opts);
    this.database = opts.database;
    this.name = opts.database + "-dbMgr";
};

module.exports = DBMgr;
var pro = DBMgr.prototype;

pro.query = function(sql, valueArray, cb) {
    var self = this;
    self.pool.acquire(function(err, client) {
        if (!!err) {
            console.error(`acquire err:${err}`);
            return;
        }
        client.query(sql, null, function(err, res) {
            self.pool.release(client);
            cb(err, res);
        });
    }, null);
};

var createMysqlPool = function(opts) {
    var mysqlConfig = opts;
    return require('generic-pool').Pool({
        name: 'mysqlPool',
        create: function(_cb) {
            var mysql = require('mysql');
            var client = mysql.createConnection({
                host: mysqlConfig.host,
                user: mysqlConfig.user,
                password: mysqlConfig.password,
                database: mysqlConfig.database
            });
            _cb(null, client);
        },
        destroy: function(client) {
            client.end();
        },
        validate : null,
        max : 10,
        min : 1,
        idleTimeoutMillis : 30000,
        reapIntervalMillis : 1000,
        log : false,
        priorityRange : 1,
        refreshIdle : null
    });
};