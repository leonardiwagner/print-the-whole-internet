'use strict'

module.exports = {
  parse: $ => {
    let educations = []
    $("#background-education > div").each(function (i, elem) {
      const education = {
        title: $(this).find("h4").text(),
        degree: $(this).find("h5 > .degree").text().replace(",", ""),
        description: clearText($(this).find("p").text()),
        majors: []
      }

      $(this).find("h5 > .major a").each(function (i, elem) {
        education.majors.push($(this).text())
      })

      educations.push(education)
    })

    return educations
  }
}