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



let getLinksFromUrl = url => {
  return readUrl(url)
    .then(links => {

      return links.map(link => getLinksFromUrl(link));
    })
    .catch(e => console.log("error on getlinksfromurl", e));
};

//getLinksFromUrl()
//.then(links => {
//    //console.log("moar links", links.length)
//    links.forEach(link => getLinksFromUrl(link))
//})
//.catch(err => console.log("erro2", err));

module.exports = {
  readUrl: readUrl
}