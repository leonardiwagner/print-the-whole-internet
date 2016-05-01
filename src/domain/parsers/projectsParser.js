'use strict'

let dateReader = require('./parserDateReader')

module.exports = {
  parse: $ => {
    let projects = []
    $("#background-projects > .section-item").each(function () {
      let  project = {
        title: $(this).find("h4 span:first-child").text(), //TODO: need to check a project without link to see if this rule applies
        date: dateReader.parseDate($(this).find(".projects-date").text()),
        description: $(this).find(".description").text()
      }

      projects.push(project)
    })

    return projects
  }
}