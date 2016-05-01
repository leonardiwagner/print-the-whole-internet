'use strict'

let dateReader = require('./parserDateReader')

module.exports = {
  parse: $ => {
    let publications = []
    $("#background-publications > div").each(function () {
      let publication = {
        title: $(this).find("h4 span:first-child").text(), //TODO: need to check a project without link to see if this rule applies
        date: dateReader.parseDate($(this).find(".publication-date").text()),
        description: $(this).find(".description").text()
      }

      publications.push(publication)
    })

    return publications
  }
}