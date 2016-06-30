const pull = require('pull-stream')
const {filter, map, take, through, drain} = pull
const {click, pullEvent} = require('./pull-dom-events')

const throughs =
    pull(
        filter(event => event.target.matches('.only-me')),
        map(event => event.target.textContent),
        through(data => console.count(data)),
        take(10)
    )

// clicks on the document filter out
// only classes that match `.only-me`
// grabbing the text content of the button via map
// logging that data to the console via through
// and taking only 10 clicks before ending the stream
pull(click(document), throughs, drain())
