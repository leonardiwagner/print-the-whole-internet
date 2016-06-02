'use strict'

const textCleaner = require('./parserTextCleaner')
const dateReader = require('./parserDateReader')

module.exports = {
  parse: $ => {
    const experiences = []
    $("#background-experience > div").each(function () {
      const  experience = {
        title: $(this).find("h4").text(),
        company: $(this).find("header > h5").text(),
        description: textCleaner.clear($(this).find(".description").text()),
        durationStart: $(this).find(".experience-date-locale time:first-child").text(),
        locality: $(this).find(".experience-date-locale .locality").text()
      }

      experience.durationStartDate = dateReader.parseDate(experience.durationStart)

      if($(this).find(".experience-date-locale").text().indexOf("Present") > -1){
        experience.durationEnd = "Present",
        experience.isPresent = true

        experience.durationEndDate = new Date()
      }else{
        experience.durationEnd = $(this).find(".experience-date-locale time:nth-child(2)").text()
        experience.isPresent = false

        experience.durationStartDate = dateReader.parseDate(experience.durationStart)
        experience.durationEndDate = dateReader.parseDate(experience.durationEnd)
      }

      experiences.push(experience)
    })

    return experiences
  }
}