'use strict';

var route = require('express').Router();

var routes = ['./root.js', './list.js', './user.js', './delete.js', './work.js', './img.js', './audio.js'];

module.exports = [];
routes.forEach(function(item) {
    module.exports.push(require(item)(route))
})
