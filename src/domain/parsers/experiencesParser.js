'use strict'

module.exports = {
  parse: $ => {
    let experiences = []
    $("#background-experience > div").each(function () {
      const  experience = {
        title: $(this).find("h4").text(),
        company: $(this).find("header > h5").text(),
        description: clearText($(this).find(".description").text()),
        durationStart: $(this).find(".experience-date-locale time:first-child").text(),
        durationEnd: $(this).find(".experience-date-locale time:last-child").text(),
        locality: $(this).find(".experience-date-locale .locality").text(),
      }

      experiences.push(experience)
    })

    return experiences
  }
}