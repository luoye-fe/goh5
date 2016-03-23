/*
 ************************************************
 * @author:luoye https://github.com/luoye-fe
 * @desc:event on/trigger/one/off
 * @time:2015.01.16
 ************************************************
 */
(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.Event = factory();
})(this, function() {
    var e = {};
    var _each = function(arr, fn) {
        var ret;
        for (var i = 0; i < arr.length; i++) {
            var n = arr[i];
            ret = fn.call(n, i, n)
        }
        return ret;
    }

    e.cache = {};
    e.offlineCache = [];
    e.isOne = false;
    e.on = function(key, fn) {
        var _this = this;
        if (this.cache[key] === undefined) {
            this.cache[key] = [];
            this.cache[key].push(fn);
        } else {
            this.cache[key].push(fn);
        }
        var _current = [];
        _each(this.offlineCache, function(index, item) {
            if (item[key] !== undefined) {
                var _obj = {};
                _obj[key] = item[key];
                _current.push(_obj);
            }
        })
        if (_current.length > 0) {
            if (_this.isOne) {
                e.trigger(key, _current[_current.length - 1][key]);
            } else {
                _each(_current, function(index, item) {
                    e.trigger(key, item[key]);
                })
            }
        }
    }
    e.one = function(key, fn) {
        this.isOne = true;
        this.on(key, fn);
        this.isOne = false;
    }
    e.off = function(key, fn) {
        if (this.cache[key]) {
            if (fn) {
                fn && fn();
                this.cache[key] = [];
            } else {
                this.cache[key] = [];
            }
        }
        this.offlineCache = [];
    }
    e.trigger = function(key, value) {
        var _this = this;
        var stack = this.cache[key];
        if (!stack || !stack.length) {
            var _current = {};
            _current[key] = value;
            this.offlineCache.push(_current);
            return;
        } else {
            if (this.isOne) {
                stack[0].call(_this, value);
                this.cache[key] = [];
            } else {
                return _each(stack, function() {
                    return this.call(_this, value);
                })
            }
        }
    }
    return e;
})
