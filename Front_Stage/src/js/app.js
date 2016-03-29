'use strict';



// meta缩放
var clientW = document.body.clientWidth;
var percent = clientW / 320;
document.getElementById('GoH5ViewPort').setAttribute('content', 'width=320, initial-scale=' + percent + ', maximum-scale=' + percent + ', user-scalable=no');



var load = require('./load.js');
var music = require('./music.js');

var GoH5 = require('./goh5.js');
