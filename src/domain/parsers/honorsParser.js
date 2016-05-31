'use strict'

module.exports = {
  parse: $ => {
    const honors = []
    $("#background-honors > div").each(function (i, elem) {
      const honor = {
        title: $(this).find("h4").text(),
        company: $(this).find("h5").text(),
        time: $(this).find("time").text(),
        description: $(this).find("p").text()
      }
        
      honors.push(honor)
    })

    return honors
  }
}

