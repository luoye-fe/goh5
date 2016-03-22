'use strict';

var mutations = {};

// isIn 操作本元素style还是content中的style
mutations.SETSTYLE = function(state, index, params, isIn) {
    var str = isIn ? state.currentPageData.items[index].content.match(/style=\"([\s\S]+?)\"/)[1] : state.currentPageData.items[index].style;
    var arr1 = str.split(';');
    var result = {};
    for (var i = 0; i < arr1.length; i++) {
        if (arr1[i] !== '') {
            var arr2 = arr1[i].split(':');
            result[arr2[0].replace(/(^\s+)|(\s+$)/g, '')] = arr2[1].replace(/(^\s+)|(\s+$)/g, '');
        }
    }
    for (var item in params) {
        if (params[item] === '' && result[item]) {
            delete result[item];
        } else {
            result[item] = params[item];
        }
    }
    var resultStr = '';
    for (var item in result) {
        resultStr += item + ':' + result[item] + ';'
    }
    if (isIn) {
        state.currentPageData.items[index].content = state.currentPageData.items[index].content.replace(/style=\"([\s\S]+?)\"/, 'style="' + resultStr + '"');
    } else {
        state.currentPageData.items[index].style = resultStr;
    }
}

mutations.ADDCLASS = function(state, index, className) {
    var classStr = state.currentPageData.items[index].class;
    var classArray = classStr.split(' ');

    for(var i = 0;i < classArray.length;i++){
        if(className !== classArray[i]){
            classArray.push(className);
        }
    }
    state.currentPageData.items[index].class = classArray.join(' ').replace(/(^\s+)|(\s+$)/g, '');
}

mutations.REMOVECALSS = function(state, index, className) {
    var classStr = state.currentPageData.items[index].class;
    var classArray = classStr.split(' ');
    for(var i = 0;i < classArray.length;i++){
        if(className === classArray[i]){
            delete classArray[i];
        }
    }
    state.currentPageData.items[index].class = classArray.join(' ').replace(/(^\s+)|(\s+$)/g, '');
}

module.exports = mutations;
