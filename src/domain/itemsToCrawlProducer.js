'use strict';

const queue = require('rediskill')('redis', 6379)

module.exports = {
  produceFromProfile: (profile) => {
    const relatedProfiles = crawledProfile.relatedProfiles.peopleAlsoViewed.concat(crawledProfile.relatedProfiles.similar)
    const messages = relatedProfiles.map(profile => { return {
      'key': profile.id,
      'value': profile.href
    }})

    return queue.sendMessages(messages)
  }
}
