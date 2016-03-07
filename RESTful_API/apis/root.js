'use strict';

module.exports = function(Router){
	Router.get('/',function(req,res,next){
		res.send('根路径!');
	})
	return Router
};