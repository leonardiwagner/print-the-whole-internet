'use strict'

let logger = require('winston')
let crawlerService = require('./../service/crawlerService')

let setProfileToStartCrawling = () => {
  return crawlerService.insertProfileLinksToQueue([{
    id: 'starter',
    href: 'https://www.linkedin.com/in/williamhgates'
  }])
}

let crawl = (produceFromProfile) => {
  crawlerService.getProfileUrlFromQueue().then(url => {
    logger.profile(url)
    return crawlerService.crawlProfile(url)
  }).then(crawledProfile => {
    if(produceFromProfile){
      crawlerService.insertProfileLinksToQueue(crawledProfile.profileLinks).then(length => {
        console.log("profiles urls discovered", length)
      }).catch(e => {
        console.log("error while inserting profiles url to queue", e)
      })
    }

    crawlerService.saveProfile(crawledProfile.profile).then(() => {
      console.log("profile saved")
      logger.profile(crawledProfile.profile.id)
    }).catch(e => {
      console.log("error while saving profile", e)
    })
  }).catch(e => {
    console.log("error while crawling profile", e.stack)
  })
}

module.exports = {
  setProfileToStartCrawling: setProfileToStartCrawling,
  crawl: crawl
}