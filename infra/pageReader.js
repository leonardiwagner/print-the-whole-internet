'use strict'

let request = require('request')
request = request.defaults({jar: true})

let cookiesReader = require('./cookiesReader')

let getCookiesJar = () => {
  let cookiesJar = request.jar();

  return cookiesReader.read('./infra/cookies.json').then(cookies => {
    cookies.forEach(function (cookie) {
      cookiesJar.setCookie(request.cookie(cookie.name + '=' + cookie.value), "http://www.linkedin.com")
    })

    return cookiesJar
  })
}

let requestPage = (url, cookiesJar) => {
  const options = {method: 'GET', url: url, jar: cookiesJar};
  return new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
      if (error) reject(error)
      else resolve(body)
    });
  })
}

module.exports = {
  readBody: url => {
    return getCookiesJar().then(cookieJar => {
      return requestPage(url, cookieJar)
    }).then(body => {
      return body
    })
  }
}




