'use strict'

module.exports = {
  parse: $ => {
    let courses = []
    $("#courses > div > .section-item").each(function () {
      let  course = {
        title: $(this).find("h4").text(),
        items: []
      }

      $(this).find('li').each(function(){
        course.items.push($(this).text().trim())
      })

      courses.push(course)
    })

    return courses
  }
}