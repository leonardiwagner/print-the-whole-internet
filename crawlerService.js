'use strict';

let pageReader = require('./pageReader');
let ProfileParser = require('./profileParser');
let profileQueue = require('./infra/queue')('profile');
let profileRepository = require('./infra/profileRepository');

let saveProfileLinks = links => {
  let saveActions = links.map(link => {
    return profileQueue.set(link.id, link.href);
  })

  Promise.all(saveActions).then(a => {
    console.log('crawlerService saved links', links.length);
  }).catch(e => console.log("upps", e))
}

let processPage = url => {
  pageReader.readBody(url).then(html => {
    let profileParser = new ProfileParser(html)
    let profileLinks = profileParser.getProfileLinks()
    let profile = profileParser.parse(html)

    saveProfileLinks(profileLinks)

    profileRepository.add(profile).then(()=>{
      console.log("vai corinthians")
    })



    return
  }).catch(e => console.log("crawlerService error", e))
}


processPage("https://www.linkedin.com/in/heber-ortiz-b5909b18?authType=name&authToken=s4pN&trk=prof-sb-browse_map-photo");
