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
    const year = splitedStringDate[1]

    return new Date(year, month, 1)
  }
}
