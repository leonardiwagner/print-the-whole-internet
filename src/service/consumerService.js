'use strict';

const producerService = require('./producerService')
const queue = require('rediskill')('redis', 6379)
const logger = require('winston')
logger.level = 'silly';

module.exports = {
  consume: () => {
    return queue.receiveMessage().then(url => {
      return producerService.produce(url)
    })
  }
}

