'use strict';

const producerService = require('./producerService')
const queue = require('rediskill')('redis', 6379)

setTimeout(() => {

  queue.receiveMessage().then(url => {
    return producerService.produce(url)
  })
  .then(() => console.log("producer produced!"))
  .catch(e => console.log("baile de gala", e))

}, 2000)
