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

    function saveFile() {
        return new Promise((resolve, reject) => {
            var currentFileList = files;
            function innerLoop() {
                var item = currentFileList[0];
                if (!item) return resolve();
                var readFrom = fs.createReadStream(item.path);
                var fileName = path.basename(item.path);
                var saveTo = fs.createWriteStream(global.userPath + '/UploadImg/' + fileName);
                readFrom.pipe(saveTo);
                UploadImg.create({
                    'user_name': req.session.user_name,
                    'file_name': fileName,
                    'upload_time': Date.now()
                })
                saveTo.on('finish', function() {
                    fs.unlinkSync(item.path);
                    currentFileList.splice(0, 1);
                    innerLoop();
                });
                saveTo.on('error', function(e) {
                    reject(e);
                });
            }
            innerLoop();
        });
    }

    saveFile()
        .then(() => {
            var resData = {
                iserro: 0,
                msg: '上传成功',
                data: ''
            }
            res.send(resData);
        })
        .catch(e => {
            res.send({
                iserro: 1,
                msg: e,
                data: ''
            });
        })
}

var getImgList = function(req, res) {
    var query = req.query;
    var UploadImg = global.dbHandel.getModel('uploadImg');
    var limit = Number(query.limit) || 6;
    var page = Number(query.page) || 1;
    UploadImg.find({ 'user_name': req.session.user_name }).sort({ 'upload_time': -1 }).limit(limit).skip((page - 1) * limit).exec(function(err, docs) {
        if (err) {
            res.send(err);
        } else {
            UploadImg.find({ 'user_name': req.session.user_name }).exec(function(err, allDoc) {
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

var uploadThumbnail = function(req, res) {
    var file = req.files.file;
    var id = req.query.id;
    var readFrom = fs.createReadStream(file.path);
    var fileName = path.basename(file.path);
    var saveTo = fs.createWriteStream(global.userPath + '/UploadImg/' + fileName);
    readFrom.pipe(saveTo);
    var Work = global.dbHandel.getModel('work');
    Work.update({
        'user_name': req.session.user_name,
        '_id': id
    }, {
        '$set': {
            'about.thumbnail': '/img/' + fileName
        }
    }).exec(function(err, docs) {
        var resData = {
            iserro: 0,
            msg: '上传成功',
            data: docs
        };
        res.send(resData);
    })
    saveTo.on('finish', function() {
        fs.unlinkSync(file.path);
    });
}

module.exports = function(Router) {
    Router.post('/img/:act', multipartMiddleware, function(req, res, next) {
        if (req.params.act === 'upload') {
            upload(req, res);
        }
        if (req.params.act == 'uploadThumbnail') {
            uploadThumbnail(req, res);
        }
    })
    Router.get('/img/:act', function(req, res, next) {
        if (req.params.act == 'list') {
            getImgList(req, res);
        }
    })
    return Router;
};
