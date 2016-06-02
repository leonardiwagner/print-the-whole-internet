'use strict'

module.exports = {
  parse: $ => {
    const interests = []
    $('.interests-listing > li').each(function () {
      interests.push($(this).text().replace(',','').trim())
    })

    const personalInfo = []
    $('#personal-info-view > tbody > tr').each(function () {
      personalInfo.push({
        description: $(this).find('th').text().trim(),
        content: $(this).find('td').text().trim()
      })
    })

    return {
      interests: interests,
      personalInfo: personalInfo
    }
  }
}