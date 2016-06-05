'use strict'

const should = require('chai').should()

const profileParser = require('../../src/domain/profileParser/profileParser')
const pageReader = require('../../src/infra/pageReader')('src/infra/cookies.json')
const queue = require('rediskill')('redis', 6379)
const profileRepository = require('../../src/infra/profileRepository')

const crawler = require('../../src/domain/crawler')(profileParser, pageReader, queue, profileRepository)

describe('crawler tests', () => {
  it('should crawl a profile', (done) => {
    const result = crawler.crawUrl('https://www.linkedin.com/in/bruno-von-lasperg-a308862a')
    .then(x => {
      console.log('vai corinthians', x)
        done();
      }).catch(x => {
        console.log("error" , x)
        done()
      })
  })
})
