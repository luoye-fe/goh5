'use strict';

var fs = require('fs');
var path = require('path');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var upload = function(req, res) {
    var UploadImg = global.dbHandel.getModel('uploadImg');
    var _files = req.files.files;
    var files = [];
    if (_files.constructor === Object) {
        files.push(_files);
    } else {
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
                'file_name': fileName,
                'upload_time': Date.now()
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
}

var getImgList = function(req, res) {
    var query = req.query;
    var UploadImg = global.dbHandel.getModel('uploadImg');
    var limit = Number(query.limit) || 6;
    var page = Number(query.page) || 1;
    UploadImg.find({'user_name': req.session.user_name}).sort({ 'upload_time': -1 }).exec(function(err,docs){
        if(err){
            res.send(err);
        }else{
            UploadImg.find({'user_name': req.session.user_name }).exec(function(err, allDoc) {
                var resData = {
                    iserro: 0,
                    msg: '读取成功！',
                    data: {
                        imgList: docs,
                        totalItems: allDoc.length
                    }
                }
                res.send(resData);
            })
        }
    })
}

module.exports = function(Router) {
    Router.post('/img/:act', multipartMiddleware, function(req, res, next) {
        if (req.params.act === 'upload') {
            upload(req, res);
        }
    })
    Router.get('/img/:act', function(req, res, next) {
        if (req.params.act == 'list') {
            getImgList(req, res);
        }
    })
    return Router;
};
