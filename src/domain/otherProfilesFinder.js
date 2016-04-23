'use strict';

module.exports = {
  getProfilesFr
}

var cheerio = require('cheerio')
var $ = undefined;

var getProfileLinks = function () {
  var profiles = []

  var pushProfile = href => {
    const idStart = href.indexOf("id=") + 3
    const idEnd = href.indexOf("&", idStart)
    const id = href.substr(idStart, idEnd - idStart);

    profiles.push({
      'id': id,
      'href': href
    })
  }

  $("a.browse-map-photo").each(function (i, elem) {
    pushProfile($(this).attr("href"))
  });

  $("a.discovery-photo").each(function (i, elem) {
    pushProfile($(this).attr("href"))
  });

  return profiles;
}


module.exports = function (html) {
  $ = cheerio.load(html);

  return {
    parse: parse,
    getProfileLinks: getProfileLinks
  }
}