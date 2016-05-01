'use strict'

let textCleaner = require('./parserTextCleaner')

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

let parseDate = (stringDate) => {
  const splitedStringDate = stringDate.split(' ')
  const month = monthNames.indexOf(splitedStringDate[0])
  const year = splitedStringDate[1]

  return new Date(year, month, 1)
}

module.exports = {
  parse: $ => {
    let experiences = []
    $("#background-experience > div").each(function () {
      let  experience = {
        title: $(this).find("h4").text(),
        company: $(this).find("header > h5").text(),
        description: textCleaner.clear($(this).find(".description").text()),
        durationStart: $(this).find(".experience-date-locale time:first-child").text(),
        locality: $(this).find(".experience-date-locale .locality").text(),
      }

      experience.durationStartDate = parseDate(experience.durationStart)

      if($(this).find(".experience-date-locale").text().indexOf("Present") > -1){
        experience.durationEnd = "Present",
        experience.isPresent = true

        experience.durationEndDate = new Date()
      }else{
        experience.durationEnd = $(this).find(".experience-date-locale time:nth-child(2)").text()
        experience.isPresent = false

        experience.durationStartDate = parseDate(experience.durationStart)
        experience.durationEndDate = parseDate(experience.durationEnd)
      }

      experiences.push(experience)
    })

    return experiences
  }
}