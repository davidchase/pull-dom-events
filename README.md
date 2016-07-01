# pull-dom-events
Simple [pull-stream](https://github.com/pull-stream/pull-stream) for DOM events

### Install

`npm install --save pull-dom-events`

### Usage



```js
const pull = require('pull-stream')
const {pullEvent, click} = require('pull-dom-events')
const {log, filter} = pull

pull(
    pullEvent('click', document),
    filter(event => event.target.matches(...)),
    log()
)

// or shorthand method

pull(
    click(document),
    filter(event => event.target.matches(...)),
    log()
)

```

#### `pullEvent(eventType, element, capture?)`

`pullEvent` takes a `eventType` such `click, mouseover, keydown, etc` an element such as `document` and an optional `capture` boolean.

### `eventType(element, capture?)`
`eventType` takes a element to bind to and an option `capture` boolean

Currently supporting the following event-types:

`click, dblclick, mousedown, mouseup, mousemove, mouseover, mouseenter, mouseout, mouseleave, keydown, keypress, keyup, load, unload `

```js
  click(document)
```



### Todo
- [ ] more tests
- [ ] more shorthand event types
