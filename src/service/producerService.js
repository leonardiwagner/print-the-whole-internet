'use strict';

const profileParser = require('../../src/domain/profileParser/profileParser')
const pageReader = require('../../src/infra/pageReader')('src/infra/cookies.json')
const queue = require('rediskill')('redis', 6379)
const profileRepository = require('../../src/infra/profileRepository')

const crawler = require('../../src/domain/crawler')(profileParser, pageReader, queue, profileRepository)

module.exports = {
  produce: (url) => {
    return crawler.crawUrl(url).then(profile => {
      const relatedProfiles = crawledProfile.relatedProfiles.peopleAlsoViewed.concat(crawledProfile.relatedProfiles.similar)
      const messages = relatedProfiles.map(profile => { return {
        'key': profile.id,
        'value': profile.href
      }})

      return queue.sendMessages(messages)
    })
  }
}
