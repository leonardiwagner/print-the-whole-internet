'use strict'

const textCleaner = require('./parserTextCleaner')

module.exports = {
  parse: $ => {
    const educations = []
    $("#background-education > div").each(function (i, elem) {
      const education = {
        title: $(this).find("h4").text(),
        degree: $(this).find("h5 > .degree").text().replace(",", "").trim(),
        startYear: $(this).find('.education-date time:nth-child(1)').text(),
        endYear: $(this).find('.education-date time:nth-child(2)').text().replace('–', '').trim(),
        description: textCleaner.clear($(this).find("p").text()),
        majors: []
      }

      education.durationYears = (education.endYear && education.startYear)
                                ? education.endYear - education.startYear
                                : 0

      $(this).find("h5 > .major a").each(function (i, elem) {
        education.majors.push($(this).text())
      })

      educations.push(education)
    })

    return educations
  }
}