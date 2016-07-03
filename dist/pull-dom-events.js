(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, function () { 'use strict';

    var partial = function (fn) {
        var args = [], len = arguments.length - 1;
        while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

        return fn.bind.apply(fn, [ fn ].concat( args ));
    }

    exports.pullEvent = function pullEvent(type, eventTarget, capture) {
        if ( capture === void 0 ) capture = false;

        var called = false
        var listener = function(next, event) {
            next(null, event)
        }
        return function read(end, next) {
            if (end) {
                eventTarget.removeEventListener(type, partial(listener, next), capture)
                return next(end)
            }
            if (!called) {
                called = true
                eventTarget.addEventListener(type, partial(listener, next), capture)
            }
        }
    }

    exports.click = function (elem, capture) { return pullEvent('click', elem, capture); }
    exports.dblclick = function (elem, capture) { return pullEvent('dblclick', elem, capture); }
    exports.mousedown = function (elem, capture) { return pullEvent('mousedown', elem, capture); }
    exports.mouseup = function (elem, capture) { return pullEvent('mouseup', elem, capture); }
    exports.mousemove = function (elem, capture) { return pullEvent('mousemove', elem, capture); }
    exports.mouseover = function (elem, capture) { return pullEvent('mouseover', elem, capture); }
    exports.mouseenter = function (elem, capture) { return pullEvent('mouseenter', elem, capture); }
    exports.mouseout = function (elem, capture) { return pullEvent('mouseout', elem, capture); }
    exports.mouseleave = function (elem, capture) { return pullEvent('mouseleave', elem, capture); }
    exports.keydown = function (elem, capture) { return pullEvent('keydown', elem, capture); }
    exports.keypress = function (elem, capture) { return pullEvent('keypress', elem, capture); }
    exports.keyup = function (elem, capture) { return pullEvent('keyup', elem, capture); }
    exports.load = function (elem, capture) { return pullEvent('load', elem, capture); }
    exports.unload = function (elem, capture) { return pullEvent('unload', elem, capture); }

}));