'use strict';

let pageReader = require('./../infra/pageReader');
let ProfileParser = require('././basicProfileParser');
let profileQueue = require('./../infra/queue')('profile');
let profileRepository = require('./../infra/profileRepository');

let crawlProfile = url => {
  return new Promise((resolve, reject) => {
    pageReader.readBody(url).then(html => {
      let profileParser = new ProfileParser(html)

      let crawledObject = {
        'profileLinks': profileParser.getProfileLinks(),
        'profile': profileParser.parse(html)
      }

      crawledObject.profile.id = url //Only to make unique to make item processing profling

      return resolve(crawledObject)
    }).catch(e => reject(e))
  })
}

let getProfileUrlFromQueue = () => {
  return profileQueue.get()
}

let insertProfileLinksToQueue = links => {
  let saveActions = links.map(link => {
    return profileQueue.set(link.id, link.href);
  })

  return Promise.all(saveActions).then(a => {
    return a.length;
  }).catch(e => console.log("upps", e))
}

let saveProfile = profile => {
  return profileRepository.add(profile)
}

module.exports = {
  crawlProfile: crawlProfile,
  getProfileUrlFromQueue: getProfileUrlFromQueue,
  insertProfileLinksToQueue: insertProfileLinksToQueue,
  saveProfile: saveProfile
}