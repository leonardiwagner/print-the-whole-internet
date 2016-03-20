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

  $("#background-experience > div").each(function (i, elem) {
    var experience = {
      title: $(this).find("h4").text(),
      company: $(this).find("header > h5").text(),
      description: clearText($(this).find(".description").text()),
      durationStart: $(this).find(".experience-date-locale time:first-child").text(),
      durationEnd: $(this).find(".experience-date-locale time:last-child").text(),
      locality: $(this).find(".experience-date-locale .locality").text(),
    }

    profile.experiences.push(experience)
  });

  $(".skill-pill").each(function (i, elem) {
    var skill = {
      count: parseInt($(this).find(".num-endorsements").attr("data-count")),
      title: $(this).find(".endorse-item-name").text()
    }

    profile.skills.push(skill)
  })

  $("#background-education > div").each(function (i, elem) {
    var education = {
      title: $(this).find("h4").text(),
      degree: $(this).find("h5 > .degree").text().replace(",", ""),
      description: clearText($(this).find("p").text()),
      majors: []
    }

    $(this).find("h5 > .major a").each(function (i, elem) {
      education.majors.push($(this).text())
    })

    profile.educations.push(education)
  })

  $("#background-honors > div").each(function (i, elem) {
    var honor = {
      title: $(this).find("h4").text(),
      company: $(this).find("h5").text(),
      time: $(this).find("time").text(),
      description: $(this).find("p").text()
    }

    profile.honors.push(honor)
  })

  $("#languages li").each(function (i, elem) {
    var language = {
      title: $(this).find("h4").text(),
      proficiency: $(this).find(".languages-proficiency").text()
    }

    profile.languages.push(language);
  })

  /*
   TODO: it also need to pickup other volunteering options

   var volunteering = []
   $("#background-volunteering li").each(function (i, elem)  {
   volunteering.push($(this).text())
   })*/

  $("#background-organizations > div").each(function (i, elem) {
    var organization = {
      title: $(this).find("h4").text(),
      role: $(this).find("h5").text(),
      time: $(this).find("time").text(),
      description: clearText($(this).find("p").text())
    };

  })

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