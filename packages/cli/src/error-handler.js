const EventEmitter = require('events')

class ErrorEmitter extends EventEmitter {}
const errorEmitter = new ErrorEmitter()

errorEmitter.on('event', () => {
    console.log('an event occurred!')
})
