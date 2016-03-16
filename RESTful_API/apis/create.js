'use strict';
var setConfigDefault = {

}

var mainCodeDefault = {
    wholeAttr: {
        background: '#fff',
        bgmusic: ''
    },
    pages: [
        {
            main: {
                background: '#fff',
                type: '',
                height: 486,
            },
            items: []
        }
    ]
}

// create work
module.exports = function(Router) {
    Router.get('/create', function(req, res, next) {
        var obj = req.query;
        var Work = global.dbHandel.getModel('work');
        Work.create({
            'user_name': req.session.user_name,
            'title': obj.title,
            'createTime': Date.now(),
            'lastSaveTime': Date.now(),
            'about':{
                thumbnail: '/dist/img/eg.jpg'
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
    })
    return Router;
}
