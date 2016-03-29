'use strict';

var setConfigDefault = {
    loop: true,
    direction: 'vertical',
    autoBackPrePage: true,
    effect: 'slide'
}

var mainCodeDefault = {
    wholeAttr: {
        background: '#fff',
        bgmusic: '',
        bgmusicName: ''
    },
    pages: [{
        main: {
            background: '#fff',
            type: '',
            height: 486,
        },
        items: []
    }]
}

var create = function(req, res) {
    var obj = req.query;
    var Work = global.dbHandel.getModel('work');
    Work.create({
        'user_name': req.session.user_name,
        'title': obj.title,
        'createTime': Date.now(),
        'lastSaveTime': Date.now(),
        'about': {
            thumbnail: '/back/dist/img/eg.jpg',
            keyWords: '',
            desc: '',
        },
        'mainCode': mainCodeDefault,
        'setConfig': setConfigDefault,
        'saveRecord': {},
        'status': 0
    }, function(err, doc) {
        if (err) {
            res.send(err);
        } else {
            var resData = {
                iserro: 0,
                msg: '创建成功！',
                data: {
                    _id: doc._id
                }
            }
            res.send(resData);
        }
    })
}

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
    }, {
        '$set': {
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

var saveSet = function(req, res) {
    var obj = req.query;
    var Work = global.dbHandel.getModel('work');
    Work.update({
        '_id': obj.id,
        'user_name': req.session.user_name
    }, {
        '$set': {
            'title': obj.title,
            'about.keyWords': obj.keywords,
            'about.desc': obj.desc,
            'setConfig.loop': obj.loop,
            'setConfig.direction': obj.direction,
            'setConfig.effect': obj.effect,
            'setConfig.autoBackPrePage': obj.autoBackPrePage
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

var release = function(req,res){
    var obj = req.query;
    var Work = global.dbHandel.getModel('work');
    Work.update({
        '_id': obj.id,
        'user_name': req.session.user_name
    }, {
        '$set': {
            status: 1
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
                msg: '发布成功',
                data: docs
            };
            res.send(resData);
        }
    })
}


module.exports = function(Router) {
    Router.get('/work/:act', function(req, res, next) {
        if (req.params.act == 'create') {
            create(req, res);
        }
        if (req.params.act == 'getWork') {
            getWork(req, res);
        }
        if (req.params.act == 'save') {
            save(req, res);
        }
        if (req.params.act == 'saveSet') {
            saveSet(req, res);
        }
        if (req.params.act == 'release') {
            release(req, res);
        }
    })
    return Router;
};
