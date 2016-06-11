'use strict';

const profileParser = require('../../src/domain/profileParser/profileParser')
const pageReader = require('../../src/infra/pageReader')('src/infra/cookies.json')
const queue = require('rediskill')('redis', 6379)
const profileRepository = require('../../src/infra/profileRepository')

const crawler = require('../../src/domain/crawler')(profileParser, pageReader, queue, profileRepository)

const logger = require('winston')
logger.level = 'silly';

module.exports = {

  produce: (url) => {
    logger.profile(url);
    return crawler.crawUrl(url).then(profile => {
      logger.profile(url, 'profile crawl');

      const relatedProfiles = profile.relatedProfiles.peopleAlsoViewed.concat(profile.relatedProfiles.similar)
      const messages = relatedProfiles.map(profile => { return {
        'key': profile.id,
        'value': profile.href
      }})

      return queue.sendMessages(messages)
    })
  }
}
