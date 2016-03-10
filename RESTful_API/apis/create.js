'use strict';
var setConfigDefault = {

}

var mainCodeDefault = {
    
}

// create work
module.exports = function(Router) {
    Router.get('/create', function(req, res, next) {
        var Work = global.dbHandel.getModel('work');
        Work.create({
            'user': req.cookies.user_name,
            'createTime': Date.now(),
            'lastSaveTime': Date.now(),
            'setConfig': setConfigDefault,
            'mainCode': mainCodeDefault,
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
