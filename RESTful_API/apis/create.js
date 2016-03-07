'use strict';

// /create
module.exports = function(Router) {
    Router.get('/create', function(req, res, next) {
        var Work = global.dbHandel.getModel('work');
        Work.create({
            'user': 'admin',
            'createTime': new Date().getTime(),
            'lastSaveTime': new Date().getTime(),
            'setConfig': {},
            'mainCode': {},
            'saveRecord': {},
            'status': 0
        }, function(err, doc) {
            if (err) {
                res.send(err);
                console.log(err);
            } else {
                res.send('创建成功!');
            }
        })

    })
    return Router;
}
