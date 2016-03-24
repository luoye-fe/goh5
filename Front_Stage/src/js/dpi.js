'use strict';
var clientW = document.body.clientWidth;
var percent = clientW / 320;
document.getElementById('GoH5ViewPort').setAttribute('content','width=320, initial-scale='+ percent +', maximum-scale='+ percent +', user-scalable=no');