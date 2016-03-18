'use strict';

var fs = require('fs');
var path = require('path');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

module.exports = function(Router) {
    Router.post('/upload', multipartMiddleware, function(req, res, next) {
    	var UploadImg = global.dbHandel.getModel('uploadImg');
        var _files = req.files.files;
        var files = [];
        if(_files.constructor === Object){
        	files.push(_files);
        }else{
        	files = _files;
        }
        files.forEach(function(item) {
            var readFrom = fs.createReadStream(item.path);
            var fileName = path.basename(item.path);
            var saveTo = fs.createWriteStream(global.userPath + '/UploadImg/' + fileName);
            readFrom.pipe(saveTo);
            saveTo.on('finish', function() {
                fs.unlinkSync(item.path);
                UploadImg.create({
                	'user_name': req.session.user_name,
                	'file_name': fileName
                })
            });
        })
        var resData = {
        	iserro: 0,
        	msg: '上传成功',
        	data: ''
        }
        res.send(resData);
        res.end();
    })
    return Router;
};
