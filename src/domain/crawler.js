'use strict'

const profile = require('./profile')

module.exports = (profileParser, pageReader, queue, profileRepository) => {

  const crawUrl = url => {
    let crawledProfile = undefined

    return pageReader.readBody(url).then(htmlBody => {
      return profileParser.parse(htmlBody)
    }).then(function saveProfile(profile) {
      crawledProfile = profile
      return profileRepository.add(crawledProfile)
    }).then(() => {
      return crawledProfile
    })
  }

  return{
    crawUrl: crawUrl
  }
}
