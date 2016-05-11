'use strict'

let cheerio = require('cheerio')

let getRelatedProfiles = function (html) {
  let $ = cheerio.load(html);
  let profiles = []

  let pushProfile = href => {
    const idStart = href.indexOf("id=") + 3
    const idEnd = href.indexOf("&", idStart)
    const id = href.substr(idStart, idEnd - idStart);

    profiles.push({
      'id': id,
      'href': href
    })
  }

  //people also viewed
  $("a.browse-map-photo").each(function (i, elem) {
    pushProfile($(this).attr("href"))
  })

  //related profiles
  $("a.discovery-photo").each(function (i, elem) {
    pushProfile($(this).attr("href"))
  })

  return profiles
}


module.exports = {
    getRelatedProfiles: getRelatedProfiles
}