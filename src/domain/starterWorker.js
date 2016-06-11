'use strict'

const initialProfilesToProduce = [
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

const producer = require('../service/producerService')
const logger = require('winston')
logger.level = 'silly'

const producerFunctions = initialProfilesToProduce.map(url => producer.produce(url))


logger.log('info', 'starter worker starting to produce from ' + initialProfilesToProduce.length + ' profiles')

Promise.all(producerFunctions)
.then(() => logger.log('info', 'starter worker finished'))
.catch(e => logger.log('error', 'starter worker failed: ' + e.stack))