'use strict'

const WORKER_CYCLE_TIME_MS = 500
const MAX_SIMULTANEOUS_PRODUCER_SERVICES = 2
const MAX_SIMULTANEOUS_CONSUMER_SERVICES = 5

const consumer = require('../service/consumerService')
const producer = require('../service/producerService')

const logger = require('winston')
logger.level = 'silly';

let simultaneousProducerServicesCount = 0
let simutaneousConsumerServicesCount = 0

let initialProfilesToConsume = [
  'https://www.linkedin.com/in/michaeltruog',
  'https://www.linkedin.com/in/jairtrejo',
  'https://www.linkedin.com/in/william-lyles-59583240',
  'https://www.linkedin.com/in/harryfrazierjr',
  'https://www.linkedin.com/in/dathan-guiley-6b66412',
  'https://www.linkedin.com/in/tedcohn',
  'https://www.linkedin.com/in/ericwgreene',
  'https://www.linkedin.com/in/chadgruka',
  'https://www.linkedin.com/in/dennis-ippel-9956b811',
  'https://www.linkedin.com/in/ryanjpeterson',
  'https://www.linkedin.com/in/jakevarghese',
  'https://www.linkedin.com/in/ryanjpeterson',
  'https://www.linkedin.com/in/jameskoshigoe',
  'https://www.linkedin.com/in/jloutre'
]

setInterval(function(){

  if(simutaneousConsumerServicesCount < MAX_SIMULTANEOUS_CONSUMER_SERVICES){
    simutaneousConsumerServicesCount++;
    consumer.consume().then(() => {
      simutaneousConsumerServicesCount--;
    })
  }

  if(simultaneousProducerServicesCount < MAX_SIMULTANEOUS_CONSUMER_SERVICES){
    simultaneousProducerServicesCount++;
    producer.consume().then(() => {
      simultaneousProducerServicesCount--;
    })
  }

  logger.log('warn', 'worker status producers: ' + simultaneousProducerServicesCount + ' consumers: ' + simutaneousConsumerServicesCount)
}, WORKER_CYCLE_TIME_MS)
