'use strict';

var fs = require('fs');
var path = require('path');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var upload = function(req, res) {
    var UploadMusic = global.dbHandel.getModel('uploadMusic');
    var files = req.files.files;
    var readFrom = fs.createReadStream(files.path);
    var fileName = path.basename(files.path);
    var saveTo = fs.createWriteStream(global.userPath + '/UploadMusic/' + fileName);
    readFrom.pipe(saveTo);
    UploadMusic.create({
        'user_name': req.session.user_name,
        'upload_time': Date.now(),
        'file_path': '/audio/' + fileName,
        'file_name': req.query.file_name,
        'file_size': req.query.file_size,
    })
    saveTo.on('finish', function() {
        fs.unlinkSync(files.path);
        var resData = {
            iserro: 0,
            msg: '上传成功',
            data: ''
        }
        res.send(resData);
    });
}

var getMusicList = function(req, res) {
    var query = req.query;
    var UploadMusic = global.dbHandel.getModel('uploadMusic');
    var limit = Number(query.limit) || 6;
    var page = Number(query.page) || 1;
    UploadMusic.find({ 'user_name': req.session.user_name }).sort({ 'upload_time': -1 }).limit(limit).skip((page - 1) * limit).exec(function(err, docs) {
        if (err) {
            res.send(err);
        } else {
            UploadMusic.find({ 'user_name': req.session.user_name }).exec(function(err, allDoc) {
                var resData = {
                    iserro: 0,
                    msg: '读取成功！',
                    data: {
                        musicList: docs,
                        totalItems: allDoc.length
                    }
                }
                res.send(resData);
            })
        }
    })
}

module.exports = function(Router) {
    Router.post('/audio/:act', multipartMiddleware, function(req, res, next) {
        if (req.params.act === 'upload') {
            upload(req, res);
        }
    })
    Router.get('/audio/:act', function(req, res, next) {
        if (req.params.act == 'list') {
            getMusicList(req, res);
        }
    })
    return Router;
};
