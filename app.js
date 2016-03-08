'use strict';

var express = require('express');
var bodyParser = require('body-parser');
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// 后台页面
app.get('/home', function(req, res, next) {
    app.use(lactate.static(pwd + '/Back_Stage/'));
    res.sendFile(pwd + '/Back_Stage/index.html');
})

// 前台页面
app.get('/show', function(req, res, next) {
    app.use(lactate.static(pwd + '/Front_Stage/'));
    res.sendFile(pwd + '/Front_Stage/index.html');
})

app.get('/', function(req, res) {
    res.redirect('/home');
})

routers.forEach(function(Router) {
    app.use('/api', Router);
})

app.listen(3030);

module.exports = app;
