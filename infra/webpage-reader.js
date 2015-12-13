'use strict';

let request = require('request');

let readUrl = url => {
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) return resolve(body);
      else                                      return reject(error);
    })
  })
};

module.exports = {
  readUrl: readUrl
}