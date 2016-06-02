'use strict'

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

module.exports = {
  parseDate: (stringDate) => {
    const splitedStringDate = stringDate.split(' ')
    const month = monthNames.indexOf(splitedStringDate[0])
    let year, day = undefined

    const hasDayInfo = stringDate.indexOf(',') > 0
    if(hasDayInfo) {
      year = splitedStringDate[2]
      day = splitedStringDate[1].replace(',', '')
    } else {
      year = splitedStringDate[1]
      day = 1
    }

    return new Date(year, month, day)
  }
}
