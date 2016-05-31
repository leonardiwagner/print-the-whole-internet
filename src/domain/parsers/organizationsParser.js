'use strict'

const textCleaner = require('./parserTextCleaner')

module.exports = {
  parse: $ => {
    const organizations = []
    $("#background-organizations > div").each(function (i, elem) {
      const organization = {
        title: $(this).find("h4").text(),
        role: $(this).find("h5").text(),
        time: $(this).find("time").text(),
        description: textCleaner.clear($(this).find("p").text())
      };

      organizations.push(organization)
    })

    return organizations
  }
}




