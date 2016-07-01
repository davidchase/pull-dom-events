'use strict';

exports.pullEvent = function pullEvent(type, eventTarget, capture = false) {
    let callback
    const listener = function(evnt) {
        if (callback) {
            return callback(null, evnt)
        }
    }
    eventTarget.addEventListener(type, listener, capture)
    return function read(end, next) {
        if (end) {
            eventTarget.removeEventListener(type, listener, capture)
            return next(end)
        }
        callback = next
    }
}

exports.click = (elem, capture) => pullEvent('click', elem, capture)
exports.dblclick = (elem, capture) => pullEvent('dblclick', elem, capture)
exports.mousedown = (elem, capture) => pullEvent('mousedown', elem, capture)
exports.mouseup = (elem, capture) => pullEvent('mouseup', elem, capture)
exports.mousemove = (elem, capture) => pullEvent('mousemove', elem, capture)
exports.mouseover = (elem, capture) => pullEvent('mouseover', elem, capture)
exports.mouseenter = (elem, capture) => pullEvent('mouseenter', elem, capture)
exports.mouseout = (elem, capture) => pullEvent('mouseout', elem, capture)
exports.mouseleave = (elem, capture) => pullEvent('mouseleave', elem, capture)
exports.keydown = (elem, capture) => pullEvent('keydown', elem, capture)
exports.keypress = (elem, capture) => pullEvent('keypress', elem, capture)
exports.keyup = (elem, capture) => pullEvent('keyup', elem, capture)
exports.load = (elem, capture) => pullEvent('load', elem, capture)
exports.unload = (elem, capture) => pullEvent('unload', elem, capture)
