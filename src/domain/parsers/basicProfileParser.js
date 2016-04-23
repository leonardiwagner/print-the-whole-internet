'use strict';

var cheerio = require('cheerio');

var $ = undefined;

let clearText = text => {
  return text //TODO: clear special characters and stuff
}

var parse = function () {
  var profile = {
    name: $(".profile-overview-content .full-name").text(),
    locality: $(".profile-overview-content .locality").text(),
    industry: $(".profile-overview-content .industry").text(),
    summary: clearText($("#background .summary").text()),
    connectionsCount: parseInt($(".member-connections strong").text().replace(",", "")),
    experiences: [],
    skills: [],
    educations: [],
    honors: [],
    languages: [],
    organizations: [],
    endorsements: {}
  }

  var endorsementsReceived = parseInt($("#endorsements .nav-received-tab").text().replace("Received (", "").replace(")", ""))
  var endorsementsGiven = parseInt($("#endorsements .nav-given-tab").text().replace("Given (", "").replace(")", ""))
  profile.endorsements.received = !isNaN(endorsementsReceived) ? endorsementsReceived : 0
  profile.endorsements.given = !isNaN(endorsementsGiven) ? endorsementsGiven : 0

 

  

  

  

  /*
   TODO: it also need to pickup other volunteering options

   var volunteering = []
   $("#background-volunteering li").each(function (i, elem)  {
   volunteering.push($(this).text())
   })*/

 

  return profile;
}

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