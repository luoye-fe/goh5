'use strict';

var mutations = {};

// isIn 操作本元素style还是content中的style
mutations.SETSTYLE = function(state, index, params, isIn) {
    var str = isIn ? state.currentPageData.items[index].content.match(/style=\"([\s\S]+)\"/)[1] : state.currentPageData.items[index].style;
    str = str.replace(/[\s]/ig, '')
    var arr1 = str.split(';');
    var result = {};
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== '') {
            var arr2 = arr1[i].split(':');
            result[arr2[0]] = arr2[1];
        }
    }
    for (var item in params) {
        result[item] = params[item];
    }
    var resultStr = '';
    for (var item in result) {
        resultStr += item + ':' + result[item] + ';'
    }
    if (isIn) {
        state.currentPageData.items[index].content = state.currentPageData.items[index].content.replace(/style=\"([\s\S]+)\"/, 'style="' + resultStr + '"');
    } else {
        state.currentPageData.items[index].style = resultStr;
    }
}

module.exports = mutations;
