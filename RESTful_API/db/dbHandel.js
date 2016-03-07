'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var models = require("./models.js");

for (var item in models) {
    mongoose.model(item, new Schema(models[item]));
}

var _getModel = function(type) {
    return mongoose.model(type);
}

module.exports = {
    getModel: function(type) {
        return _getModel(type);
    }
}
