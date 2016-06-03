'use strict'

let fs = require('fs')

let read = fileName => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', function (err,data) {
      if (err) reject(err)

      const rawCookieFile = JSON.parse(data)

      const parsedCookies = rawCookieFile.map(cookieInfo => {
        return {
          'name': cookieInfo.name,
          'value': cookieInfo.value
        }
      })

      resolve(parsedCookies)
    })
  })
}

module.exports = {
  read: read
}
