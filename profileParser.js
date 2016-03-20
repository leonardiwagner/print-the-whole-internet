'use strict';

var cheerio = require('cheerio');

var parse = function(html) {
  var $ = cheerio.load(html);

  var profile = {
    name: $(".profile-overview-content .full-name").text(),
    locality: $(".profile-overview-content .locality").text(),
    industry: $(".profile-overview-content .industry").text(),
    summary: $("#background .summary").text(),
    connectionsCount: parseInt($(".member-connections strong").text().replace(",", "")),
    experiences: [],
    skills: [],
    educations: [],
    honors: [],
    languages: [],
    organizations: [],
    endorsements: {
      "received": parseInt($("#endorsements .nav-received-tab").text().replace("Received (", "").replace(")", "")),
      "given": parseInt($("#endorsements .nav-given-tab").text().replace("Given (", "").replace(")", ""))
    }
  }

  $("#background-experience > div").each(function (i, elem) {
    var experience = {
      title: $(this).find("h4").text(),
      company: $(this).find("header > h5").text(),
      description: $(this).find(".description").text(),
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
      description: $(this).find("p").text(),
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
      description: $(this).find("p").text()
    };

  })

  return profile;
}

module.exports = {
  parse: parse
}