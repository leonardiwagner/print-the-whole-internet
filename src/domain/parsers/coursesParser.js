'use strict'

module.exports = {
  parse: $ => {
    const courses = []
    $("#courses > div > .section-item").each(function () {
      const  course = {
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