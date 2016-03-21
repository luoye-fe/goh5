'use strict';

module.exports = function(Router) {
    Router.get('/delete', function(req, res, next) {
        var obj = req.query;
        if (req.session.isLogin && req.session.user_name !== null) {
            var Work = global.dbHandel.getModel('work');
            Work.find({ '_id': obj._id }).exec(function(err, docs) {
                if (docs[0].user_name === req.session.user_name) {
                    Work.remove({ '_id': obj._id, 'user_name': req.session.user_name }).exec(function(err, doc) {
                        if (err) {
                            var resData = {
                                iserro: 1,
                                msg: '错误',
                                data: err
                            }
                            res.send(resData);
                        } else {
                            var resData = {
                                iserro: 0,
                                msg: '删除成功',
                                data: doc
                            }
                            res.send(resData);
                        }
                    })
                } else {
                    var resData = {
                        iserro: 1,
                        msg: '您没有权限',
                        data: ''
                    }
                    res.send(resData);
                }
            })
        } else {
            var resData = {
                iserro: 1,
                msg: '您没有权限',
                data: ''
            }
            res.send(resData);
        }
    })
    return Router;
};
