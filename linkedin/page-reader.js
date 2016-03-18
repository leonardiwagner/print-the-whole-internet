'use strict';

let request = require('request');
request = request.defaults({jar: true})

let login = (user, password) => {
  var credentials = {
    'session_key': user,
    'session_password': 'password',
    'isJsEnabled': 'yes',
    'source_app': '',
    'tryCount': 0,
    'clickedSuggestion': 'false'
  };

  return new Promise((resolve, reject) => {
    request.post({
      uri: 'https://www.linkedin.com/uas/login-submit',
      headers: {'content-type': 'application/x-www-form-urlencoded'},
      body: require('querystring').stringify(credentials)
    }, function (err, res, body) {
      if (err) {
        return reject(err)
      }else{
        return resolve(res)
      }
    });
  })
}

let readUrl = url => {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) return resolve(body);
      else                                      return reject(error);
    })
  })
};

module.exports = {
  login: login,
  readUrl: readUrl
}