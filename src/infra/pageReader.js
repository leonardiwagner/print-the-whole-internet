'use strict'

let request = require('request')
request = request.defaults({jar: true})

const cookiesReader = require('./cookiesReader')

const getCookiesJar = (cookieLocation) => {
  const cookiesJar = request.jar();

  return cookiesReader.read(cookieLocation).then(cookies => {
    cookies.forEach(function (cookie) {
      cookiesJar.setCookie(request.cookie(cookie.name + '=' + cookie.value), "http://www.linkedin.com")
    })

    return cookiesJar
  })
}

const requestPage = (url, cookiesJar) => {
  const options = {method: 'GET', url: url, jar: cookiesJar};
  return new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (error) reject(error)
      else resolve(body)
    });
  })
}

module.exports = (cookieLocation) => {
  return{
    readBody: url => {
      return getCookiesJar(cookieLocation).then(cookieJar => {
        return requestPage(url, cookieJar)
      }).then(body => {
        return body
      })
    }
  }
}




