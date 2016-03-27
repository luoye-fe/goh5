'use strict';

// list?limit=10&page=1&me=1
module.exports = function(Router) {
    Router.get('/list', function(req, res, next) {
        var query = req.query;
        var Work = global.dbHandel.getModel('work');
        var limit = Number(query.limit) || 7;
        var page = Number(query.page) || 1;
        if (query.me == '1') {
            Work.find({ 'user_name': req.session.user_name }).sort({ 'createTime': -1 }).limit(limit).skip((page - 1) * limit).exec(function(err, docs) {
                if (err) {
                    res.send(err);
                } else {
                    Work.find({ 'user_name': req.session.user_name }).exec(function(err, allDoc) {
                        var resData = {
                            iserro: 0,
                            msg: '读取成功！',
                            data: {
                                listData: docs,
                                totalItems: allDoc.length
                            }
                        }
                        res.send(resData);
                    })
                }
            })
        } else {
            Work.find({ 'status': 1 }).sort({ 'createTime': -1 }).limit(limit).skip((page - 1) * limit).exec(function(err, docs) {
                if (err) {
                    res.send(err);
                } else {
                    Work.find({ 'status': 1 }).exec(function(err, allDoc) {
                        var resData = {
                            iserro: 0,
                            msg: '读取成功！',
                            data: {
                                listData: docs,
                                totalItems: allDoc.length
                            }
                        }
                        res.send(resData);
                    })
                }
            })
        }
    })
    return Router;
}
