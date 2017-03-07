'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var lactate = require('lactate');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var pwd = __dirname;

var app = express();
var router = express.Router();
var port = 3030;

var routers = require('./RESTful_API/apis/index.js');
var dbConfig = require('./RESTful_API/db/config.js');
var env = require('./RESTful_API/env.config.js');

global.userPath = './User';
global.dbHandel = require('./RESTful_API/db/dbHandel.js');
global.db = mongoose.connect('mongodb://' + dbConfig[env].host + ':' + dbConfig[env].port + '/' + dbConfig[env].database, {
    user: dbConfig[env].username,
    pass: dbConfig[env].password
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'who am i ?',
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    saveUninitialized: true,
    resave: true
}));


// 用户上传的图片
app.use('/img', express.static(pwd + '/User/UploadImg/'));
// 用户上传的音乐
app.use('/audio', express.static(pwd + '/User/UploadMusic/'));
// 后台静态资源
app.use('/back', express.static(pwd + '/Back_Stage/'));
// 前台静态资源
app.use('/front', express.static(pwd + '/Front_Stage/'));


// 后台页面
app.get('/', function(req, res, next) {
    if (!req.session.isLogin) {
        res.clearCookie('isLogin');
        res.clearCookie('user_name');
    }
    res.sendFile(pwd + '/Back_Stage/index.html',{});
})

app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

// 前台页面
app.get('/show/:id', function(req, res, next) {
    var id = req.params.id;
    var Work = global.dbHandel.getModel('work');
    Work.find({ '_id': id }).exec(function(err, docs) {
        res.render(pwd + '/Front_Stage/index.html', {
            workData: docs[0]
        });
    })
})

routers.forEach(function(Router) {
    app.use('/api', Router);
})

app.listen(port);

module.exports = app;
