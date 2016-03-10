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
                height: 504,
            },
            items: []
        }
    ]
}

// create work
module.exports = function(Router) {
    Router.post('/create', function(req, res, next) {
        var obj = req.body;
        var Work = global.dbHandel.getModel('work');
        Work.create({
            'user': req.cookies.user_name,
            'createTime': Date.now(),
            'lastSaveTime': Date.now(),
            'about':{
                title: obj.title
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
                    data: ''
                }
                res.send(resData);
            }
        })
    })
    return Router;
}
