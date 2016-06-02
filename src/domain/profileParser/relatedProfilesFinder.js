'use strict'

const cheerio = require('cheerio')

const find = function ($) {
  const relatedProfiles = {
    peopleAlsoViewed: [],
    similar: []
  }

  const pushProfile = (href, object) => {
    const idStart = href.indexOf("id=") + 3
    const idEnd = href.indexOf("&", idStart)
    const id = href.substr(idStart, idEnd - idStart);

    object.push({
      'id': id,
      'href': href
    })
  }

  //people also viewed
  $("a.browse-map-photo").each(function (i, elem) {
    pushProfile($(this).attr("href"), relatedProfiles.peopleAlsoViewed)
  })

  //similar profiles
  $("a.discovery-photo").each(function (i, elem) {
    pushProfile($(this).attr("href"), relatedProfiles.similar)
  })

  return relatedProfiles
}


module.exports = {
  find: find
}