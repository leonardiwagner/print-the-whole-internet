'use strict'

const dateReader = require('./parserDateReader')

module.exports = {
  parse: $ => {
    const projects = []
    $("#background-projects > .section-item").each(function () {
      const  project = {
        title: $(this).find("h4 span:first-child").text(), //TODO: need to check a project without link to see if this rule applies
        date: dateReader.parseDate($(this).find(".projects-date").text()),
        description: $(this).find(".description").text()
      }

      projects.push(project)
    })

    return projects
  }
}