'use strict';

var express = require('express');
var lactate = require('lactate');
var mongoose = require('mongoose');
var fs = require('fs');
var pwd = __dirname;

var app = express();
var router = express.Router();
var port = 3030;

var routers = require('./Restful_API/apis/index.js');

global.dbHandel = require('./Restful_API/db/dbHandel.js');
global.db = mongoose.connect("mongodb://localhost:27017/goh5");

app.get('/', function(req, res, next) {
    res.send('<a href="/main">进入goh5</a>');
})

// 后台页面
app.get('/main', function(req, res, next) {
    app.use(lactate.static(pwd + '/Back_Stage/'));
    res.sendFile(pwd + '/Back_Stage/index.html');
})

// 前台页面
app.get('/show', function(req, res, next) {
    app.use(lactate.static(pwd + '/Front_Stage/'));
    res.sendFile(pwd + '/Front_Stage/index.html');
})

routers.forEach(function(Router) {
    app.use('/api', Router);
})

app.listen(3030);

module.exports = app;
