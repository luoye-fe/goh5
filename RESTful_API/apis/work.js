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
    })
    return Router;
};
