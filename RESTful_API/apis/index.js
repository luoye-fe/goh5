'use strict';

var route = require('express').Router();

var routes = ['./root.js', './list.js', './create.js', './user.js', './delete.js', './work.js'];

module.exports = [];
routes.forEach(function(item) {
    module.exports.push(require(item)(route))
})
