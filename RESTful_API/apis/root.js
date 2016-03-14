'use strict';

// api 权限控制
module.exports = function(Router) {
    // Router.get('/*', function(req, res, next) {
    //     if (req.session.isLogin) {
    //         next();
    //     } else {
    //         var resData = {
    //             iserro: 1,
    //             msg: '请登录！',
    //             data: ''
    //         }
    //         res.send(resData);
    //     }
    // })
    return Router
};
