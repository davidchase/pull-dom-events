'use strict'
const pull = require('pull-stream')
const {filter, map, take, through, drain, log, collect} = pull
const {pullEvent} = require('../index')
const test = require('ava')

class FakeDOMElement {
    constructor(nodeName) {
        this.listeners = {}
        this.nodeName = nodeName
        this.addEventListenerCalled = false
        this.removeEventListenerCalled = false
    }

    addEventListener(eventName, handler, optionsOrCapture) {
        this.listeners[eventName] = handler
        this.addEventListenerCalled = true
    }

    removeEventListener(eventName, handler, optionsOrCapture) {
        delete this.listeners[eventName]
        this.removeEventListenerCalled = true
    }

    trigger(eventName, ...args) {
        if (eventName in this.listeners) {
            this.listeners[eventName].apply(null, args)
        }
    }
}

const noop = () => ({})

test('emits data', function(t) {
    const element = new FakeDOMElement('foo')
    pull(pullEvent('test', element), take(3), collect((err, xs) => t.deepEqual(xs, [1,2,3])))
    return setTimeout(()  => (element.trigger('test', 1), element.trigger('test', 2), element.trigger('test', 3)), 0)
})

test('adds eventListener', function(t){
  const element = new FakeDOMElement('foo')
  pull(pullEvent('test', element), take(3), drain(noop, () => t.deepEqual(true, element.addEventListenerCalled)))
  return setTimeout(()  => (element.trigger('test', 1), element.trigger('test', 2), element.trigger('test', 3)), 0)
})

test('removes eventListener after ending', function(t){
  const element = new FakeDOMElement('foo')
  pull(pullEvent('test', element), take(3), drain(noop, () => t.deepEqual(true, element.removeEventListenerCalled)))
  return setTimeout(()  => (element.trigger('test', 1), element.trigger('test', 2), element.trigger('test', 3)), 0)
})
