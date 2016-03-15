'use strict';

var getWork = function(req, res) {
    var obj = req.query;
    var Work = global.dbHandel.getModel('work');
    Work.find({ '_id': obj._id, 'user_name': req.session.user_name }).exec(function(err, docs) {
        if (docs == '') {
            var resData = {
                iserro: 1,
                msg: '没有权限',
                data: {}
            };
            res.send(resData);
        } else {
            var resData = {
                iserro: 0,
                msg: '查询成功',
                data: docs[0]
            };
            res.send(resData);
        }
    })
}

var save = function(req, res) {
    var obj = req.query;
    var Work = global.dbHandel.getModel('work');
    Work.update({ 
        '_id': obj._id, 
        'user_name': req.session.user_name 
    }, { '$set': { 
            'mainCode': JSON.parse(obj.mainCode),
            'lastSaveTime': Date.now()
        } 
    }).exec(function(err, docs) {
        if (docs == '') {
            var resData = {
                iserro: 1,
                msg: '没有权限',
                data: {}
            };
            res.send(resData);
        } else {
            var resData = {
                iserro: 0,
                msg: '保存成功',
                data: docs
            };
            res.send(resData);
        }
    })
}


module.exports = function(Router) {
    Router.get('/work/:act', function(req, res, next) {
        if (req.params.act == 'getWork') {
            getWork(req, res);
            return;
        }
        if (req.params.act == 'save') {
            save(req, res);
            return;
        }
    })
    return Router;
};
