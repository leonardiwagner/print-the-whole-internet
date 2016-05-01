'use strict'

module.exports = {
  parse: $ => {
    let skills = []
    $(".skill-pill").each(function (i, elem) {
      const skill = {
        count: parseInt($(this).find(".num-endorsements").attr("data-count")),
        title: $(this).find(".endorse-item-name").text()
      }

      skills.push(skill)
    })

    skills.pop() //last skill is blank
    return skills
  }
}