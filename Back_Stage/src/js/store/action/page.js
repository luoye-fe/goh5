'use strict';


var actions = {};


actions.selectPage = function(store, idnex) {
    store.dispatch('SELECTPAGE', idnex);
}

actions.addPage = function(store) {
    store.dispatch('ADDPAGE');
}

actions.delPage = function(store, index) {
    if (store.state.pagesData.length === 1) {
        store.dispatch('ALERT', {
            show: true,
            msg: '至少保留一页',
            type: 'warning'
        });
        setTimeout(function() {
            store.dispatch('HIDEALERT');
        }, 2500);
        return;
    }
    store.dispatch('DELPAGE', index);
}

module.exports = actions;
