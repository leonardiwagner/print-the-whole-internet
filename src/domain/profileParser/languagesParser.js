'use strict'

module.exports = {
  parse: $ => {
    const languages = []
    $("#languages li").each(function (i, elem) {
      const language = {
        title: $(this).find("h4").text(),
        proficiency: $(this).find(".languages-proficiency").text()
      }

      languages.push(language);
    })

    return languages
  }
}


