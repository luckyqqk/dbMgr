var dbMgr = require('../dbMgr');
module.exports = function(app, opts) {
    var server = new dbMgr(app, opts);
    app.set('dbMgr', server, true);
    return server;
};